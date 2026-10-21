import UltMark from "../ult_mark";
import CompassNav from "./compass_nav";
import SyncGauge from "./sync_gauge";

export default function TopBar({ active, progress }) {
  return (
    <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-hud-bg from-75% to-transparent">
      <div className="flex items-center gap-6 px-5 pb-4 pt-4 sm:px-8 lg:px-14 lg:pb-6 lg:pt-7">
        <div className="min-w-0 flex-1">
          <a href="#hero" className="group inline-flex items-center gap-3 text-ff-text">
            <UltMark className="h-8 w-8 shrink-0 drop-shadow-[0_0_8px_rgba(95,232,209,0.55)]" />
            <span className="flex flex-col gap-0.5">
              <span className="font-display text-lg font-bold leading-tight tracking-wide transition-colors group-hover:text-ff-teal">
                Andrew M C Li
              </span>
              <span className="font-hud text-[10px] tracking-[0.2em] text-ff-muted">COMP ENG @ UWATERLOO</span>
            </span>
          </a>
        </div>

        <CompassNav active={active} className="hidden flex-[0_1_640px] lg:flex" />

        <div className="flex flex-none justify-end lg:min-w-0 lg:flex-1">
          <SyncGauge progress={progress} />
        </div>
      </div>
    </header>
  );
}
