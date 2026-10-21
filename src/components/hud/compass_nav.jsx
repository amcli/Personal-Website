import { SECTIONS } from "../../data/content";

const TICKS = Array.from({ length: 49 }, (_, i) => ({
  h: i % 6 === 0 ? 12 : i % 3 === 0 ? 8 : 5,
  o: i % 6 === 0 ? 0.8 : 0.32,
}));

// The main nav, drawn as a compass heading strip across the top of the visor. A marker
// points down at the section currently in view.
export default function CompassNav({ active, className = "" }) {
  const current = SECTIONS.find((s) => s.id === active) ?? SECTIONS[0];

  return (
    <nav aria-label="Primary" className={`min-w-0 flex-col gap-0.5 ${className}`}>
      <div
        aria-hidden="true"
        className="flex items-center justify-center gap-2.5 font-hud text-[11px] tracking-[0.3em] text-ff-teal"
      >
        <span className="hud-wings block h-[30px] w-10" />
        HDG {current.hdg} · {current.label.toUpperCase()}
      </div>

      <ul className="flex justify-between">
        {SECTIONS.map((s) => {
          const on = s.id === active;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                aria-current={on ? "location" : undefined}
                className={`flex min-h-11 flex-col items-center justify-center gap-1.5 whitespace-nowrap px-2.5 py-0.5 font-hud text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 hover:bg-ff-teal/[0.07] ${
                  on ? "text-ff-text" : "text-ff-muted hover:text-ff-text"
                }`}
              >
                <span>
                  <span className={`normal-case ${on ? "text-ff-teal" : ""}`}>{s.code}</span> {s.label}
                </span>
                <span
                  aria-hidden="true"
                  className={`block h-0 w-0 border-x-[5px] border-t-[7px] border-x-transparent border-t-ff-teal transition-opacity duration-200 ${
                    on ? "opacity-100" : "opacity-0"
                  }`}
                />
              </a>
            </li>
          );
        })}
      </ul>

      <div aria-hidden="true" className="relative flex h-3.5 items-end justify-between">
        {TICKS.map((t, i) => (
          <span key={i} className="block w-px" style={{ height: t.h, background: `rgba(95,232,209,${t.o})` }} />
        ))}
        <span className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-ff-teal/60 to-transparent" />
      </div>
    </nav>
  );
}
