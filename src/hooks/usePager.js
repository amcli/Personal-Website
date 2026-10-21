import { useCallback, useEffect, useRef, useState } from "react";

const QUIET_MS = 200; // a pause this long ends a wheel/trackpad gesture
const LOCK_MS = 700; // minimum time between page changes
const WHEEL_STEP = 50; // wheel distance at a page's edge needed to change page

const isTyping = (el) => !!el?.closest?.("input, textarea, select, [contenteditable='true']");

// The page on screen (pages that are animating out are marked "leaving")
const currentPage = () => document.querySelector('[data-pager-page="current"]');

// True when some scrollable element between `target` and the page can scroll in `dir`;
// the browser scrolls that element, so the wheel shouldn't also change page.
// Elements marked data-pager-lock (e.g. the terminal) never change page from a wheel or swipe
const inLockedZone = (target) => !!target?.closest?.("[data-pager-lock]");

function nestedCanScroll(target, dir, page) {
  for (let el = target; el && el !== page && el !== document.body; el = el.parentElement) {
    if (el.scrollHeight <= el.clientHeight + 1) continue;
    const { overflowY } = getComputedStyle(el);
    if (overflowY !== "auto" && overflowY !== "scroll") continue;
    const room = dir > 0 ? Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight - 1 : el.scrollTop > 1;
    if (room) return true;
  }
  return false;
}

function indexFromHash(ids) {
  const i = ids.indexOf(window.location.hash.slice(1));
  return i < 0 ? 0 : i;
}

// One section per screen: wheel, swipe, arrow/page keys and in-page links move between pages.
// A page taller than its frame scrolls inside first; only once it hits its end does the next
// gesture change page. Trackpad momentum is absorbed by waiting for a pause between gestures.
export default function usePager(ids, enabled) {
  const [page, setPage] = useState(() => ({ index: indexFromHash(ids), dir: 1, focus: false }));
  const indexRef = useRef(page.index);
  const gesture = useRef({ until: 0, quiet: false, lastWheel: 0, acc: 0, lastInner: 0, touchY: null, touchCan: null });

  const goTo = useCallback(
    (target, { focus = false } = {}) => {
      const from = indexRef.current;
      const to = Math.max(0, Math.min(ids.length - 1, target));
      if (to === from) return;
      indexRef.current = to;
      Object.assign(gesture.current, { until: performance.now() + LOCK_MS, quiet: true, acc: 0 });
      setPage({ index: to, dir: to > from ? 1 : -1, focus });
      window.history.replaceState(null, "", `#${ids[to]}`);
    },
    [ids]
  );

  // The page itself never scrolls in paged mode
  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = "hidden";
    window.scrollTo(0, 0);
    return () => {
      root.style.overflow = previous;
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return undefined;
    const g = gesture.current;

    const canScroll = (dir) => {
      const el = currentPage();
      if (!el) return false;
      return dir > 0 ? Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight - 1 : el.scrollTop > 1;
    };

    const onWheel = (e) => {
      if (e.ctrlKey || inLockedZone(e.target)) return; // pinch zoom, or over a locked zone
      const now = performance.now();
      const gap = now - g.lastWheel;
      g.lastWheel = now;

      let dy = Math.abs(e.deltaY) >= Math.abs(e.deltaX) ? e.deltaY : 0;
      if (!dy) return;
      if (e.deltaMode === 1) dy *= 16;
      else if (e.deltaMode === 2) dy *= window.innerHeight;
      const dir = dy > 0 ? 1 : -1;

      // A scroll box inside the page (e.g. the terminal log) that can still move this way
      if (nestedCanScroll(e.target, dir, currentPage())) {
        g.acc = 0;
        g.lastInner = now;
        return;
      }

      if (canScroll(dir)) {
        // Over the page the browser scrolls it; over the optic or readouts, scroll it by hand
        const el = currentPage();
        if (!el.contains(e.target)) el.scrollBy({ top: dy });
        g.acc = 0;
        g.lastInner = now;
        return;
      }

      if (g.quiet) {
        if (gap < QUIET_MS || now < g.until) return;
        g.quiet = false;
      }
      // Momentum left over from scrolling inside the page: wait for the next gesture
      if (now - g.lastInner < QUIET_MS) {
        g.quiet = true;
        return;
      }
      if (gap > QUIET_MS) g.acc = 0;
      g.acc += dy;
      if (Math.abs(g.acc) >= WHEEL_STEP) goTo(indexRef.current + dir);
    };

    const onTouchStart = (e) => {
      if (e.touches.length !== 1 || inLockedZone(e.target)) {
        g.touchY = null;
        return;
      }
      g.touchY = e.touches[0].clientY;
      g.touchCan = { up: canScroll(-1), down: canScroll(1) };
    };
    const onTouchEnd = (e) => {
      if (g.touchY == null) return;
      const dy = g.touchY - e.changedTouches[0].clientY;
      g.touchY = null;
      if (Math.abs(dy) < 60 || performance.now() < g.until) return;
      const dir = dy > 0 ? 1 : -1;
      if (dir > 0 ? g.touchCan.down : g.touchCan.up) return;
      goTo(indexRef.current + dir);
    };

    const onKeyDown = (e) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || isTyping(e.target)) return;
      let dir = 0;
      let step = 80;
      const pageStep = (currentPage()?.clientHeight ?? 400) * 0.85;
      switch (e.key) {
        case "ArrowDown": dir = 1; break;
        case "ArrowUp": dir = -1; break;
        case "PageDown": dir = 1; step = pageStep; break;
        case "PageUp": dir = -1; step = pageStep; break;
        case " ":
          if (e.target.closest?.("button, a, label, [role='button']")) return;
          dir = e.shiftKey ? -1 : 1;
          step = pageStep;
          break;
        case "Home": e.preventDefault(); goTo(0, { focus: true }); return;
        case "End": e.preventDefault(); goTo(ids.length - 1, { focus: true }); return;
        default: return;
      }
      e.preventDefault();
      if (canScroll(dir)) currentPage().scrollBy({ top: dir * step, behavior: "smooth" });
      else if (performance.now() >= g.until) goTo(indexRef.current + dir, { focus: true });
    };

    // In-page links (#projects, ...) change page instead of jumping
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = e.target.closest?.('a[href^="#"]');
      if (!link) return;
      const target = ids.indexOf(link.getAttribute("href").slice(1));
      if (target < 0) return;
      e.preventDefault();
      if (target === indexRef.current) currentPage()?.scrollTo({ top: 0, behavior: "smooth" });
      else goTo(target, { focus: true });
    };

    const onHashChange = () => goTo(indexFromHash(ids));

    // Not passive: with a passive listener Chrome scrolls the page before the handler runs,
    // so the handler would see the page already at its end and change page on the same notch.
    // It never calls preventDefault, so scrolling itself isn't blocked.
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchend", onTouchEnd, { passive: true });
    window.addEventListener("keydown", onKeyDown);
    document.addEventListener("click", onClick);
    window.addEventListener("hashchange", onHashChange);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchend", onTouchEnd);
      window.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("click", onClick);
      window.removeEventListener("hashchange", onHashChange);
    };
  }, [enabled, goTo, ids]);

  return { index: page.index, dir: page.dir, focus: page.focus, goTo };
}
