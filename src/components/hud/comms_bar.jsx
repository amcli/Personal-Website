import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import UltMark from "../ult_mark";
import CutPanel from "./cut_panel";
import { statusPalette } from "../../lib/lanyard";

const BARS = Array.from({ length: 36 }, (_, i) => ({
  h: 6 + Math.round(Math.abs(Math.sin(i * 1.7) * Math.cos(i * 0.43)) * 26),
  delay: (i * 73) % 900,
}));

const STATUS_TEXT = { online: "Online", idle: "Idle", dnd: "Do not disturb", offline: "Offline" };
const ACTIVITY_VERB = { 0: "Playing", 1: "Streaming", 2: "Listening to", 3: "Watching", 5: "Competing in" };

// Spotify joins multiple artists with "; "
const artistText = (artist) => (artist ?? "").split(";").map((a) => a.trim()).filter(Boolean).join(" · ");

// A vinyl record with the album art as its label; spins while a track is live. The label takes
// up most of the record so the cover reads at small sizes.
function Disc({ size, art, spinning, dim, labelRatio = 0.74 }) {
  const [failedArt, setFailedArt] = useState(null);
  const showArt = !!art && failedArt !== art;
  const label = Math.round(size * labelRatio);

  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 rounded-full ${spinning ? "hud-spin-fast" : ""}`}
      style={{
        width: size,
        height: size,
        background: "repeating-radial-gradient(circle, #0d1116 0px, #0d1116 2px, #05070a 2px, #05070a 4px)",
        boxShadow: dim
          ? "0 0 0 1px rgba(95,232,209,0.35)"
          : "0 0 0 1px rgba(95,232,209,0.6), 0 0 14px rgba(95,232,209,0.3)",
      }}
    >
      <span className="absolute inset-0 grid place-items-center">
        <span
          className="grid place-items-center overflow-hidden rounded-full bg-ff-bg-2 shadow-[inset_0_0_0_1px_rgba(95,232,209,0.3)]"
          style={{ width: label, height: label }}
        >
          {showArt ? (
            <img
              src={art}
              alt=""
              onError={() => setFailedArt(art)}
              className={`h-full w-full object-cover ${dim ? "opacity-60" : ""}`}
              draggable={false}
            />
          ) : (
            <UltMark className="h-3/4 w-3/4 opacity-70" />
          )}
        </span>
      </span>
    </span>
  );
}

function Waveform({ mode, pct, compact }) {
  if (mode === "standby") {
    return <span aria-hidden="true" className={`block h-px bg-ff-teal/30 ${compact ? "w-16" : "flex-1"}`} />;
  }
  const bars = compact ? BARS.slice(0, 14) : BARS;
  const height = compact ? 28 : 40;
  const played = Math.round((pct ?? 0) * bars.length);

  return (
    <span
      aria-hidden="true"
      className={`flex items-center gap-0.5 ${compact ? "w-16 flex-none" : "min-w-[60px] flex-1"}`}
      style={{ height }}
    >
      {bars.map((b, i) => (
        <span
          key={i}
          className={`block flex-1 rounded-[1px] ${mode === "live" ? "hud-wave" : ""}`}
          style={{
            height: mode === "live" ? Math.max(4, Math.round((b.h * height) / 34)) : 3 + (i % 3),
            animationDelay: `${b.delay}ms`,
            background: mode === "live" && i < played ? "#5fe8d1" : "rgba(95,232,209,0.26)",
          }}
        />
      ))}
    </span>
  );
}

function CommsPanel({ id, comms, reduced, onClose }) {
  const { mode, track, progress, status, primary, listeningToSpotify } = comms;
  const palette = statusPalette(status);
  const activity = listeningToSpotify
    ? "Listening to Spotify"
    : primary
      ? `${ACTIVITY_VERB[primary.type] ?? "On"} ${primary.name}`
      : "No activity";

  return (
    <motion.div
      id={id}
      role="region"
      aria-label="Comms channel"
      initial={{ opacity: 0, y: reduced ? 0 : 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: reduced ? 0 : 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute bottom-full left-0 z-50 mb-3 w-[min(420px,calc(100vw-24px))]"
    >
      <CutPanel solid className="drop-shadow-[0_12px_32px_rgba(0,0,0,0.6)]" innerClassName="flex flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <span className="font-hud text-[11px] font-semibold tracking-[0.3em] text-ff-teal">COMMS CHANNEL</span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close comms channel"
            className="grid size-11 place-items-center bg-ff-teal/[0.08] text-ff-teal shadow-[inset_0_0_0_1px_rgba(95,232,209,0.4)] transition-colors hover:bg-ff-teal/20"
          >
            <ChevronDown className="size-[18px]" aria-hidden="true" />
          </button>
        </div>

        <div className="flex items-center gap-5">
          <Disc size={128} art={track?.album_art_url} spinning={mode === "live"} dim={mode !== "live"} />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <span className="font-hud text-[10px] uppercase tracking-[0.24em] text-ff-muted">
              {mode === "live" ? "Now playing" : mode === "cached" ? "Last played" : "Standby"}
            </span>
            {track ? (
              <>
                <span className="font-display text-lg font-bold leading-snug">{track.song}</span>
                {track.artist && <span className="text-sm text-ff-soft">{artistText(track.artist)}</span>}
                {track.album && <span className="truncate font-hud text-[11px] text-ff-muted">{track.album}</span>}
              </>
            ) : (
              <span className="text-sm text-ff-muted">No signal on the comms channel yet.</span>
            )}
          </div>
        </div>

        {progress && (
          <div className="flex flex-col gap-1.5">
            <div className="h-1 bg-ff-teal/15">
              <div
                className="h-1 bg-gradient-to-r from-ff-teal to-ff-glow shadow-[0_0_8px_rgba(95,232,209,0.6)] transition-[width] duration-500 ease-linear"
                style={{ width: `${Math.round(progress.pct * 100)}%` }}
              />
            </div>
            <div className="flex justify-between font-hud text-[11px] text-ff-muted">
              <span>{progress.elapsed}</span>
              <span>{progress.duration}</span>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2.5 border-t border-ff-teal/15 pt-3.5">
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 rounded-full"
            style={{ background: palette.color, boxShadow: `0 0 10px ${palette.ring}` }}
          />
          <span className="font-display text-[13px] font-semibold uppercase tracking-[0.1em]">
            Uplink · {STATUS_TEXT[palette.key]}
          </span>
          <span className="ml-auto truncate font-hud text-xs text-ff-muted">{activity}</span>
        </div>
      </CutPanel>
    </motion.div>
  );
}

// The music widget, docked in the HUD's bottom bar. Click it to open the full comms panel.
export default function CommsBar({ comms, compact = false }) {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const buttonRef = useRef(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return undefined;
    const onPointerDown = (e) => {
      if (!rootRef.current?.contains(e.target)) setOpen(false);
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const { mode, track, progress } = comms;
  const label = mode === "live" ? "Now playing" : mode === "cached" ? "Last played" : "Standby";
  const spoken = track?.song
    ? `${label}: ${track.song}${track.artist ? ` by ${artistText(track.artist)}` : ""}`
    : "No track";

  return (
    <div ref={rootRef} className="relative min-w-0">
      <AnimatePresence>
        {open && (
          <CommsPanel
            key="panel"
            id={panelId}
            comms={comms}
            reduced={reduced}
            onClose={() => {
              setOpen(false);
              buttonRef.current?.focus();
            }}
          />
        )}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        aria-label={`Comms. ${spoken}. ${open ? "Hide" : "Show"} details`}
        onClick={() => setOpen((o) => !o)}
        className="hud-cut block w-full p-px text-left transition-[filter] duration-200 hover:brightness-125"
        style={{
          background:
            mode === "live" ? "rgba(95,232,209,0.5)" : mode === "cached" ? "rgba(95,232,209,0.3)" : "rgba(95,232,209,0.2)",
        }}
      >
        <span
          className={`hud-cut flex items-center bg-[rgba(6,12,15,0.94)] ${compact ? "gap-3 px-3 py-2" : "gap-5 py-2 pl-3 pr-6"}`}
        >
          <Disc size={compact ? 50 : 80} art={track?.album_art_url} spinning={mode === "live"} dim={mode !== "live"} />
          <span className={`flex min-w-0 flex-col gap-0.5 ${compact ? "flex-1" : "flex-[0_1_300px]"}`}>
            <span
              className={`flex items-center gap-1.5 font-hud text-[9px] uppercase tracking-[0.22em] lg:text-[10px] lg:tracking-[0.24em] ${
                mode === "live" ? "text-ff-teal" : "text-ff-muted"
              }`}
            >
              {mode === "live" && (
                <span className="hud-blink size-1.5 rounded-full bg-ff-teal shadow-[0_0_6px_#5fe8d1]" />
              )}
              Comms · {label}
            </span>
            <span
              className={`truncate ${
                track ? "font-display font-semibold" : "font-body font-medium text-ff-muted"
              } ${compact ? "text-[13px]" : "text-[17px] leading-snug"} ${mode === "cached" ? "text-ff-soft" : ""}`}
            >
              {track?.song || "No signal on the comms channel"}
            </span>
            {!compact && track?.artist && (
              <span className="truncate text-[13px] text-ff-soft">{artistText(track.artist)}</span>
            )}
            {!compact && track?.album && (
              <span className="truncate font-hud text-[11px] text-ff-muted">{track.album}</span>
            )}
          </span>
          <Waveform mode={mode} pct={progress?.pct} compact={compact} />
        </span>
      </button>
    </div>
  );
}
