import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { CornerDownLeft } from "lucide-react";
import CutPanel from "./cut_panel";
import { TERMINAL_GREETING, TERMINAL_QA } from "../../data/terminal";

const PROMPT = "pilot@sam:~$";

// Words too common to tell questions apart
const FILLER = new Set(
  "a an the is are was were am be do does did you your yours i me my we what whats which who how why when where of to in on at for and or about tell can could would"
    .split(" ")
);

const normalize = (s) => s.toLowerCase().replace(/[^a-z0-9\s]/g, " ").replace(/\s+/g, " ").trim();
const keywords = (s) => normalize(s).split(" ").filter((w) => w && !FILLER.has(w));

// Exact question/alias first; otherwise the entry sharing the largest share of the prompt's
// keywords, as long as that's at least half of them.
function findAnswer(input) {
  const text = normalize(input);
  const phrasings = (qa) => [qa.question, ...(qa.aliases ?? [])];

  const exact = TERMINAL_QA.find((qa) => phrasings(qa).some((p) => normalize(p) === text));
  if (exact) return exact;

  const asked = new Set(keywords(input));
  if (asked.size === 0) return null;
  let best = null;
  let bestScore = 0;
  for (const qa of TERMINAL_QA) {
    const known = new Set(phrasings(qa).flatMap(keywords));
    const shared = [...asked].filter((w) => known.has(w)).length;
    const score = shared / asked.size;
    if (score > bestScore) {
      best = qa;
      bestScore = score;
    }
  }
  return bestScore >= 0.5 ? best : null;
}

// Answers may hold Markdown-style links: [label](https://...). Only http(s) and mailto
// URLs become links; anything else is left as the literal text.
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g;
const SAFE_URL = /^(https?:\/\/|mailto:)/i;

function parseAnswer(text) {
  const parts = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    if (m.index > last) parts.push({ text: text.slice(last, m.index) });
    parts.push(SAFE_URL.test(m[2]) ? { text: m[1], href: m[2] } : { text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push({ text: text.slice(last) });
  return parts;
}

const linkStyle = "text-ff-glow underline decoration-ff-glow/40 underline-offset-4";

// Types an answer out a few characters at a time. While typing, screen readers get the
// plain text and the links aren't clickable yet; once finished, the real links take over.
function Typed({ text, animate }) {
  const parts = useMemo(() => parseAnswer(text), [text]);
  const total = parts.reduce((n, p) => n + p.text.length, 0);
  const [shown, setShown] = useState(animate ? 0 : total);

  useEffect(() => {
    if (shown >= total) return undefined;
    const id = setTimeout(() => setShown((n) => Math.min(total, n + 3)), 16);
    return () => clearTimeout(id);
  }, [shown, total]);

  if (shown >= total) {
    return parts.map((p, i) =>
      p.href ? (
        <a
          key={i}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkStyle} transition-colors hover:text-ff-text hover:decoration-ff-text`}
        >
          {p.text}
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : (
        <span key={i}>{p.text}</span>
      )
    );
  }

  let left = shown;
  return (
    <>
      <span className="sr-only">{parts.map((p) => p.text).join("")}</span>
      <span aria-hidden="true">
        {parts.map((p, i) => {
          const visible = p.text.slice(0, Math.max(0, left));
          left -= p.text.length;
          if (!visible) return null;
          return (
            <span key={i} className={p.href ? linkStyle : undefined}>
              {visible}
            </span>
          );
        })}
        <span className="hud-blink text-ff-teal">▍</span>
      </span>
    </>
  );
}

// A tiny Q&A console: visitors type a prompt and get one of the prewritten answers
// from data/terminal.js.
export default function Terminal() {
  const reduced = useReducedMotion();
  const inputId = useId();
  const nextId = useRef(1);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  // Opens with the greeting and the list of questions, same as typing "help"
  const [lines, setLines] = useState(() => [
    { id: 0, kind: "sys", text: TERMINAL_GREETING },
    ...(TERMINAL_QA.length ? [{ id: -1, kind: "help" }] : []),
  ]);
  const [value, setValue] = useState("");
  const [history, setHistory] = useState([]);
  const historyPos = useRef(-1);

  // Follow new output, including answers as they type out, unless the reader has scrolled
  // up to reread something. Scrolling back to the bottom picks the follow back up.
  const following = useRef(true);
  useEffect(() => {
    const log = logRef.current;
    if (!log) return undefined;
    const follow = () => {
      if (following.current) log.scrollTop = log.scrollHeight;
    };
    const observer = new MutationObserver(follow);
    observer.observe(log, { childList: true, subtree: true, characterData: true });
    return () => observer.disconnect();
  }, []);
  const onLogScroll = () => {
    const log = logRef.current;
    following.current = log.scrollHeight - log.scrollTop - log.clientHeight < 24;
  };

  const push = (...entries) =>
    setLines((prev) => [...prev, ...entries.map((e) => ({ id: nextId.current++, ...e }))]);

  const run = (raw) => {
    const text = raw.trim();
    if (!text) return;
    setHistory((h) => [...h, text]);
    historyPos.current = -1;
    setValue("");
    following.current = true;

    const command = normalize(text);
    if (command === "clear" || command === "cls") {
      setLines([]);
      return;
    }
    const echo = { kind: "in", text };
    if (command === "help" || text === "?") {
      push(echo, TERMINAL_QA.length ? { kind: "help" } : { kind: "sys", text: "No queries loaded yet." });
      return;
    }
    const hit = findAnswer(text);
    push(
      echo,
      hit
        ? { kind: "out", text: hit.answer, animate: !reduced }
        : { kind: "err", text: `No record matches “${text}”. Type “help” to list what you can ask.` }
    );
  };

  const onKeyDown = (e) => {
    if (e.key === "ArrowUp" || e.key === "ArrowDown") {
      if (!history.length) return;
      e.preventDefault();
      const pos = historyPos.current;
      const next =
        e.key === "ArrowUp"
          ? pos < 0 ? history.length - 1 : Math.max(0, pos - 1)
          : pos < 0 ? -1 : pos + 1;
      historyPos.current = next >= history.length ? -1 : next;
      setValue(historyPos.current < 0 ? "" : history[historyPos.current]);
    } else if (e.key === "Escape") {
      setValue("");
      historyPos.current = -1;
    }
  };

  return (
    // data-pager-lock: scrolling over the terminal only scrolls its log, never changes section.
    // The hover glow (outside the clipped panel, so it can spread) shows that the scroll is held.
    <div
      data-pager-lock=""
      className="group transition-[filter] duration-300 hover:[filter:drop-shadow(0_0_14px_rgba(95,232,209,0.16))]"
    >
      <CutPanel
        as="section"
        aria-label="SAM query terminal"
        rim="rgba(95,232,209,0.32)"
        innerClassName="flex flex-col transition-[background-color,box-shadow] duration-300 group-hover:bg-[rgba(10,24,28,0.94)] group-hover:shadow-[inset_0_0_36px_rgba(95,232,209,0.07)]"
      >
        <div className="flex items-center gap-2.5 border-b border-ff-teal/15 px-4 py-2.5 sm:px-5">
          <span aria-hidden="true" className="hud-blink size-1.5 rounded-full bg-ff-teal shadow-[0_0_6px_#5fe8d1]" />
          <span className="font-hud text-[11px] tracking-[0.24em] text-ff-teal">SAM // QUERY TERMINAL</span>
          <span
            aria-hidden="true"
            className="ml-auto hidden items-center gap-1.5 font-hud text-[10px] tracking-[0.2em] text-ff-teal opacity-0 transition-opacity duration-300 group-hover:opacity-100 lg:flex"
          >
            <span className="size-1 rounded-full bg-ff-teal" />
            SCROLL LOCK
          </span>
          <span className="ml-auto hidden font-hud text-[10px] tracking-[0.2em] text-ff-muted sm:inline lg:ml-4">
            HELP · CLEAR · ↑↓ HISTORY
          </span>
        </div>

        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
          onScroll={onLogScroll}
          className="hud-scroll h-56 space-y-1.5 lg:h-[clamp(10rem,calc(100vh-724px),15rem)] overflow-y-auto overscroll-contain px-4 py-3 font-hud text-[13px] leading-relaxed sm:px-5"
        >
          {lines.map((line) => {
            switch (line.kind) {
              case "in":
                return (
                  <p key={line.id} className="break-words">
                    <span className="text-ff-teal">{PROMPT}</span> <span className="text-ff-text">{line.text}</span>
                  </p>
                );
              case "out":
                return (
                  <p key={line.id} className="whitespace-pre-line break-words text-ff-soft">
                    <Typed text={line.text} animate={line.animate} />
                  </p>
                );
              case "err":
                return (
                  <p key={line.id} className="break-words text-[#ff8a52]">
                    {line.text}
                  </p>
                );
              case "help":
                return (
                  <ul key={line.id} aria-label="Available questions" className="space-y-0.5">
                    {TERMINAL_QA.map((qa) => (
                      <li key={qa.question}>
                        <button
                          type="button"
                          onClick={() => {
                            run(qa.question);
                            inputRef.current?.focus();
                          }}
                          className="text-left text-ff-glow underline-offset-4 transition-colors hover:text-ff-text hover:underline"
                        >
                          › {qa.question}
                        </button>
                      </li>
                    ))}
                  </ul>
                );
              default:
                return (
                  <p key={line.id} className="break-words text-ff-muted">
                    {line.text}
                  </p>
                );
            }
          })}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            run(value);
          }}
          className="flex items-center gap-2 border-t border-ff-teal/15 py-1.5 pl-4 pr-2 transition-colors focus-within:bg-ff-teal/[0.05] sm:pl-5"
        >
          <label htmlFor={inputId} className="shrink-0 font-hud text-[13px] text-ff-teal">
            <span aria-hidden="true">{PROMPT}</span>
            <span className="sr-only">Ask SAM a question</span>
          </label>
          {/*16px text on touch screens stops iOS from zooming in when the field is focused*/}
          <input
            ref={inputRef}
            id={inputId}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="ask something…"
            autoComplete="off"
            autoCapitalize="off"
            spellCheck={false}
            enterKeyHint="send"
            className="min-w-0 flex-1 bg-transparent py-1.5 font-hud text-[13px] text-ff-text caret-ff-teal outline-none placeholder:text-ff-muted/60 pointer-coarse:text-base"
          />
          <button
            type="submit"
            aria-label="Send"
            className="grid size-10 shrink-0 place-items-center text-ff-teal transition-colors hover:bg-ff-teal/10"
          >
            <CornerDownLeft className="size-4" aria-hidden="true" />
          </button>
        </form>
      </CutPanel>
    </div>
  );
}
