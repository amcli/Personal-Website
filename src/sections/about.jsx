import CutPanel from "../components/hud/cut_panel";
import SectionHeading from "../components/hud/section_heading";
import Terminal from "../components/hud/terminal";

const paragraph = "text-sm leading-[1.6] text-ff-soft sm:text-base sm:leading-[1.65]";

export default function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="flex scroll-mt-28 flex-col gap-5 lg:scroll-mt-44">
      <CutPanel innerClassName="flex flex-col gap-3 px-[18px] py-4 sm:px-7 sm:py-6">
        <SectionHeading id="about-h" code="MODULE α" title="About Me" small />
        <p className={paragraph}>
          I'm a dev that loves creating things I have passion for. Currently fixated on fullstack and game development, but
          I'm also a big fan of embedded and AI/ML. Outside of tech, I have an ongoing novel and many short stories in the workings!
        </p>
        <p className={paragraph}>
          I'm currently in my third year at the University of Waterloo for Computer Engineering, but I'm from
          Vancouver. Given free time, I like to play (mostly gacha) games, watch anime, listen to music, read &amp;
          write, and play sports. 
        </p>
      </CutPanel>

      <Terminal />
    </section>
  );
}
