import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import useLanyard from "../hooks/useLanyard";
import {
  formatElapsed,
  labelForActivity,
  resolveAssetUrl,
  spotifyProgress,
  statusPalette,
} from "../lib/lanyard";
import UltMark from "./ult_mark";

const STORAGE_KEY = "ff-discord-card-collapsed";

function readCollapsed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}
function writeCollapsed(next) {
  try {
    localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
  } catch { /* noop */ }
}

function useNow(active, reduced) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!active) return undefined;
    const step = reduced ? 5000 : 1000;
    const id = setInterval(() => setNow(Date.now()), step);
    return () => clearInterval(id);
  }, [active, reduced]);
  return now;
}

function ActivityIcon({ activity, spotify, listeningToSpotify }) {
  const [largeError, setLargeError] = useState(false);
  const [smallError, setSmallError] = useState(false);

  const largeUrl = useMemo(() => {
    if (listeningToSpotify && spotify?.album_art_url) return spotify.album_art_url;
    if (!activity) return null;
    return resolveAssetUrl(activity.application_id, activity.assets?.large_image);
  }, [activity, spotify, listeningToSpotify]);

  const smallUrl = useMemo(() => {
    if (!activity) return null;
    return resolveAssetUrl(activity.application_id, activity.assets?.small_image);
  }, [activity]);

  const largeAlt = listeningToSpotify
    ? spotify?.album ?? "Album art"
    : activity?.assets?.large_text ?? activity?.name ?? "Activity";

  return (
    <div className="relative flex-shrink-0">
      <div className="w-12 h-12 rounded-xl overflow-hidden ring-1 ring-ff-teal/50 ring-offset-2 ring-offset-ff-panel bg-ff-bg-2 grid place-items-center">
        {largeUrl && !largeError ? (
          <img
            src={largeUrl}
            alt={largeAlt}
            onError={() => setLargeError(true)}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <UltMark className="w-7 h-7 opacity-70" />
        )}
      </div>
      {smallUrl && !smallError && (
        <img
          src={smallUrl}
          alt={activity?.assets?.small_text ?? ""}
          onError={() => setSmallError(true)}
          className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full ring-2 ring-ff-panel bg-ff-bg-2 object-cover"
          loading="lazy"
        />
      )}
    </div>
  );
}

function StatusDot({ palette, onClick, reduced }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-label="Show current Discord activity"
      className="group relative grid place-items-center w-11 h-11 rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-teal/70"
      whileHover={reduced ? undefined : { scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <span
        className="absolute inset-0 rounded-full blur-md opacity-70"
        style={{
          background: `radial-gradient(circle, ${palette.color} 0%, ${palette.halo} 55%, transparent 75%)`,
        }}
        aria-hidden="true"
      />
      <motion.span
        className="relative rounded-full"
        style={{
          width: 14,
          height: 14,
          background:
            palette.key === "offline"
              ? palette.color
              : "radial-gradient(circle, #eefcd8 0%, #d9f76b 45%, " + palette.color + " 100%)",
          boxShadow: `0 0 10px 2px ${palette.ring}, 0 0 18px 4px ${palette.halo}`,
        }}
        animate={
          reduced || palette.key === "offline"
            ? { opacity: 0.9 }
            : { opacity: [0.85, 1, 0.85] }
        }
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />
      <ChevronUp
        className="absolute -top-1 -right-1 w-3 h-3 text-ff-teal opacity-0 group-hover:opacity-100 transition"
        aria-hidden="true"
      />
    </motion.button>
  );
}

function ProgressBar({ pct }) {
  return (
    <div className="mt-1 h-[3px] w-full rounded-full bg-ff-line/70 overflow-hidden">
      <div
        className="h-full rounded-full bg-gradient-to-r from-ff-teal via-ff-glow to-ff-teal"
        style={{ width: `${Math.round(pct * 100)}%`, transition: "width 400ms linear" }}
      />
    </div>
  );
}

function ExpandedCard({
  reduced,
  onCollapse,
  primary,
  spotify,
  listeningToSpotify,
  status,
  discordUser,
  now,
}) {
  const palette = statusPalette(status);
  const label = labelForActivity(primary, listeningToSpotify);

  const title = listeningToSpotify
    ? spotify?.song ?? "Untitled"
    : primary?.details ?? primary?.name ?? "Standby";
  const subtitle = listeningToSpotify
    ? spotify?.artist ?? ""
    : primary?.state ?? primary?.name ?? "";
  const isStandby = !primary && !listeningToSpotify;

  const elapsed =
    primary?.timestamps?.start && !listeningToSpotify
      ? formatElapsed(primary.timestamps.start, now)
      : "";
  const progress = listeningToSpotify ? spotifyProgress(spotify, now) : null;

  const activityKey = listeningToSpotify
    ? `spotify:${spotify?.track_id ?? "none"}`
    : primary
      ? `act:${primary.application_id ?? ""}:${primary.name ?? ""}:${primary.details ?? ""}`
      : `standby:${status}`;

  return (
    <motion.div
      role="status"
      aria-live="polite"
      title={
        discordUser
          ? `${discordUser.global_name || discordUser.username} — ${label.toLowerCase()}`
          : undefined
      }
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.96 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="relative w-[320px] max-w-[92vw]"
    >
      {/* Holographic halo */}
      <div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-ff-teal via-ff-glow to-ff-ember blur-xl opacity-20 pointer-events-none"
        aria-hidden="true"
      />

      {/* Panel */}
      <div className="ff-corners relative rounded-2xl border border-ff-line bg-ff-panel/85 backdrop-blur-md shadow-[0_0_32px_rgba(95,232,209,0.28)] overflow-hidden">
        {/* Top hairline (ff-eye-gradient echo) */}
        <div
          className="h-px w-full ff-eye-gradient opacity-70"
          aria-hidden="true"
        />

        <div className="px-4 pt-3 pb-4">
          <div className="flex items-center justify-between mb-2">
            <p className="ff-label flex items-center gap-2">
              <span
                className="inline-block rounded-full"
                style={{
                  width: 8,
                  height: 8,
                  background: palette.color,
                  boxShadow: `0 0 6px ${palette.ring}`,
                }}
                aria-hidden="true"
              />
              Δ {label}
            </p>
            <button
              type="button"
              onClick={onCollapse}
              aria-label="Collapse activity card"
              className="text-ff-muted hover:text-ff-teal transition p-1 -mr-1 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-teal/60"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activityKey}
              initial={reduced ? { opacity: 0 } : { opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: -6 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex items-start gap-3"
            >
              <ActivityIcon
                activity={primary}
                spotify={spotify}
                listeningToSpotify={listeningToSpotify}
              />

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-ff-text truncate">
                  {isStandby ? "No activity" : title}
                </p>
                <p className="text-xs text-ff-muted truncate">
                  {isStandby
                    ? status === "offline"
                      ? "Offline"
                      : "Idle on Discord"
                    : subtitle}
                </p>

                {progress && (
                  <>
                    <ProgressBar pct={progress.pct} />
                    <div className="mt-1 flex justify-between font-mono text-[10px] tracking-wider text-ff-teal/80">
                      <span>{progress.elapsed}</span>
                      <span>{progress.duration}</span>
                    </div>
                  </>
                )}

                {!progress && elapsed && (
                  <p className="mt-1 font-mono text-[10px] tracking-wider text-ff-teal/80">
                    {elapsed} elapsed
                  </p>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default function DiscordPresence() {
  const reduced = useReducedMotion();
  const userId = import.meta.env.VITE_LANYARD_USER_ID;
  const { primary, spotify, listeningToSpotify, status, discordUser } =
    useLanyard(userId);

  const [userCollapsed, setUserCollapsed] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    setUserCollapsed(readCollapsed());
    initialized.current = true;
  }, []);

  const hasActivity = !!primary || !!listeningToSpotify;
  const showCard = !userCollapsed && (hasActivity || status !== "offline");
  const now = useNow(showCard, reduced);
  const palette = statusPalette(status);

  const toggle = (next) => {
    setUserCollapsed(next);
    if (initialized.current) writeCollapsed(next);
  };

  if (!userId) return null;

  return (
    <div
      className="fixed z-70 bottom-4 left-4 sm:bottom-4 sm:left-4"
      style={{ maxWidth: "calc(100vw - 2rem)" }}
    >
      <AnimatePresence mode="wait">
        {showCard ? (
          <ExpandedCard
            key="card"
            reduced={reduced}
            onCollapse={() => toggle(true)}
            primary={primary}
            spotify={spotify}
            listeningToSpotify={listeningToSpotify}
            status={status}
            discordUser={discordUser}
            now={now}
          />
        ) : (
          <motion.div
            key="dot"
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <StatusDot palette={palette} reduced={reduced} onClick={() => toggle(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
