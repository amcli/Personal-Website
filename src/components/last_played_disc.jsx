import { useEffect, useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import useLanyard from "../hooks/useLanyard";
import UltMark from "./ult_mark";

const STORAGE_KEY = "ff-last-played-track";

function readCached() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.album_art_url) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCached(track) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(track));
  } catch { /* noop */ }
}

export default function LastPlayedDisc() {
  const reduced = useReducedMotion();
  const userId = import.meta.env.VITE_LANYARD_USER_ID;
  const { spotify, listeningToSpotify } = useLanyard(userId);

  const [cached, setCached] = useState(() => readCached());
  const [imgError, setImgError] = useState(false);

  // Persist the currently-playing track so it survives the song ending
  useEffect(() => {
    if (!listeningToSpotify || !spotify?.album_art_url) return;
    const next = {
      album_art_url: spotify.album_art_url,
      song: spotify.song ?? "",
      artist: spotify.artist ?? "",
      album: spotify.album ?? "",
      track_id: spotify.track_id ?? "",
      cached_at: Date.now(),
    };
    if (cached?.track_id === next.track_id && cached?.album_art_url === next.album_art_url) return;
    writeCached(next);
    setCached(next);
    setImgError(false);
  }, [listeningToSpotify, spotify, cached]);

  const track = useMemo(() => {
    if (listeningToSpotify && spotify?.album_art_url) {
      return {
        album_art_url: spotify.album_art_url,
        song: spotify.song ?? "",
        artist: spotify.artist ?? "",
        album: spotify.album ?? "",
      };
    }
    return cached;
  }, [listeningToSpotify, spotify, cached]);

  const hasArt = !!track && !imgError;
  const spinning = listeningToSpotify && !reduced;
  const label = listeningToSpotify ? "NOW PLAYING" : hasArt ? "LAST PLAYED" : "STANDBY";

  const tooltip = hasArt
    ? `${track.song}${track.artist ? " — " + track.artist : ""}${listeningToSpotify ? " (now playing)" : " (last played)"}`
    : "No track cached yet";

  return (
    <div
      className="relative flex-shrink-0 w-40 h-40"
      title={tooltip}
      aria-label={tooltip}
    >
      {/* Label above disc */}
      <p
        className="ff-label absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none flex items-center gap-1.5"
      >
        {listeningToSpotify && (
          <span
            className="inline-block w-1.5 h-1.5 rounded-full bg-ff-teal"
            style={{ boxShadow: "0 0 6px rgba(95,232,209,0.8)" }}
            aria-hidden="true"
          />
        )}
        {label}
      </p>

      {/* Outer teal glow ring (matches the old portrait vibe) */}
      <div
        className="absolute inset-0 rounded-full pointer-events-none opacity-70 group-hover:opacity-100 transition"
        style={{
          boxShadow:
            "0 0 0 2px rgba(95,232,209,0.6), 0 0 0 6px var(--color-ff-panel), 0 0 28px rgba(95,232,209,0.35)",
        }}
        aria-hidden="true"
      />

      {/* The spinning disc */}
      <motion.div
        className="w-40 h-40 rounded-full overflow-hidden relative"
        style={{
          background: `
            radial-gradient(circle at center,
              #1a1f26 0%,
              #0d1116 18%,
              #05070a 22%,
              #0d1116 30%,
              #05070a 36%,
              #0d1116 44%,
              #05070a 50%,
              #0d1116 58%,
              #05070a 64%,
              #0d1116 72%,
              #05070a 78%,
              #0a0e13 100%
            )
          `,
        }}
        animate={spinning ? { rotate: 360 } : { rotate: 0 }}
        transition={
          spinning
            ? { duration: 8, ease: "linear", repeat: Infinity }
            : { duration: 0.6, ease: "easeOut" }
        }
      >
        {/* Subtle sheen sweep across the disc */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(95,232,209,0.08) 45%, rgba(255,255,255,0.05) 50%, transparent 65%)",
          }}
          aria-hidden="true"
        />

        {/* Album cover as the record's label — or Firefly mark when no track cached */}
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="w-[58%] h-[58%] rounded-full overflow-hidden ring-1 ring-ff-teal/25 bg-ff-bg-2 grid place-items-center"
            style={{
              boxShadow:
                "inset 0 0 0 2px rgba(0,0,0,0.55), 0 0 12px rgba(0,0,0,0.6)",
            }}
          >
            {hasArt ? (
              <img
                src={track.album_art_url}
                alt={track.album || track.song || "Album art"}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
                loading="lazy"
                draggable={false}
              />
            ) : (
              <UltMark className="w-10 h-10 opacity-60" />
            )}
          </div>
        </div>

        {/* Spindle hole in the dead center */}
        <div className="absolute inset-0 grid place-items-center pointer-events-none">
          <div
            className="w-3 h-3 rounded-full bg-ff-bg"
            style={{ boxShadow: "inset 0 0 3px rgba(0,0,0,0.9), 0 0 0 1px rgba(95,232,209,0.35)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
