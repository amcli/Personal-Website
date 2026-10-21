import { motion, useReducedMotion } from "framer-motion";
import UltMark from "../ult_mark";

// SAM's targeting optic: rotating rings and reticle arcs over Firefly's winged emblem.
// The emblem is anchored on its flame/head (48.61%, 34.94% of the artwork) so the wings
// run level through the middle of the circle.
// Changing `pulseKey` plays a short lock-on ring, e.g. when the HUD moves to a new section.
export default function Optic({ size = 260, className = "", pulseKey }) {
  const reduced = useReducedMotion();
  const wingsW = size * (460 / 260);
  const wingsH = wingsW * (435 / 574);
  const wings = {
    width: wingsW,
    height: wingsH,
    transform: "translate(-48.61%, -34.94%)",
  };

  return (
    <div aria-hidden="true" className={`relative shrink-0 ${className}`} style={{ width: size, height: size }}>
      <div className="hud-wings absolute left-1/2 top-1/2 opacity-45" style={wings} />
      <div className="hud-wings-sweep absolute left-1/2 top-1/2 opacity-40" style={wings} />

      <svg viewBox="0 0 300 300" className="hud-spin-rev absolute inset-0 h-full w-full fill-none">
        <circle cx="150" cy="150" r="147" strokeDasharray="44 18 4 18" className="stroke-ff-teal/20" strokeWidth="1" />
      </svg>
      <svg viewBox="0 0 300 300" className="absolute inset-0 h-full w-full fill-none">
        <path d="M 80 271.2 A 140 140 0 0 1 80 28.8" className="stroke-ff-teal/70" strokeWidth="2" />
        <path d="M 220 28.8 A 140 140 0 0 1 220 271.2" className="stroke-ff-teal/70" strokeWidth="2" />
        <circle cx="150" cy="150" r="104" className="stroke-ff-teal/55 fill-ff-teal/[0.04]" strokeWidth="1.5" />
        <path
          d="M 72 134 L 56 150 L 72 166 M 228 134 L 244 150 L 228 166"
          className="stroke-ff-teal"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M 143 4 L 157 4 L 150 13 Z" className="fill-ff-teal" />
      </svg>
      <svg viewBox="0 0 300 300" className="hud-spin absolute inset-0 h-full w-full fill-none">
        <circle cx="150" cy="150" r="122" strokeDasharray="3 9" className="stroke-ff-teal/50" strokeWidth="2" />
      </svg>

      {pulseKey !== undefined && !reduced && (
        <motion.span
          key={pulseKey}
          className="absolute inset-[13%] rounded-full border-2 border-ff-teal"
          initial={{ opacity: 0.85, scale: 1.3 }}
          animate={{ opacity: 0, scale: 0.94 }}
          transition={{ duration: 0.75, ease: "easeOut" }}
        />
      )}

      <div className="absolute inset-0 grid place-items-center">
        <UltMark className="h-[17%] w-[17%] opacity-75 drop-shadow-[0_0_12px_rgba(95,232,209,0.5)]" />
      </div>
    </div>
  );
}
