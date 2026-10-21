import { useState } from "react";

export const ALL = { key: "all", label: "All" };

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

// Search, category filter and the locked-on project. Lives above the Projects section so the
// HUD's readout column can show the selected project too.
export default function useProjectExplorer(projects, categories) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL.key);
  const [picked, setPicked] = useState(projects[0]?.title);

  const labelOf = (key) => categories.find((c) => c.key === key)?.label ?? "";
  const stackWords = projects.flatMap((p) => p.stack ?? []).join(" ").toLowerCase();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
  const results = projects.filter(
    (project) =>
      (category === ALL.key || project.category === category) &&
      matchesQuery(project, terms, stackWords, labelOf(project.category))
  );

  // If the filter hides the picked project, lock onto the first one still showing
  const selected = results.find((p) => p.title === picked) ?? results[0] ?? null;

  return {
    query,
    setQuery,
    category,
    setCategory,
    results,
    selected,
    select: setPicked,
    labelOf,
    terms,
    reset: () => {
      setQuery("");
      setCategory(ALL.key);
    },
  };
}
