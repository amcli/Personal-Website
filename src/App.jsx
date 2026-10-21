import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useIsPresent, useReducedMotion } from "framer-motion";
import Hero from "./sections/hero";
import About from "./sections/about";
import Experience from "./sections/experience";
import Projects from "./sections/projects";
import Contact from "./sections/contact";
import HudBackdrop from "./components/hud/hud_backdrop";
import TopBar from "./components/hud/top_bar";
import BottomBar from "./components/hud/bottom_bar";
import Optic from "./components/hud/optic";
import Readouts from "./components/hud/readouts";
import SiteFooter from "./components/hud/site_footer";
import useScrollHud from "./hooks/useScrollHud";
import usePager from "./hooks/usePager";
import useMediaQuery from "./hooks/useMediaQuery";
import useProjectExplorer from "./hooks/useProjectExplorer";
import { SECTIONS, categories, projects } from "./data/content";

const SECTION_IDS = SECTIONS.map((s) => s.id);

// Desktop screens tall enough to fit a section show one section at a time
const PAGED_QUERY = "(min-width: 1024px) and (min-height: 600px)";

// Desktop: content | optic | readouts, stretched to the window edges
const COLUMNS = "lg:grid-cols-[minmax(0,860px)_minmax(260px,1fr)_minmax(130px,170px)] lg:gap-12";

const pageMotion = {
  enter: ({ dir, reduced }) => (reduced ? { opacity: 0 } : { opacity: 0, y: 56 * dir, filter: "blur(6px)" }),
  center: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: ({ dir, reduced }) => (reduced ? { opacity: 0 } : { opacity: 0, y: -56 * dir, filter: "blur(6px)" }),
};

// Screens whose height changes while you're on them stay pinned to the top, so picking a
// different project doesn't re-centre (and shift) the whole section
const TOP_ALIGNED = new Set(["projects"]);

// One section's screen. Scrolls inside itself when the section is taller than the frame.
function Page({ dir, focus, center = true, children }) {
  const reduced = useReducedMotion();
  const isPresent = useIsPresent();
  const ref = useRef(null);

  useEffect(() => {
    if (focus) ref.current?.focus({ preventScroll: true });
  }, [focus]);

  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      // usePager reads and scrolls the "current" page; the outgoing one is still animating out
      data-pager-page={isPresent ? "current" : "leaving"}
      custom={{ dir, reduced }}
      variants={pageMotion}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{ duration: reduced ? 0.2 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="hud-scroll absolute inset-0 overflow-y-auto overscroll-contain pr-3 outline-none"
    >
      {/*Centred with auto margins, not justify-center: an overflowing page must still start at its top*/}
      <div className="flex min-h-full flex-col py-3">
        <div className={center ? "my-auto" : undefined}>{children}</div>
      </div>
    </motion.div>
  );
}

function App() {
  const reduced = useReducedMotion();
  const paged = useMediaQuery(PAGED_QUERY);
  const scroll = useScrollHud(SECTION_IDS, !paged);
  const pager = usePager(SECTION_IDS, paged);
  const explorer = useProjectExplorer(projects, categories);

  const active = paged ? SECTION_IDS[pager.index] : scroll.active;
  const progress = paged ? pager.index / (SECTION_IDS.length - 1) : scroll.progress;

  const sections = {
    hero: <Hero />,
    about: <About />,
    experience: <Experience />,
    projects: <Projects explorer={explorer} />,
    contact: (
      <>
        <Contact />
        <SiteFooter className="mt-12" />
      </>
    ),
  };

  // Paged: the columns fill the frame. Scrolling: they stick under the top bar.
  const sideColumns = (
    <>
      <div
        className={`hidden items-center justify-center lg:flex ${
          paged ? "self-stretch" : "sticky top-[160px] h-[calc(100vh-312px)] min-h-[280px] self-start"
        }`}
      >
        <Optic size={260} pulseKey={active} />
      </div>
      <aside
        aria-label="HUD readouts"
        className={`hidden self-start pt-2 lg:block ${paged ? "" : "sticky top-[160px]"}`}
      >
        <Readouts active={active} selectedProject={explorer.selected} categoryLabel={explorer.labelOf} />
      </aside>
    </>
  );

  return (
    <div className="relative min-h-screen">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-ff-teal focus:px-4 focus:py-2 focus:font-hud focus:text-sm focus:text-[#061012]"
      >
        Skip to content
      </a>

      <HudBackdrop />
      <TopBar active={active} progress={progress} />

      {paged ? (
        <div className={`relative z-10 grid h-screen px-14 pb-[152px] pt-[160px] ${COLUMNS}`}>
          <main id="main" className="relative min-h-0 min-w-0">
            <AnimatePresence initial={false} custom={{ dir: pager.dir, reduced }}>
              <Page
                key={active}
                dir={pager.dir}
                focus={pager.focus}
                center={!TOP_ALIGNED.has(active)}
              >
                {sections[active]}
              </Page>
            </AnimatePresence>
          </main>
          {sideColumns}
        </div>
      ) : (
        <div className={`relative z-10 overflow-x-clip px-5 pb-48 pt-28 sm:px-8 lg:grid lg:px-14 lg:pb-44 lg:pt-[160px] ${COLUMNS}`}>
          <div className="min-w-0">
            <main id="main" className="flex flex-col gap-20 lg:gap-24">
              <div className="flex flex-col gap-11">
                {sections.hero}
                {sections.about}
              </div>
              {sections.experience}
              {sections.projects}
              <Contact />
            </main>
            <SiteFooter className="mt-16" />
          </div>
          {sideColumns}
        </div>
      )}

      <BottomBar active={active} />
    </div>
  );
}

export default App;
