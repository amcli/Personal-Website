import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Search, X } from "lucide-react";
import { CardList, SectionHeading } from "./card_grid";
import UltMark from "./ult_mark";

const ALL = { key: "all", label: "All" };
const HIGHLIGHT_SPRING = { type: "spring", stiffness: 380, damping: 34 };

// True when `term` starts a word in `text`, so "rea" finds "React" but "ai" skips "campaigns"
function startsWord(text, term) {
  const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`(^|[^a-z0-9])${escaped}`).test(text);
}

// Every word of the query has to match. Words that appear in any project's stack are treated as
// tech and only checked against stacks and titles, so "react" finds the React projects rather than
// Parry Arena's "reactive enemy AI". Other words can match the title, text or category.
function matchesQuery(project, terms, stackWords, categoryLabel) {
  const stack = (project.stack ?? []).join(" ").toLowerCase();
  const title = project.title.toLowerCase();
  const text = [project.title, project.description, project.tech, categoryLabel].join(" ").toLowerCase();
  return terms.every((term) =>
    stackWords.includes(term) ? stack.includes(term) || startsWord(title, term) : startsWord(text, term)
  );
}

function SearchField({ value, onChange }) {
  const inputRef = useRef(null);

  return (
    <div className="relative flex-1 min-w-0">
      {/*16px text on touch screens stops iOS from zooming in when the field is focused*/}
      <input
        ref={inputRef}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search projects or tech…"
        aria-label="Search projects"
        autoComplete="off"
        spellCheck={false}
        className="peer w-full rounded-lg bg-transparent py-2 pl-9 pr-9 text-left font-mono text-sm pointer-coarse:text-base text-ff-text placeholder:text-ff-muted/60 transition-colors duration-300 focus:bg-ff-bg-2/60 focus:outline-none focus-visible:ring-1 focus-visible:ring-ff-teal/50 [&::-webkit-search-cancel-button]:appearance-none"
      />
      <Search
        aria-hidden="true"
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ff-muted pointer-events-none transition-colors duration-300 peer-focus:text-ff-teal"
      />
      {value && (
        <button
          type="button"
          onClick={() => {
            onChange("");
            // The button goes away with the text, so give focus back to the field
            inputRef.current?.focus();
          }}
          aria-label="Clear search"
          className="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center w-7 h-7 rounded-md text-ff-muted transition-colors duration-300 hover:text-ff-teal focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-teal/60"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

// Native radios keep arrow-key navigation and screen reader support; the labels carry the styling.
function CategoryPicker({ options, value, onChange }) {
  const id = useId();
  const reduced = useReducedMotion();

  return (
    <div role="radiogroup" aria-label="Filter projects by category" className="flex">
      {options.map((option) => {
        const checked = option.key === value;
        return (
          <label
            key={option.key}
            className={`relative flex-1 md:flex-none cursor-pointer rounded-lg px-1 sm:px-4 py-2 text-center font-mono text-[10px] sm:text-xs tracking-[0.12em] sm:tracking-[0.25em] uppercase whitespace-nowrap transition-colors duration-300 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ff-teal/60 ${
              checked ? "text-ff-teal" : "text-ff-muted hover:text-ff-text"
            }`}
          >
            <input
              type="radio"
              name={id}
              value={option.key}
              checked={checked}
              onChange={() => onChange(option.key)}
              className="sr-only"
            />
            {checked && (
              <motion.span
                layoutId={`${id}-highlight`}
                transition={reduced ? { duration: 0 } : HIGHLIGHT_SPRING}
                aria-hidden="true"
                className="absolute inset-0 rounded-lg border border-ff-teal/40 bg-ff-teal/10 shadow-[0_0_16px_rgba(95,232,209,0.18)]"
              >
                <span className="absolute inset-x-3 -bottom-px h-px bg-gradient-to-r from-transparent via-ff-teal to-transparent" />
              </motion.span>
            )}
            <span className="relative">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

function EmptyState({ message, onReset }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-ff-line bg-ff-panel px-6 py-10 shadow-2xl"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "radial-gradient(55% 55% at 50% 30%, rgba(95,232,209,0.14) 0%, transparent 70%)",
        }}
      />
      <UltMark className="relative mx-auto w-12 h-12 opacity-55" />
      <p className="relative mt-4 text-lg font-semibold text-ff-text">{message}</p>
      <button
        type="button"
        onClick={onReset}
        className="relative mt-5 rounded-md border border-ff-line bg-ff-bg-2/60 px-3 py-1.5 font-mono text-[10px] tracking-wider uppercase text-ff-muted transition duration-300 hover:text-ff-teal hover:border-ff-teal/60 hover:shadow-[0_0_16px_rgba(95,232,209,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-teal/60"
      >
        Show all projects
      </button>
    </motion.div>
  );
}

export default function ProjectExplorer({ label, heading, categories, projects }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL.key);

  const labelOf = (key) => categories.find((c) => c.key === key)?.label ?? "";
  const stackWords = projects.flatMap((p) => p.stack ?? []).join(" ").toLowerCase();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = projects.filter(
    (project) =>
      (category === ALL.key || project.category === category) &&
      matchesQuery(project, terms, stackWords, labelOf(project.category))
  );

  const scope = category === ALL.key ? "projects" : `${labelOf(category).toLowerCase()} projects`;
  const emptyMessage = terms.length > 0 ? `No ${scope} match “${query.trim()}”` : `No ${scope} yet`;
  const summary =
    results.length === projects.length
      ? `${projects.length} projects`
      : `${results.length} of ${projects.length} projects`;

  const reset = () => {
    setQuery("");
    setCategory(ALL.key);
  };

  return (
    <div className="max-w-7xl mx-auto text-center">
      <SectionHeading label={label} heading={heading}>
        <div className="mt-8 mx-auto max-w-3xl flex flex-col md:flex-row md:items-center gap-1 rounded-xl border border-ff-line bg-ff-panel/70 p-1">
          <SearchField value={query} onChange={setQuery} />
          <span aria-hidden="true" className="mx-2 h-px bg-ff-line md:mx-0 md:h-6 md:w-px" />
          <CategoryPicker options={[ALL, ...categories]} value={category} onChange={setCategory} />
        </div>

        <p aria-live="polite" className="mt-3 font-mono text-[10px] tracking-[0.3em] uppercase text-ff-muted/60">
          {summary}
        </p>
      </SectionHeading>

      <CardList items={results} showMedia />
      {results.length === 0 && <EmptyState message={emptyMessage} onReset={reset} />}
    </div>
  );
}
