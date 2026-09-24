import { motion } from "framer-motion";
import { FaGithub, FaItchIo } from "react-icons/fa";
import UltMark from "./ult_mark";

const rings = ["ring-ff-teal", "ring-ff-ember"];

// Optional per-project links, shown as small buttons under the preview
const PROJECT_LINKS = [
  { key: "github", label: "View on GitHub", Icon: FaGithub },
  { key: "itch", label: "Play on itch.io", Icon: FaItchIo },
];

// teal → glow → ember: the site's warm-cool holo palette (same stops as the
// About-card halo). Interpolating along this gives each chip a distinct color
// while the row as a whole reads as one gradient sweep.
const STACK_STOPS = [
  [95, 232, 209],   // ff-teal   #5fe8d1
  [217, 247, 107],  // ff-glow   #d9f76b
  [255, 122, 60],   // ff-ember  #ff7a3c
];

function stackColor(index, count) {
  const t = count <= 1 ? 0.5 : index / (count - 1);
  const scaled = t * (STACK_STOPS.length - 1);
  const i = Math.min(STACK_STOPS.length - 2, Math.floor(scaled));
  const localT = scaled - i;
  const a = STACK_STOPS[i];
  const b = STACK_STOPS[i + 1];
  return [
    Math.round(a[0] + (b[0] - a[0]) * localT),
    Math.round(a[1] + (b[1] - a[1]) * localT),
    Math.round(a[2] + (b[2] - a[2]) * localT),
  ];
}

function normalizeMedia(media) {
  const raw = Array.isArray(media) ? media : media ? [media] : [];
  return raw
    .map((item) => {
      if (!item) return null;
      if (typeof item === "string") return { src: item, link: null };
      if (item.src) return { src: item.src, link: item.link || null };
      return null;
    })
    .filter(Boolean);
}

function MediaFrame({ item, alt, className, children }) {
  const content = (
    <img
      src={item.src}
      alt={alt}
      loading="lazy"
      className="w-full h-full object-cover"
    />
  );
  if (item.link) {
    return (
      <a
        href={item.link}
        target="_blank"
        rel="noopener noreferrer"
        className={`${className} block transition-colors duration-200 hover:border-ff-text/60`}
      >
        {content}
        {children}
      </a>
    );
  }
  return (
    <div className={className}>
      {content}
      {children}
    </div>
  );
}

function MediaSlot({ media, title }) {
  const items = normalizeMedia(media);

  if (items.length === 0) {
    return (
      <div className="relative aspect-video w-full rounded-md border border-ff-line/70 overflow-hidden bg-gradient-to-br from-ff-bg-2 via-ff-panel to-ff-bg grid place-items-center">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(55% 55% at 50% 50%, rgba(95,232,209,0.20) 0%, transparent 70%)",
          }}
        />
        <UltMark className="relative w-14 h-14 opacity-55" />
      </div>
    );
  }

  if (items.length === 1) {
    return (
      <MediaFrame
        item={items[0]}
        alt={`${title} preview`}
        className="aspect-video w-full rounded-md border border-ff-line/70 overflow-hidden bg-ff-bg-2"
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {items.slice(0, 4).map((item, i) => (
        <MediaFrame
          key={i}
          item={item}
          alt={`${title} preview ${i + 1}`}
          className="aspect-video w-full rounded-md border border-ff-line/70 overflow-hidden bg-ff-bg-2"
        />
      ))}
    </div>
  );
}

// Sized like the stack tags so two buttons fit on one line even in the narrow two-column
// cards on tablets; wrapping would push that card's preview out of line with its neighbour.
function ProjectLinks({ links, project }) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {links.map((link) => (
        <a
          key={link.key}
          href={project[link.key]}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 rounded-md border border-ff-line bg-ff-bg-2/60 px-2 py-1.5 font-mono text-[10px] tracking-wider uppercase text-ff-muted transition duration-300 hover:text-ff-teal hover:border-ff-teal/60 hover:shadow-[0_0_16px_rgba(95,232,209,0.25)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ff-teal/60"
        >
          <link.Icon className="w-3.5 h-3.5" aria-hidden="true" />
          {link.label}
          {/*Cards repeat these labels, so screen readers also hear which project each is for*/}
          <span className="sr-only">: {project.title}</span>
        </a>
      ))}
    </div>
  );
}

export function SectionHeading({ label, heading, children }) {
  return (
    //This framer motion sets up the fading and sliding of the heading
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="mb-10"
    >
      <p className="ff-label mb-3">{label}</p>
      <h2 className="text-4xl font-bold text-ff-text">{heading}</h2>
      {children}
    </motion.div>
  );
}

export function CardList({ items, boldDescription = false, showMedia = false }) {
  return (
    //This framer motion uses staggerChildren to delay the appearance of each card
    <motion.div
      initial="hidden"
      whileInView="visible"
      transition={{ staggerChildren: 0.1 }}
      viewport={{ amount: 0.1 }}
      variants={{ hidden: {}, visible: {} }}
      className="grid grid-cols-1 md:grid-cols-2 md:auto-rows-fr gap-8"
    >
      {items.map((project, idx) => {
        const ring = rings[idx % rings.length];
        const links = PROJECT_LINKS.filter((link) => project[link.key]);

        return (
          //this motion.div allows the cards to slide and fade in smoothly with a stagger effect
          <motion.div
            key={project.title}
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative group"
          >
            <div /*Wrapper class */ className="relative h-full rounded-2xl">

              <div //Accent border on hover
                className={`absolute -inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 ring-1 ${ring}`}
              ></div>

              <div /*Card content*/ className="relative z-10 h-full flex flex-col bg-ff-panel border border-ff-line p-6 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className={`text-ff-text mb-2 ${boldDescription ? "font-bold" : ""}`}>{project.description}</p>

                {project.stack && project.stack.length > 0 && (
                  <ul className="mb-3 flex flex-wrap justify-center gap-1.5">
                    {project.stack.map((tag, i) => {
                      const [r, g, b] = stackColor(i, project.stack.length);
                      return (
                        <li
                          key={tag}
                          style={{
                            color: `rgb(${r},${g},${b})`,
                            borderColor: `rgba(${r},${g},${b},0.45)`,
                            backgroundColor: `rgba(${r},${g},${b},0.08)`,
                            "--tag-glow": `rgba(${r},${g},${b},0.35)`,
                          }}
                          className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border transition duration-200 hover:brightness-125 hover:shadow-[0_0_10px_var(--tag-glow)]"
                        >
                          {tag}
                        </li>
                      );
                    })}
                  </ul>
                )}

                {project.tech && (
                  <p className="text-ff-muted text-sm whitespace-pre-line">{project.tech}</p>
                )}

                {/*Pinned to the bottom so previews and links line up across cards of different text lengths*/}
                {(showMedia || links.length > 0) && (
                  <div className="mt-auto pt-4 space-y-4">
                    {showMedia && <MediaSlot media={project.media} title={project.title} />}
                    {links.length > 0 && <ProjectLinks links={links} project={project} />}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export default function CardGrid({ label, heading, items, boldDescription = false, showMedia = false }) {
  return (
    <div className="max-w-7xl mx-auto text-center">
      <SectionHeading label={label} heading={heading} />
      <CardList items={items} boldDescription={boldDescription} showMedia={showMedia} />
    </div>
  );
}
