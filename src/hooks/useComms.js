import { useEffect, useMemo, useState } from "react";
import { useReducedMotion } from "framer-motion";
import useLanyard from "./useLanyard";
import { spotifyProgress } from "../lib/lanyard";

const STORAGE_KEY = "ff-last-played-track";

function readCached() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    return parsed?.song || parsed?.album_art_url ? parsed : null;
  } catch {
    return null;
  }
}

function writeCached(track) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(track));
  } catch { /* noop */ }
}

// Ticks once a second while a track is playing, so the progress readout moves
function useNow(active, reduced) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return undefined;
    const id = setInterval(() => setNow(Date.now()), reduced ? 5000 : 1000);
    return () => clearInterval(id);
  }, [active, reduced]);
  return now;
}

// Everything the COMMS bar shows: the live Spotify track from Discord (via Lanyard), else the
// last track seen on this browser, else standby. Also passes through the Discord status.
export default function useComms() {
  const reduced = useReducedMotion();
  const userId = import.meta.env.VITE_LANYARD_USER_ID;
  const { spotify, listeningToSpotify, status, primary } = useLanyard(userId);
  const [cached, setCached] = useState(readCached);

  const live = listeningToSpotify && !!spotify;

  // Remember the playing track so it survives the song ending
  useEffect(() => {
    if (!live) return;
    const next = {
      album_art_url: spotify.album_art_url ?? "",
      song: spotify.song ?? "",
      artist: spotify.artist ?? "",
      album: spotify.album ?? "",
      track_id: spotify.track_id ?? "",
    };
    if (cached?.track_id === next.track_id && cached?.album_art_url === next.album_art_url) return;
    writeCached(next);
    setCached(next);
  }, [live, spotify, cached]);

  const now = useNow(live, reduced);

  return useMemo(() => {
    const track = live
      ? { album_art_url: spotify.album_art_url, song: spotify.song, artist: spotify.artist, album: spotify.album }
      : cached;
    return {
      mode: live ? "live" : track ? "cached" : "standby",
      track,
      progress: live ? spotifyProgress(spotify, now) : null,
      status,
      primary,
      listeningToSpotify,
    };
  }, [live, spotify, cached, now, status, primary, listeningToSpotify]);
}
