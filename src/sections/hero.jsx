import { ArrowRight } from "lucide-react";
import Optic from "../components/hud/optic";

export default function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-h" className="relative scroll-mt-40">
      {/* On phones the optic peeks in from the right edge behind the text */}
      <Optic
        size={240}
        className="pointer-events-none absolute -right-[118px] top-24 -z-10 opacity-75 sm:-right-10 lg:hidden"
      />

      <div className="flex flex-col gap-4 lg:gap-[18px]">
        <p className="flex items-center gap-2.5 font-hud text-[10px] tracking-[0.28em] text-ff-teal lg:text-[11px]">
          <span aria-hidden="true" className="hud-blink size-[7px] bg-ff-teal shadow-[0_0_8px_#5fe8d1]" />
          TARGET ACQUIRED
        </p>
        <h1
          id="hero-h"
          className="font-display text-[46px] font-bold leading-[1.02] tracking-[-0.01em] sm:text-6xl lg:text-[68px]"
        >
          Hello, I'm <br className="sm:hidden" />
          <span className="text-ff-teal [text-shadow:0_0_26px_rgba(95,232,209,0.45)]">Andrew</span>
        </h1>
        <p className="max-w-[270px] text-[17px] font-medium leading-snug text-[#cad6d2] sm:max-w-none lg:text-[23px]">
          Software, Embedded, Fullstack, and Game Developer
        </p>
        <p className="max-w-[280px] text-sm leading-normal text-ff-muted sm:max-w-[520px] lg:text-[17px]">
          Current third-year Computer Engineering student at the University of Waterloo
        </p>
        <div className="mt-2 flex flex-wrap gap-2.5 lg:gap-3">
          <a
            href="#projects"
            className="hud-cut-s inline-flex min-h-[46px] items-center gap-2.5 bg-ff-teal px-4 font-display text-[13px] font-bold tracking-[0.12em] text-[#061012] transition-[filter] duration-200 hover:brightness-110 lg:px-[22px] lg:text-sm lg:tracking-[0.14em]"
          >
            VIEW PROJECTS
            <ArrowRight className="size-4" strokeWidth={2.4} aria-hidden="true" />
          </a>
          <a
            href="#contact"
            className="hud-cut-s inline-flex min-h-[46px] items-center bg-ff-teal/10 px-4 font-display text-[13px] font-bold tracking-[0.12em] text-ff-teal shadow-[inset_0_0_0_1px_rgba(95,232,209,0.55)] transition-colors duration-200 hover:bg-ff-teal/20 lg:px-[22px] lg:text-sm lg:tracking-[0.14em]"
          >
            CONTACT ME
          </a>
        </div>
      </div>
    </section>
  );
}
