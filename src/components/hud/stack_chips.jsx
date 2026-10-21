// Firefly's holo palette: teal → glow → ember. Each tag takes its own colour along this
// gradient, so a row of tags reads as one sweep from cool to warm.
const STOPS = [
  [95, 232, 209], // ff-teal  #5fe8d1
  [217, 247, 107], // ff-glow  #d9f76b
  [255, 122, 60], // ff-ember #ff7a3c
];

function tagColor(index, count) {
  const t = count <= 1 ? 0 : index / (count - 1);
  const scaled = t * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(scaled));
  const local = scaled - i;
  return STOPS[i].map((c, k) => Math.round(c + (STOPS[i + 1][k] - c) * local)).join(",");
}

export default function StackChips({ stack }) {
  if (!stack?.length) return null;
  return (
    <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
      {stack.map((tag, i) => {
        const rgb = tagColor(i, stack.length);
        return (
          <li
            key={tag}
            style={{
              color: `rgb(${rgb})`,
              background: `rgba(${rgb},0.08)`,
              boxShadow: `inset 0 0 0 1px rgba(${rgb},0.45)`,
              "--tag-glow": `rgba(${rgb},0.35)`,
            }}
            className="px-2 py-1 font-hud text-xs transition-[filter,box-shadow] duration-200 hover:brightness-125 hover:drop-shadow-[0_0_6px_var(--tag-glow)]"
          >
            {tag}
          </li>
        );
      })}
    </ul>
  );
}
