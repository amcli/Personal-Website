import { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { animate, motion, useDragControls, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CardList, SectionHeading } from "./card_grid";

const SLIDE_SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 0.9 };
const REDUCED_SLIDE = { duration: 0.2, ease: "easeOut" };

// Letting go of a swipe switches showcases past this share of the width, or on a quick flick.
const SWIPE_DISTANCE = 0.18;
const SWIPE_VELOCITY = 450; // px/s
const FLICK_WINDOW_MS = 100; // holding still this long before letting go cancels the flick

// Trackpad swipes arrive as horizontal wheel events that keep coming (momentum) after the
// fingers lift, so one gesture moves one showcase and a pause starts the next gesture.
const WHEEL_THRESHOLD = 60;
const WHEEL_IDLE_MS = 200;

// Cards fade out at the edges while sliding instead of being cut off; the fade sits in the
// panels' side padding, so resting cards are untouched.
const EDGE_FADE = "linear-gradient(to right, transparent, #000 2rem, #000 calc(100% - 2rem), transparent)";

// Track height at a fractional showcase position, easing between neighbouring panels' heights.
function heightAt(heights, progress) {
  const i = Math.floor(progress);
  const next = heights[Math.min(i + 1, heights.length - 1)];
  return heights[i] + (next - heights[i]) * (progress - i);
}

function ArrowButton({ direction, disabled, onClick, label }) {
  const Icon = direction < 0 ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid place-items-center w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-ff-line bg-ff-panel/70 text-ff-muted transition duration-300 hover:text-ff-teal hover:border-ff-teal/60 hover:shadow-[0_0_16px_rgba(95,232,209,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-teal/60 disabled:opacity-30 disabled:pointer-events-none"
    >
      <Icon className="w-4 h-4" />
    </button>
  );
}

export default function ProjectShowcase({ label, heading, showcases }) {
  const reduced = useReducedMotion();
  const id = useId();
  const count = showcases.length;

  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const [heights, setHeights] = useState([]);
  const indexRef = useRef(0);
  const viewportRef = useRef(null);
  const panelRefs = useRef([]);
  const tabRefs = useRef([]);
  const dragged = useRef(false);
  const lastDragMove = useRef(0);
  const wheel = useRef({ total: 0, last: 0, done: false });
  const dragControls = useDragControls();

  const x = useMotionValue(0);
  // Fractional showcase position (0 = first) that follows the track, mid-drag included.
  const progress = useTransform(x, (v) => (width ? Math.max(0, Math.min(count - 1, -v / width)) : 0));
  const highlightX = useTransform(progress, (p) => `${p * 100}%`);
  // Each showcase gets its own height, so a shorter one doesn't leave a gap below it.
  const trackHeight = useTransform(progress, (p) => (heights.length === count ? heightAt(heights, p) : "auto"));

  const goTo = useCallback(
    (next, velocity = 0) => {
      const target = Math.max(0, Math.min(count - 1, next));
      indexRef.current = target;
      setIndex(target);
      animate(x, -target * width, reduced ? REDUCED_SLIDE : { ...SLIDE_SPRING, velocity });
    },
    [count, width, reduced, x]
  );

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const panels = panelRefs.current.slice(0, count);
    let lastWidth = -1;
    const measure = () => {
      // The viewport's height changes every frame while sliding; only a new width needs re-aligning
      const w = viewport.clientWidth;
      if (w !== lastWidth) {
        lastWidth = w;
        setWidth(w);
        x.jump(-indexRef.current * w);
      }
      const next = panels.map((p) => p.offsetHeight);
      setHeights((prev) => (next.length === prev.length && next.every((h, i) => h === prev[i]) ? prev : next));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(viewport);
    panels.forEach((p) => ro.observe(p));
    return () => ro.disconnect();
  }, [count, x]);

  useEffect(() => {
    const el = viewportRef.current;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault(); // also keeps the browser's swipe-to-go-back from firing
      const g = wheel.current;
      if (e.timeStamp - g.last > WHEEL_IDLE_MS) {
        g.total = 0;
        g.done = false;
      }
      g.last = e.timeStamp;
      if (g.done) return;
      g.total += e.deltaMode === 1 ? e.deltaX * 16 : e.deltaX;
      if (Math.abs(g.total) >= WHEEL_THRESHOLD) {
        g.done = true;
        goTo(indexRef.current + Math.sign(g.total));
      }
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [goTo]);

  const handleDragEnd = (_, { offset, velocity }) => {
    // Framer's velocity ignores a pause before release, so check how recently the pointer moved
    const flick = performance.now() - lastDragMove.current < FLICK_WINDOW_MS ? velocity.x : 0;
    let step = 0;
    if (Math.abs(flick) > SWIPE_VELOCITY) step = -Math.sign(flick);
    else if (Math.abs(offset.x) > width * SWIPE_DISTANCE) step = -Math.sign(offset.x);
    goTo(index + step, flick);
  };

  const handleTabKeyDown = (e) => {
    const next = { ArrowLeft: index - 1, ArrowRight: index + 1, Home: 0, End: count - 1 }[e.key];
    if (next === undefined) return;
    e.preventDefault();
    const target = Math.max(0, Math.min(count - 1, next));
    goTo(target);
    tabRefs.current[target]?.focus();
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <SectionHeading label={label} heading={heading}>
        <div className="mt-8 flex items-center justify-center gap-2 sm:gap-3">
          <ArrowButton
            direction={-1}
            disabled={index === 0}
            onClick={() => goTo(index - 1)}
            label="Previous showcase"
          />

          <div
            role="tablist"
            aria-label="Project showcases"
            onKeyDown={handleTabKeyDown}
            className="relative grid rounded-xl border border-ff-line bg-ff-panel/70 p-1"
            style={{ gridTemplateColumns: `repeat(${count}, minmax(max-content, 1fr))` }}
          >
            <motion.span
              aria-hidden="true"
              className="absolute inset-y-1 left-1 rounded-lg border border-ff-teal/40 bg-ff-teal/10 shadow-[0_0_16px_rgba(95,232,209,0.18)]"
              style={{ width: `calc((100% - 0.5rem) / ${count})`, x: highlightX }}
            >
              <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-ff-teal to-transparent" />
            </motion.span>

            {showcases.map((showcase, i) => (
              <button
                key={showcase.key}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`${id}-tab-${i}`}
                aria-controls={`${id}-panel-${i}`}
                aria-selected={i === index}
                tabIndex={i === index ? 0 : -1}
                onClick={() => goTo(i)}
                className={`relative rounded-lg px-2 sm:px-4 py-2 font-mono text-[10px] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase whitespace-nowrap transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-teal/60 ${
                  i === index ? "text-ff-teal" : "text-ff-muted hover:text-ff-text"
                }`}
              >
                {showcase.label}
              </button>
            ))}
          </div>

          <ArrowButton
            direction={1}
            disabled={index === count - 1}
            onClick={() => goTo(index + 1)}
            label="Next showcase"
          />
        </div>

        <p aria-hidden="true" className="hidden pointer-coarse:block mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-ff-muted/60">
          Swipe to switch
        </p>
      </SectionHeading>

      {/* The mask clips anything outside this box, so the vertical padding leaves room for hover
          rings and shadows; negative margins cancel it out in the layout. */}
      <div
        ref={viewportRef}
        className="-mx-8 -mt-4 pt-4 -mb-12 pb-12 overflow-x-clip"
        style={{ maskImage: EDGE_FADE, WebkitMaskImage: EDGE_FADE }}
      >
        <motion.div
          drag="x"
          dragControls={dragControls}
          dragListener={false}
          dragConstraints={{ left: -(count - 1) * width, right: 0 }}
          dragElastic={0.12}
          dragMomentum={false}
          onDragStart={() => {
            dragged.current = true;
          }}
          onDrag={() => {
            lastDragMove.current = performance.now();
          }}
          onDragEnd={handleDragEnd}
          onPointerDownCapture={(e) => {
            dragged.current = false;
            // Swiping is for touch and pen; with a mouse, the arrows and tabs do the switching
            if (e.pointerType !== "mouse") dragControls.start(e);
          }}
          onClickCapture={(e) => {
            // Releasing a swipe over a link would otherwise open it
            if (dragged.current) {
              e.preventDefault();
              e.stopPropagation();
            }
          }}
          style={{ x, height: trackHeight }}
          className="flex items-start touch-pan-y touch-pinch-zoom pointer-coarse:select-none"
        >
          {showcases.map((showcase, i) => (
            <div
              key={showcase.key}
              ref={(el) => {
                panelRefs.current[i] = el;
              }}
              role="tabpanel"
              id={`${id}-panel-${i}`}
              aria-labelledby={`${id}-tab-${i}`}
              inert={i !== index}
              className="w-full shrink-0 px-8"
            >
              <CardList items={showcase.projects} showMedia />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
