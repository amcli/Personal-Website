// useLanyard — subscribe to a Discord user's presence via Lanyard.
//
// Setup (one-time):
//   1. Join https://discord.gg/lanyard on the Discord account you want tracked.
//   2. Enable Developer Mode -> Copy your user ID (snowflake).
//   3. Discord Settings -> Activity Privacy -> "Display current activity as a
//      status message" must be ON, or activities[] will be empty.
//   4. Optional Spotify: Discord -> Connections -> Spotify + "Display Spotify
//      as your status" ON.
//   5. Set VITE_LANYARD_USER_ID in .env.local.
//
// The hook tries a WebSocket first (live updates), falling back to REST polling
// after `WS_RETRY_LIMIT` consecutive failures.

import { useEffect, useMemo, useRef, useState } from "react";
import { getPrimaryActivity } from "../lib/lanyard";

const REST_URL = (id) => `https://api.lanyard.rest/v1/users/${id}`;
const WS_URL = "wss://api.lanyard.rest/socket";
const POLL_MS = 45000;
const WS_RETRY_LIMIT = 3;

const OP_HELLO = 1;
const OP_INITIALIZE = 2;
const OP_HEARTBEAT = 3;

export default function useLanyard(userId) {
  const [data, setData] = useState(null);
  const restTimerRef = useRef(null);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;
    let ws = null;
    let heartbeatTimer = null;
    let reconnectTimer = null;
    let wsFailures = 0;

    const clearHeartbeat = () => {
      if (heartbeatTimer) {
        clearInterval(heartbeatTimer);
        heartbeatTimer = null;
      }
    };
    const clearRestPoll = () => {
      if (restTimerRef.current) {
        clearInterval(restTimerRef.current);
        restTimerRef.current = null;
      }
    };
    const clearReconnect = () => {
      if (reconnectTimer) {
        clearTimeout(reconnectTimer);
        reconnectTimer = null;
      }
    };

    const applySnapshot = (snapshot) => {
      if (!cancelled) setData(snapshot);
    };

    const startRest = async () => {
      clearRestPoll();
      const tick = async () => {
        try {
          const res = await fetch(REST_URL(userId), { cache: "no-store" });
          if (!res.ok) return;
          const json = await res.json();
          if (json?.success && json.data) applySnapshot(json.data);
        } catch {
          // Keep the last snapshot; the next poll tries again
        }
      };
      tick();
      restTimerRef.current = setInterval(tick, POLL_MS);
    };

    const startWs = () => {
      clearHeartbeat();
      try {
        ws = new WebSocket(WS_URL);
      } catch {
        scheduleReconnect();
        return;
      }

      ws.onmessage = (event) => {
        let msg;
        try {
          msg = JSON.parse(event.data);
        } catch {
          return;
        }
        if (msg.op === OP_HELLO) {
          const interval = msg.d?.heartbeat_interval ?? 30000;
          ws.send(JSON.stringify({ op: OP_INITIALIZE, d: { subscribe_to_id: userId } }));
          heartbeatTimer = setInterval(() => {
            if (ws && ws.readyState === WebSocket.OPEN) {
              ws.send(JSON.stringify({ op: OP_HEARTBEAT }));
            }
          }, interval);
        } else if (msg.op === 0) {
          // INIT_STATE or PRESENCE_UPDATE — both carry a presence payload in `d`
          if (msg.d) {
            wsFailures = 0;
            applySnapshot(msg.d);
          }
        }
      };

      // A failed connection also fires close, which handles reconnecting
      ws.onclose = () => {
        clearHeartbeat();
        if (cancelled) return;
        wsFailures += 1;
        if (wsFailures >= WS_RETRY_LIMIT) {
          startRest();
        } else {
          scheduleReconnect();
        }
      };
    };

    const scheduleReconnect = () => {
      clearReconnect();
      const delay = Math.min(30000, 1000 * 2 ** wsFailures);
      reconnectTimer = setTimeout(() => {
        if (!cancelled) startWs();
      }, delay);
    };

    startWs();

    return () => {
      cancelled = true;
      clearHeartbeat();
      clearReconnect();
      clearRestPoll();
      if (ws) {
        ws.onmessage = ws.onclose = null;
        try { ws.close(); } catch { /* noop */ }
      }
    };
  }, [userId]);

  return useMemo(() => {
    const activities = data?.activities ?? [];
    const listeningToSpotify = !!data?.listening_to_spotify;
    return {
      status: data?.discord_status ?? "offline",
      spotify: data?.spotify ?? null,
      listeningToSpotify,
      discordUser: data?.discord_user ?? null,
      primary: getPrimaryActivity(activities, listeningToSpotify),
    };
  }, [data]);
}
