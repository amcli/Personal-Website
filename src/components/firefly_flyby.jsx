import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const SEGMENT_TYPES = ["straight", "sine", "parabola", "exp"];
const SAMPLES_PER_SEGMENT = 10;
const SEGMENT_COUNT = 5;
const MAX_OFFSET_PX = 55; // vertical wander, kept inside the section's margins

const easeInExpo = (t) => (t <= 0 ? 0 : 2 ** (10 * (t - 1)));
const easeOutExpo = (t) => (t >= 1 ? 1 : 1 - 2 ** (-10 * t));

const DOT_GRADIENT = "radial-gradient(circle, #eefcd8 0%, #d9f76b 45%, #5fe8d1 100%)";

// Delayed copies of the lead dot replaying the same path form the trail.
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
    let seed = 26702;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    return Array.from({ length: count }, (_, i) => {
      const rightward = i % 2 === 0;

      // "exp" segments also warp horizontal progress, for an accelerating swoop.
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

        // Faintest/longest-lag copies first, so the lead dot paints on top.
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
