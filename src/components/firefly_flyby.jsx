import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// A single glowing mote — blending Firefly's teal and the fyrefly glow —
// that occasionally streaks across a section, trailing a comet-style trail
// of faint delayed copies of itself along the same path. The flight path is
// stitched from randomized segments: some level, some a sine wave, some a
// parabolic arc, some an accelerating swoop, so no two passes read the same.

const SEGMENT_TYPES = ["straight", "sine", "parabola", "exp"];
const SAMPLES_PER_SEGMENT = 10;
const SEGMENT_COUNT = 5;
const MAX_OFFSET_PX = 55; // vertical wander, kept inside the section's margins

const easeInExpo = (t) => (t <= 0 ? 0 : 2 ** (10 * (t - 1)));
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

const DOT_GRADIENT = "radial-gradient(circle, #eefcd8 0%, #d9f76b 45%, #5fe8d1 100%)";

// The lead dot plus a short comet-tail of delayed copies of itself, each
// replaying the exact same flight keyframes a beat later — since they
// follow the identical (curved) path just time-shifted, they trace out a
// genuine trail behind the head as it flies.
const TAIL = [
  { lag: 0, size: 7, peak: 1 },
  { lag: 0.05, size: 5.5, peak: 0.6 },
  { lag: 0.12, size: 4.6, peak: 0.42 },
  { lag: 0.22, size: 3.7, peak: 0.28 },
  { lag: 0.35, size: 2.8, peak: 0.16 },
  { lag: 0.52, size: 2, peak: 0.08 },
];

export default function FireflyFlyby({ count = 2, className = "" }) {
  const reduceMotion = useReducedMotion();

  const flights = useMemo(() => {
    let seed = 26702; // another Iron Cavalry designation, AR-26702
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    return Array.from({ length: count }, (_, i) => {
      const rightward = i % 2 === 0;

      // Stitch a variable vertical trajectory from randomized segments.
      // "straight" holds level; "sine"/"parabola" are self-contained bumps
      // that return to the running height; "exp" eases toward a new height
      // (and warps horizontal progress too, for a genuine accelerating
      // swoop rather than just a vertical wobble).
      let running = 0; // normalized, -1..1
      const times = [];
      const yOffsets = [];

      for (let s = 0; s < SEGMENT_COUNT; s++) {
        const type = SEGMENT_TYPES[Math.floor(rand() * SEGMENT_TYPES.length)];
        const segStart = s / SEGMENT_COUNT;
        const segSpan = 1 / SEGMENT_COUNT;
        const amplitude = 0.25 + rand() * 0.35;
        const sign = rand() < 0.5 ? -1 : 1;
        const cycles = rand() < 0.5 ? 1 : 1.5;
        const easeFn = rand() < 0.5 ? easeInExpo : easeOutExpo;
        const target = Math.max(-1, Math.min(1, running + (rand() - 0.5) * 1.4));

        for (let k = 0; k <= SAMPLES_PER_SEGMENT; k++) {
          if (s > 0 && k === 0) continue; // shared boundary with the previous segment
          const t = k / SAMPLES_PER_SEGMENT;
          let localX = t;
          let value = running;

          if (type === "sine") {
            value = running + amplitude * Math.sin(2 * Math.PI * cycles * t);
          } else if (type === "parabola") {
            value = running + amplitude * sign * 4 * t * (1 - t);
          } else if (type === "exp") {
            localX = easeFn(t);
            value = running + (target - running) * localX;
          }

          times.push(segStart + localX * segSpan);
          yOffsets.push(Math.max(-1, Math.min(1, value)) * MAX_OFFSET_PX);
        }

        if (type === "exp") running = target;
      }

      // Horizontal position at each of those same (possibly warped) times,
      // so an "exp" segment's acceleration shows up in both axes at once.
      const xKeyframes = times.map((t) => (rightward ? -15 + 130 * t : 115 - 130 * t));

      return {
        id: i,
        top: `${20 + rand() * 56}%`,
        rightward,
        duration: 10 + rand() * 6,
        delay: rand() * 8,
        repeatDelay: 6 + rand() * 16,
        times,
        xKeyframes,
        yOffsets,
      };
    });
  }, [count]);

  if (reduceMotion) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {flights.map((f) => {
        const xVw = f.xKeyframes.map((v) => `${v}vw`);

        // Render the longest-lag (faintest) copies first so the bright lead
        // dot (lag 0) always paints on top wherever the path crosses itself.
        const order = [...TAIL].reverse();

        return (
          <div key={f.id}>
            {order.map(({ lag, size, peak }) => (
              <motion.div
                key={lag}
                className="absolute left-0 rounded-full"
                style={{ top: f.top, width: size, height: size, marginLeft: -size / 2, marginTop: -size / 2, background: DOT_GRADIENT }}
                initial={{ x: xVw[0], y: f.yOffsets[0], opacity: 0 }}
                animate={{ x: xVw, y: f.yOffsets, opacity: [0, peak, peak, 0] }}
                transition={{
                  x: { duration: f.duration, delay: f.delay + lag, repeat: Infinity, repeatDelay: f.repeatDelay, ease: "linear", times: f.times },
                  y: { duration: f.duration, delay: f.delay + lag, repeat: Infinity, repeatDelay: f.repeatDelay, ease: "linear", times: f.times },
                  opacity: { duration: f.duration, delay: f.delay + lag, repeat: Infinity, repeatDelay: f.repeatDelay, ease: "linear", times: [0, 0.05, 0.95, 1] },
                }}
              >
                <div
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: `0 0 ${size * 2.2}px ${size * 0.7}px rgba(217,247,107,0.5), 0 0 ${size * 3.4}px ${size}px rgba(95,232,209,0.35)`,
                  }}
                />
              </motion.div>
            ))}
          </div>
        );
      })}
    </div>
  );
}
