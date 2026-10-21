import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { experience, projects, pad2 } from "../../data/content";

const list = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07 } },
  gone: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
};
const itemMotion = (reduced) => ({
  hidden: { opacity: 0, x: reduced ? 0 : 14 },
  shown: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  gone: { opacity: 0, x: reduced ? 0 : -10, transition: { duration: 0.16, ease: "easeIn" } },
});

// Right-hand readout column. Shows pilot stats, or the locked-on project's data while the
// Projects section is in view. Readouts swap out one by one rather than snapping.
export default function Readouts({ active, selectedProject, categoryLabel }) {
  const reduced = useReducedMotion();
  const onProject = active === "projects" && selectedProject;

  const items = onProject
    ? [
        { label: "Target", value: pad2(projects.indexOf(selectedProject) + 1), sub: `of ${pad2(projects.length)}` },
        { label: "Class", value: categoryLabel(selectedProject.category), text: true },
        { label: "Stack", value: pad2(selectedProject.stack.length) },
      ]
    : [
        { label: "Projects", value: pad2(projects.length) },
        { label: "Experiences", value: pad2(experience.length) },
        { label: "Year", value: "03" },
      ];
  const variants = itemMotion(reduced);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.dl
        key={onProject ? selectedProject.title : "pilot"}
        aria-label={onProject ? "Selected project readout" : "Pilot readout"}
        variants={list}
        initial="hidden"
        animate="shown"
        exit="gone"
        className="flex flex-col items-end gap-6 text-right"
      >
        {items.map((item) => (
          <motion.div key={item.label} variants={variants} className="flex flex-col items-end gap-1.5">
            <dt className="bg-ff-teal/10 px-2 py-[3px] font-hud text-[10px] font-semibold uppercase tracking-[0.16em] text-ff-teal shadow-[inset_0_0_0_1px_rgba(95,232,209,0.4)]">
              {item.label}
            </dt>
            <dd
              className={
                item.text
                  ? "font-display text-xl font-bold uppercase leading-tight text-ff-text"
                  : "font-display text-[42px] font-bold leading-none text-ff-teal [text-shadow:0_0_18px_rgba(95,232,209,0.3)]"
              }
            >
              {item.value}
            </dd>
            {item.sub && (
              <dd className="font-hud text-[10px] uppercase tracking-[0.18em] text-ff-muted">{item.sub}</dd>
            )}
          </motion.div>
        ))}
      </motion.dl>
    </AnimatePresence>
  );
}
