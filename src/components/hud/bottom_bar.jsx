import { ArrowUp } from "lucide-react";
import useComms from "../../hooks/useComms";
import { SECTIONS, contactLinks } from "../../data/content";
import CommsBar from "./comms_bar";

const linkProps = (external) => (external ? { target: "_blank", rel: "noopener noreferrer" } : {});

// Slanted quick-contact buttons, bottom-right of the desktop HUD
function ContactDock() {
  const base =
    "grid h-11 w-[46px] -skew-x-[14deg] place-items-center transition-colors duration-200";
  return (
    <div className="flex gap-2 pr-1.5">
      {contactLinks.map(({ href, label, Icon, external }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          {...linkProps(external)}
          className={`${base} bg-ff-teal/[0.08] text-ff-teal shadow-[inset_0_0_0_1px_rgba(95,232,209,0.5)] hover:bg-ff-teal/20`}
        >
          <Icon className="size-[19px] skew-x-[14deg]" aria-hidden="true" />
        </a>
      ))}
      <a
        href="#hero"
        aria-label="Back to top"
        className={`${base} bg-ff-ember/10 text-[#ff8a52] shadow-[inset_0_0_0_1px_rgba(255,122,60,0.55)] hover:bg-ff-ember/20`}
      >
        <ArrowUp className="size-[19px] skew-x-[14deg]" aria-hidden="true" />
      </a>
    </div>
  );
}

// Phone nav: five slanted tabs docked under the comms bar
function TabNav({ active }) {
  return (
    <nav aria-label="Primary" className="grid grid-cols-5 gap-1">
      {SECTIONS.map((s) => {
        const on = s.id === active;
        const contact = s.id === "contact";
        const tone = on
          ? "bg-ff-teal text-[#061012]"
          : contact
            ? "bg-ff-ember/[0.08] text-[#ff8a52] shadow-[inset_0_0_0_1px_rgba(255,122,60,0.45)]"
            : "bg-ff-teal/[0.06] text-[#cfe9e3] shadow-[inset_0_0_0_1px_rgba(95,232,209,0.3)]";
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            aria-current={on ? "location" : undefined}
            className={`flex min-h-[52px] -skew-x-[10deg] flex-col items-center justify-center gap-[3px] transition-colors duration-200 ${tone}`}
          >
            <span className="skew-x-[10deg] font-display text-[13px] font-bold leading-none">{s.code}</span>
            <span
              className={`skew-x-[10deg] font-hud text-[8px] font-semibold uppercase tracking-[0.12em] ${
                on || contact ? "" : "text-ff-muted"
              }`}
            >
              {s.label}
            </span>
          </a>
        );
      })}
    </nav>
  );
}

export default function BottomBar({ active }) {
  const comms = useComms();

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 bg-gradient-to-t from-hud-bg from-55% to-transparent">
      <div className="hidden items-end justify-between gap-6 px-14 pb-7 pt-6 lg:flex">
        <div className="min-w-0 flex-[0_1_720px]">
          <CommsBar comms={comms} />
        </div>
        <ContactDock />
      </div>

      <div className="flex flex-col gap-2.5 px-3 pb-3 pt-8 lg:hidden">
        <CommsBar comms={comms} compact />
        <TabNav active={active} />
      </div>
    </div>
  );
}
