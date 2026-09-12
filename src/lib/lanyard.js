// Pure helpers for consuming a Lanyard presence payload.
// See: https://github.com/Phineas/lanyard

const CDN = "https://cdn.discordapp.com";
const MEDIA_PROXY = "https://media.discordapp.net";
const SPOTIFY_IMG = "https://i.scdn.co/image";

export function resolveAssetUrl(applicationId, assetId) {
  if (!assetId) return null;

  // mp:external/<hash>/https/<host>/<path> — Discord's proxy for external URLs
  if (assetId.startsWith("mp:")) {
    const rest = assetId.slice(3);
    return `${MEDIA_PROXY}/${rest}`;
  }

  // spotify:<base64-image-id>
  if (assetId.startsWith("spotify:")) {
    return `${SPOTIFY_IMG}/${assetId.slice(8)}`;
  }

  // Snowflake ID — application asset
  if (/^\d+$/.test(assetId) && applicationId) {
    return `${CDN}/app-assets/${applicationId}/${assetId}.png`;
  }

  return null;
}

// Ignore Custom Status (type 4). If Spotify is being surfaced via the flat
// spotify object, also ignore the redundant Spotify activity (type 2).
export function getPrimaryActivity(activities, listeningToSpotify) {
  if (!Array.isArray(activities) || activities.length === 0) return null;
  const filtered = activities.filter((a) => {
    if (a.type === 4) return false;
    if (listeningToSpotify && a.type === 2 && a.name === "Spotify") return false;
    return true;
  });
  return filtered[0] ?? null;
}

export function labelForActivity(activity, listeningToSpotify) {
  if (listeningToSpotify) return "LISTENING";
  if (!activity) return "STANDBY";
  switch (activity.type) {
    case 0: return "NOW PLAYING";
    case 1: return "ON STREAM";
    case 2: return "LISTENING";
    case 3: return "WATCHING";
    case 5: return "COMPETING";
    default: return "ACTIVE";
  }
}

export function formatElapsed(startMs, nowMs) {
  if (!startMs) return "";
  const elapsed = Math.max(0, nowMs - startMs);
  const totalSec = Math.floor(elapsed / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  const pad = (n) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}

export function spotifyProgress(spotify, nowMs) {
  if (!spotify?.timestamps) return { pct: 0, elapsed: "0:00", duration: "0:00" };
  const { start, end } = spotify.timestamps;
  const total = Math.max(1, end - start);
  const done = Math.min(total, Math.max(0, nowMs - start));
  return {
    pct: Math.min(1, Math.max(0, done / total)),
    elapsed: formatElapsed(start, nowMs),
    duration: formatElapsed(0, total),
  };
}

// Returns { className, rgba } — the class is what to pass to Tailwind bg-*/text-*,
// the rgba is for inline box-shadow glows that need alpha.
export function statusPalette(discordStatus) {
  switch (discordStatus) {
    case "online":
      return { key: "online", color: "#5fe8d1", ring: "rgba(95,232,209,0.5)", halo: "rgba(95,232,209,0.35)" };
    case "idle":
      return { key: "idle", color: "#d9f76b", ring: "rgba(217,247,107,0.5)", halo: "rgba(217,247,107,0.35)" };
    case "dnd":
      return { key: "dnd", color: "#ff7a3c", ring: "rgba(255,122,60,0.55)", halo: "rgba(255,122,60,0.4)" };
    default:
      return { key: "offline", color: "#94a39f", ring: "rgba(148,163,159,0.35)", halo: "rgba(148,163,159,0.25)" };
  }
}
