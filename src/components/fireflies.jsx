import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

// Drifting, blinking firefly lights. Positions are seeded so the layout is
// stable between renders; colors alternate between the fyrefly glow and
// Firefly's teal.
export default function Fireflies({ count = 16, className = "" }) {
  const reduceMotion = useReducedMotion();

  const flies = useMemo(() => {
    let seed = 26710; // AR-26710
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${5 + rand() * 90}%`,
      top: `${10 + rand() * 80}%`,
      size: 3 + rand() * 4,
      teal: i % 3 === 0,
      duration: 6 + rand() * 8,
      delay: rand() * 6,
      dx: (rand() - 0.5) * 40,
      dy: -(10 + rand() * 30),
    }));
  }, [count]);

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {flies.map((f) => (
        <motion.span
          key={f.id}
          className={`absolute rounded-full ${f.teal ? "bg-ff-teal" : "bg-ff-glow"}`}
          style={{
            left: f.left,
            top: f.top,
            width: f.size,
            height: f.size,
            boxShadow: `0 0 ${f.size * 3}px ${f.size}px ${
              f.teal ? "rgba(95,232,209,0.35)" : "rgba(217,247,107,0.35)"
            }`,
          }}
          initial={{ opacity: 0 }}
          animate={
            reduceMotion
              ? { opacity: 0.5 }
              : { opacity: [0, 0.9, 0.2, 0.8, 0], x: [0, f.dx, f.dx * 0.4], y: [0, f.dy, f.dy * 1.6] }
          }
          transition={{
            duration: f.duration,
            delay: f.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
