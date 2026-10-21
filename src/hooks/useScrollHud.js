import { useEffect, useState } from "react";

// Tracks which section is under the HUD's line of sight and how far down the page we are.
// A section counts as active once its top passes 40% of the viewport; at the very bottom
// the last section wins, since a short final section may never reach that line.
export default function useScrollHud(ids, enabled = true) {
  const [state, setState] = useState({ active: ids[0], progress: 0 });
  const key = ids.join(",");

  useEffect(() => {
    if (!enabled) return undefined;
    const list = key.split(",");
    let frame = 0;

    const measure = () => {
      frame = 0;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const y = window.scrollY;
      const progress = Math.min(1, Math.max(0, y / max));

      let active = list[0];
      if (max - y < 4 && y > 0) {
        active = list[list.length - 1];
      } else {
        const line = window.innerHeight * 0.4;
        for (const id of list) {
          const el = document.getElementById(id);
          if (el && el.getBoundingClientRect().top <= line) active = id;
        }
      }

      setState((prev) =>
        prev.active === active && Math.abs(prev.progress - progress) < 0.002 ? prev : { active, progress }
      );
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [key, enabled]);

  return state;
}
