import SectionHeading from "../components/hud/section_heading";
import { contactLinks } from "../data/content";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-h" className="flex scroll-mt-28 flex-col gap-5 lg:scroll-mt-44">
      <SectionHeading id="contact-h" code="Δ ORDER" title="Contact Me" />
      <ul className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {contactLinks.map(({ href, label, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="hud-cut-s flex min-h-[52px] items-center gap-3 bg-ff-teal/[0.08] px-4 font-display text-sm font-bold uppercase tracking-[0.12em] text-ff-teal shadow-[inset_0_0_0_1px_rgba(95,232,209,0.5)] transition-colors duration-200 hover:bg-ff-teal/20"
            >
              <Icon className="size-5 shrink-0" size={20} aria-hidden="true" />
              {label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
