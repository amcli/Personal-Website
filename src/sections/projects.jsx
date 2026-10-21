import { useId, useRef } from "react";
import { Search, X } from "lucide-react";
import { FaGithub, FaItchIo } from "react-icons/fa";
import CutPanel from "../components/hud/cut_panel";
import SectionHeading from "../components/hud/section_heading";
import StackChips from "../components/hud/stack_chips";
import { ALL } from "../hooks/useProjectExplorer";
import { categories, projects, pad2 } from "../data/content";

function SearchField({ value, onChange }) {
  const inputRef = useRef(null);
  return (
    <div className="hud-cut-s min-w-0 flex-[1_1_220px] bg-ff-teal/40 p-px transition-colors focus-within:bg-ff-glow">
      <label className="hud-cut-s flex min-h-11 items-center gap-2.5 bg-[rgba(6,12,15,0.94)] px-3.5">
        <Search className="size-4 shrink-0 text-ff-teal" aria-hidden="true" />
        <span className="sr-only">Search projects</span>
        {/*16px text on touch screens stops iOS from zooming in when the field is focused*/}
        <input
          ref={inputRef}
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Search projects or tech…"
          autoComplete="off"
          spellCheck={false}
          className="min-w-0 flex-1 bg-transparent font-hud text-sm text-ff-text outline-none placeholder:text-[#7f8f8b] pointer-coarse:text-base [&::-webkit-search-cancel-button]:appearance-none"
        />
        {value && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className="-mr-1.5 grid size-9 place-items-center text-ff-muted transition-colors hover:text-ff-teal"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        )}
      </label>
    </div>
  );
}

// Native radios keep arrow-key navigation and screen reader support; the labels carry the styling
function CategoryPicker({ value, onChange }) {
  const name = useId();
  return (
    <div role="radiogroup" aria-label="Filter projects by category" className="flex flex-wrap gap-1.5">
      {[ALL, ...categories].map((option) => {
        const checked = option.key === value;
        return (
          <label
            key={option.key}
            className={`flex min-h-11 -skew-x-12 cursor-pointer items-center px-3.5 font-hud text-xs font-semibold uppercase tracking-[0.14em] transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ff-glow has-[:focus-visible]:outline-solid ${
              checked
                ? "bg-ff-teal text-[#061012]"
                : "bg-ff-teal/[0.06] text-[#b6c4c0] shadow-[inset_0_0_0_1px_rgba(95,232,209,0.35)] hover:bg-ff-teal/15"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.key}
              checked={checked}
              onChange={() => onChange(option.key)}
              className="sr-only"
            />
            <span className="skew-x-12">{option.label}</span>
          </label>
        );
      })}
    </div>
  );
}

const corner = "pointer-events-none absolute size-[18px] border-ff-teal";

function ProjectPanel({ project, panelRef }) {
  const media = typeof project.media === "string" ? { src: project.media } : project.media;
  const image = media && (
    <img
      key={media.src}
      src={media.src}
      alt={`${project.title} screenshot`}
      loading="lazy"
      className="h-full w-full object-cover opacity-90"
    />
  );

  return (
    <article ref={panelRef} aria-labelledby="proj-sel-h" className="min-w-0 flex-[2_1_340px] scroll-mt-32">
      <CutPanel innerClassName="flex flex-col gap-3.5 p-3.5">
        <div className="relative aspect-[5/2] overflow-hidden bg-[#0b1014]">
          {media ? (
            media.link ? (
              <a href={media.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                {image}
                <span className="sr-only">Open {project.title}</span>
              </a>
            ) : (
              image
            )
          ) : (
            <div
              className="absolute inset-0 grid place-items-center"
              style={{
                background:
                  "repeating-linear-gradient(135deg, rgba(95,232,209,0.04) 0px, rgba(95,232,209,0.04) 8px, transparent 8px, transparent 16px)",
              }}
            >
              <span aria-hidden="true" className="hud-wings block h-[121px] w-40 opacity-60" />
            </div>
          )}
          <span
            aria-hidden="true"
            className="hud-scan pointer-events-none absolute inset-x-0 -top-[18%] h-[18%] bg-gradient-to-b from-transparent via-ff-teal/[0.12] to-transparent"
          />
          <span aria-hidden="true" className={`${corner} left-2.5 top-2.5 border-l-2 border-t-2`} />
          <span aria-hidden="true" className={`${corner} right-2.5 top-2.5 border-r-2 border-t-2`} />
          <span aria-hidden="true" className={`${corner} bottom-2.5 left-2.5 border-b-2 border-l-2`} />
          <span aria-hidden="true" className={`${corner} bottom-2.5 right-2.5 border-b-2 border-r-2`} />
        </div>

        <div className="flex flex-col gap-2 px-1.5">
          <h3 id="proj-sel-h" className="font-display text-[22px] font-bold leading-tight">
            {project.title}
          </h3>
          <p className="text-[15px] font-medium leading-snug text-[#cad6d2]">{project.description}</p>
          <p className="text-sm leading-relaxed text-ff-muted">{project.tech}</p>
          <div className="mt-1">
            <StackChips stack={project.stack} />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 px-1.5 pb-1">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-cut-s inline-flex min-h-11 items-center gap-2 bg-ff-teal px-4 font-display text-[13px] font-bold tracking-[0.14em] text-[#061012] transition-[filter] duration-200 hover:brightness-110"
            >
              <FaGithub className="size-4" aria-hidden="true" />
              GITHUB
              <span className="sr-only">: {project.title}</span>
            </a>
          )}
          {project.itch && (
            <a
              href={project.itch}
              target="_blank"
              rel="noopener noreferrer"
              className="hud-cut-s inline-flex min-h-11 items-center gap-2 bg-ff-teal/10 px-4 font-display text-[13px] font-bold tracking-[0.14em] text-ff-teal shadow-[inset_0_0_0_1px_rgba(95,232,209,0.55)] transition-colors duration-200 hover:bg-ff-teal/20"
            >
              <FaItchIo className="size-4" aria-hidden="true" />
              PLAY ON ITCH.IO
              <span className="sr-only">: {project.title}</span>
            </a>
          )}
        </div>
      </CutPanel>
    </article>
  );
}

function EmptyState({ message, onReset }) {
  return (
    <CutPanel rim="rgba(95,232,209,0.3)" innerClassName="flex flex-col items-center gap-4 px-6 py-10 text-center">
      <span aria-hidden="true" className="hud-wings block h-[91px] w-[120px] opacity-50" />
      <p className="font-display text-lg font-semibold">{message}</p>
      <button
        type="button"
        onClick={onReset}
        className="hud-cut-s min-h-11 bg-ff-teal/10 px-4 font-hud text-xs uppercase tracking-[0.14em] text-ff-teal shadow-[inset_0_0_0_1px_rgba(95,232,209,0.5)] transition-colors hover:bg-ff-teal/20"
      >
        Show all projects
      </button>
    </CutPanel>
  );
}

export default function Projects({ explorer }) {
  const { query, setQuery, category, setCategory, results, selected, select, labelOf, terms, reset } = explorer;
  const panelRef = useRef(null);

  const scope = category === ALL.key ? "projects" : `${labelOf(category).toLowerCase()} projects`;
  const emptyMessage = terms.length > 0 ? `No ${scope} match “${query.trim()}”` : `No ${scope} yet`;
  const summary =
    results.length === projects.length
      ? `${pad2(projects.length)} projects`
      : `${pad2(results.length)} of ${pad2(projects.length)} projects`;

  const pick = (title) => {
    select(title);
    // On phones the panel sits under the list, so bring it into view
    if (window.matchMedia("(max-width: 639px)").matches) {
      requestAnimationFrame(() => panelRef.current?.scrollIntoView({ block: "start" }));
    }
  };

  return (
    <section id="projects" aria-labelledby="proj-h" className="flex scroll-mt-28 flex-col gap-[18px] lg:scroll-mt-44">
      <SectionHeading id="proj-h" code="MODULE γ" title="Projects">
        <p aria-live="polite" className="ml-auto font-hud text-[11px] uppercase tracking-[0.2em] text-ff-muted">
          {summary}
        </p>
      </SectionHeading>

      <div className="flex flex-wrap items-center gap-2.5">
        <SearchField value={query} onChange={setQuery} />
        <CategoryPicker value={category} onChange={setCategory} />
      </div>

      {selected ? (
        <div className="flex flex-wrap items-start gap-[18px]">
          <ul aria-label="Project list" className="flex min-w-0 flex-[1_1_210px] flex-col gap-1 sm:max-w-[250px]">
            {results.map((p) => {
              const on = p === selected;
              return (
                <li key={p.title}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => pick(p.title)}
                    className={`flex min-h-[52px] w-full items-center gap-3 px-3 py-2 text-left transition-colors duration-200 ${
                      on
                        ? "bg-gradient-to-r from-ff-teal/[0.18] to-ff-teal/[0.03] shadow-[inset_2px_0_0_#5fe8d1,inset_0_0_0_1px_rgba(95,232,209,0.4)]"
                        : "bg-white/[0.015] shadow-[inset_0_0_0_1px_rgba(95,232,209,0.1)] hover:bg-ff-teal/[0.07]"
                    }`}
                  >
                    <span className={`w-5 font-hud text-[11px] ${on ? "text-ff-teal" : "text-ff-muted"}`}>
                      {pad2(projects.indexOf(p) + 1)}
                    </span>
                    <span className="flex min-w-0 flex-1 flex-col gap-[3px]">
                      <span className="truncate font-display text-[15px] font-semibold">{p.title}</span>
                      <span className="font-hud text-[10px] uppercase tracking-[0.16em] text-ff-muted">
                        {labelOf(p.category)}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
          <ProjectPanel project={selected} panelRef={panelRef} />
        </div>
      ) : (
        <EmptyState message={emptyMessage} onReset={reset} />
      )}
    </section>
  );
}
