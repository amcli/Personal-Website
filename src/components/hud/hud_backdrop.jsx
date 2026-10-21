// The scene behind the visor: glows, a faint grid, scanlines, a vignette and the visor's frame
// lines. Fixed to the viewport, so content scrolls over it.
export default function HudBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 50% at 30% 108%, rgba(255,122,60,0.11), transparent 62%), radial-gradient(40% 50% at 66% 34%, rgba(95,232,209,0.09), transparent 70%), linear-gradient(180deg, #081115 0%, #06090c 55%, #0a0c10 100%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(95,232,209,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(95,232,209,0.035) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse at 50% 45%, #000 25%, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at 50% 45%, #000 25%, transparent 78%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(0,0,0,0.2) 0px, rgba(0,0,0,0.2) 1px, transparent 1px, transparent 3px)",
        }}
      />
      <div className="absolute inset-0 shadow-[inset_0_0_240px_60px_rgba(0,0,0,0.85)]" />

      {/* Visor frame: corner brackets top and bottom (desktop) */}
      <svg
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full fill-none lg:block"
      >
        <path d="M 18 170 L 18 44 L 42 18 L 260 18" vectorEffect="non-scaling-stroke" className="stroke-ff-teal/50" strokeWidth="1.5" />
        <path d="M 1422 170 L 1422 44 L 1398 18 L 1180 18" vectorEffect="non-scaling-stroke" className="stroke-ff-teal/50" strokeWidth="1.5" />
        <path
          d="M 18 740 L 18 858 L 42 882 L 260 882 M 1180 882 L 1398 882 L 1422 858 L 1422 740"
          vectorEffect="non-scaling-stroke"
          className="stroke-ff-teal/35"
          strokeWidth="1.5"
        />
      </svg>

      {/* Phone: just the two top corners */}
      <svg viewBox="0 0 110 120" className="absolute left-0 top-0 h-[120px] w-[110px] fill-none lg:hidden">
        <path d="M 8 120 L 8 26 L 22 10 L 110 10" className="stroke-ff-teal/50" strokeWidth="1.5" />
      </svg>
      <svg viewBox="0 0 110 120" className="absolute right-0 top-0 h-[120px] w-[110px] fill-none lg:hidden">
        <path d="M 102 120 L 102 26 L 88 10 L 0 10" className="stroke-ff-teal/50" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
