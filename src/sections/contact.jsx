import {
  Mail,
  Linkedin,
  Phone,
} from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const links = [
  { href: "mailto:amcli@uwaterloo.ca", label: "Email", Icon: Mail, external: true },
  { href: "https://www.linkedin.com/in/amcli/", label: "LinkedIn", Icon: Linkedin, external: true },
  { href: "tel:7787065362", label: "Phone", Icon: Phone, external: false },
  { href: "https://github.com/amcli", label: "GitHub", Icon: FaGithub, external: true },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-ff-bg text-ff-text py-20 px-6 flex flex-col items-center scroll-mt-20">
      <p className="ff-label mb-3">Δ ORDER</p>
      <h2 className="text-3xl md:text-4xl font-bold text-ff-text mb-8">Contact Me</h2>
      <div className="flex space-x-6">
        {links.map(({ href, label, Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="p-3 rounded-xl border border-ff-line text-ff-text hover:text-ff-teal hover:border-ff-teal/60 hover:shadow-[0_0_20px_rgba(95,232,209,0.25)] transition duration-300"
          >
            <Icon className="w-8 h-8" size={32} />
          </a>
        ))}
      </div>
    </section>
  );
}
