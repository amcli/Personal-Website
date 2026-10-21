// "MODULE β  Experience": small mono code, then the heading. `children` sit at the far right.
export default function SectionHeading({ id, code, title, small = false, children }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
      <span className="hud-label">{code}</span>
      <h2
        id={id}
        className={`font-display font-bold leading-tight ${small ? "text-xl sm:text-2xl" : "text-[28px] lg:text-[34px]"}`}
      >
        {title}
      </h2>
      {children}
    </div>
  );
}
