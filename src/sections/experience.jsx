import CutPanel from "../components/hud/cut_panel";
import SectionHeading from "../components/hud/section_heading";
import StackChips from "../components/hud/stack_chips";
import { experience } from "../data/content";

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="exp-h" className="flex scroll-mt-28 flex-col gap-5 lg:scroll-mt-44">
      <SectionHeading id="exp-h" code="MODULE β" title="Experience" />
      <ol className="flex flex-col gap-4">
        {experience.map((job) => (
          <li key={job.title}>
            <CutPanel rim="rgba(95,232,209,0.32)" innerClassName="flex flex-col gap-3 p-5 sm:p-6">
              <div className="flex flex-col gap-1.5">
                <h3 className="font-display text-xl font-bold leading-tight sm:text-[22px]">{job.title}</h3>
                <p className="font-hud text-[11px] uppercase tracking-[0.18em] text-ff-teal">{job.description}</p>
              </div>
              <p className="text-sm leading-relaxed text-ff-soft sm:text-[15px]">{job.tech}</p>
              <StackChips stack={job.stack} />
            </CutPanel>
          </li>
        ))}
      </ol>
    </section>
  );
}
