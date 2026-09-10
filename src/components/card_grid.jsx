import { motion } from "framer-motion";

// Cards alternate between Firefly (teal) and SAM (ember) accents.
const accents = [
  {
    ring: "ring-ff-teal",
    shadow: "group-hover:shadow-[0_0_32px_rgba(95,232,209,0.25)]",
    title: "hover:from-ff-teal hover:to-ff-glow",
  },
  {
    ring: "ring-ff-ember",
    shadow: "group-hover:shadow-[0_0_32px_rgba(255,122,60,0.25)]",
    title: "hover:from-ff-ember hover:to-ff-glow",
  },
];

export default function CardGrid({ label, heading, items, boldDescription = false }) {
  return (
    <div className="max-w-7xl mx-auto text-center">
      {/*This framer motion sets up the fading and sliding of the heading */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="mb-10"
      >
        <p className="ff-label mb-3">{label}</p>
        <h2 className="text-4xl font-bold text-ff-text">{heading}</h2>
      </motion.div>

      {/*This framer motion uses staggerChildren to delay the appearance of each card*/}
      <motion.div
        initial="hidden"
        whileInView="visible"
        transition={{ staggerChildren: 0.1 }}
        viewport={{ amount: 0.1 }}
        variants={{ hidden: {}, visible: {} }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {items.map((project, idx) => {
          const accent = accents[idx % accents.length];
          const titleClass = `inline-block transition duration-0 text-ff-text hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r ${accent.title}`;

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
              <div /*Wrapper class */ className={`relative transition-all duration-300 group-hover:-translate-y-1 rounded-2xl ${accent.shadow}`}>

                <div //Ignition ring on hover
                  className={`absolute -inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 ring-2 group-hover:animate-pulse ${accent.ring}`}
                ></div>

                <div /*Card content*/ className="relative z-10 bg-ff-panel border border-ff-line p-6 rounded-2xl shadow-2xl">
                  <h3 className="text-2xl font-semibold mb-2">
                    {project.link ? (
                      <a href={project.link} target="_blank" rel="noopener noreferrer" className={titleClass}>
                        {project.title}
                      </a>
                    ) : (
                      <span className={titleClass}>{project.title}</span>
                    )}
                  </h3>
                  <p className={`text-ff-text mb-2 ${boldDescription ? "font-bold" : ""}`}>{project.description}</p>

                  {project.tech && (
                    <p className="text-ff-muted text-sm whitespace-pre-line">{project.tech}</p>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
