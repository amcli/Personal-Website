import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

const CYAN = ["#7ff7e6", "#5fe8d1", "#b8fff2"];
const EMBER = ["#ff7a3c", "#ffa04a", "#ffd27a"];

export default function Sparks({ count = 28, className = "" }) {
  const reduceMotion = useReducedMotion();

  const sparks = useMemo(() => {
    let seed = 2410;
    const rand = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };
    return Array.from({ length: count }, (_, i) => {
      const cyan = i % 5 !== 2 && i % 5 !== 4; // ~60% cyan, ~40% ember
      const pool = cyan ? CYAN : EMBER;
      const dx = (rand() - 0.5) * 220;
      const dy = -(160 + rand() * 260);
      return {
        id: i,
        color: pool[Math.floor(rand() * pool.length)],
        cyan,
        left: `${8 + rand() * 84}%`,
        top: `${55 + rand() * 40}%`,
        length: 10 + rand() * 18,
        dx,
        dy,
        angle: (Math.atan2(dy, dx) * 180) / Math.PI + 90,
        duration: 1.6 + rand() * 1.8,
        delay: rand() * 7,
        repeatDelay: 1 + rand() * 5,
      };
    });
  }, [count]);

  if (reduceMotion) return null;

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {sparks.map((s) => (
        <motion.span
          key={s.id}
          className="absolute block rounded-full"
          style={{
            left: s.left,
            top: s.top,
            width: 2.5,
            height: s.length,
            background: `linear-gradient(to top, transparent, ${s.color})`,
            boxShadow: `0 0 8px 1.5px ${s.cyan ? "rgba(95,232,209,0.6)" : "rgba(255,138,60,0.7)"}`,
            rotate: s.angle,
          }}
          initial={{ opacity: 0, x: 0, y: 0, scaleY: 0.4 }}
          animate={{
            opacity: [0, 1, 0.9, 0],
            x: [0, s.dx * 0.45, s.dx],
            y: [0, s.dy * 0.5, s.dy],
            scaleY: [0.4, 1.2, 0.6],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            repeatDelay: s.repeatDelay,
            ease: ["easeOut", "easeOut", "easeIn"],
            times: [0, 0.25, 0.7, 1],
          }}
        />
      ))}
    </div>
  );
}
