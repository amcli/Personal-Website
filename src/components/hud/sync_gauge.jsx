const RADIUS = 34;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// Ring gauge in the top-right corner; fills as you scroll down the page.
export default function SyncGauge({ progress }) {
  const pct = Math.round(progress * 100);

  return (
    <div
      role="img"
      aria-label={`Page scrolled ${pct}%`}
      className="relative size-[52px] shrink-0 lg:size-[68px]"
    >
      <svg viewBox="0 0 88 88" aria-hidden="true" className="absolute inset-0 h-full w-full fill-none">
        <circle cx="44" cy="44" r="42" strokeDasharray="1 5" className="stroke-ff-teal/40" strokeWidth="3" />
        <circle cx="44" cy="44" r={RADIUS} className="stroke-ff-teal/15" strokeWidth="5" />
        <circle
          cx="44"
          cy="44"
          r={RADIUS}
          transform="rotate(-90 44 44)"
          strokeDasharray={`${(CIRCUMFERENCE * progress).toFixed(1)} 400`}
          className="stroke-ff-teal transition-[stroke-dasharray] duration-200 ease-linear"
          strokeWidth="5"
        />
      </svg>
      <div aria-hidden="true" className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-[13px] font-bold leading-none text-ff-teal lg:text-[17px]">
          {String(pct).padStart(2, "0")}%
        </span>
        <span className="mt-0.5 hidden font-hud text-[8px] tracking-[0.2em] text-ff-muted lg:block">SYNC</span>
      </div>
    </div>
  );
}
