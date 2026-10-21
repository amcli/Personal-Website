// A chamfered HUD panel: a 1px coloured rim (any CSS background, so gradients work) around
// a dark glass body. clip-path can't draw borders, so the rim is an outer layer.
export const RIM_GLOW =
  "linear-gradient(135deg, rgba(95,232,209,0.6), rgba(95,232,209,0.1) 45%, rgba(255,122,60,0.35))";
export const RIM_TEAL = "rgba(95,232,209,0.45)";

export default function CutPanel({
  as: Tag = "div",
  rim = RIM_GLOW,
  small = false,
  solid = false,
  className = "",
  innerClassName = "",
  children,
  ...rest
}) {
  const cut = small ? "hud-cut-s" : "hud-cut";
  return (
    <Tag className={`${cut} p-px ${className}`} style={{ background: rim }} {...rest}>
      <div className={`${cut} h-full ${solid ? "bg-[#080d11]" : "bg-hud-glass"} ${innerClassName}`}>{children}</div>
    </Tag>
  );
}
