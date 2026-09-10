import { motion } from "framer-motion";
import profilePhoto from "../assets/resumeimg.JPG";

export default function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-ff-bg via-ff-bg-2 to-ff-bg text-ff-muted py-20 px-6 flex justify-center items-center scroll-mt-20"
    >
      <motion.div 
        initial={{ opacity: 0, y: 2 }}

        whileInView={{opacity: 1, y: 0 }}

        transition={{ duration: 0.5, ease: "easeOut" }}

        className="ff-corners relative group max-w-4xl w-full p-8 rounded-2xl shadow-lg bg-ff-panel border border-ff-line flex flex-col md:flex-row items-center gap-8 hover:scale-105 hover:border-ff-teal/40 transition-all duration-150"
    >

        {/* Ignition glow on hover: teal flame with an ember edge */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-ff-teal via-ff-glow to-ff-ember blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-150 z-0"></div>

        {/* Portrait */}
        <div className="relative z-10 flex-shrink-0">
          <img
            src={profilePhoto}
            alt="Profile photo"
            className="w-40 h-40 rounded-full object-cover flex-shrink-0 ring-2 ring-ff-teal/60 ring-offset-4 ring-offset-ff-panel group-hover:ring-ff-teal group-hover:shadow-[0_0_28px_rgba(95,232,209,0.35)] transition"
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex-1 space-y-4 text-center md:text-left text-ff-muted">
          <p className="ff-label">MODULE α</p>
          <h2 className="text-3xl md:text-4xl font-bold text-ff-text hover:text-ff-teal transition">About Me</h2>
          <p className="text-base md:text-lg leading-relaxed hover:text-ff-teal transition">
            I’m a software developer passionate about building innovative user experiences, especially in the realm of AR/VR and games.
            I also have a strong interest in AI/ML, Embedded, and Fullstack Development.
          </p>
          <p className="text-base md:text-lg leading-relaxed hover:text-ff-teal transition">
            I'm currently in my 2A term at the University of Waterloo for Computer Engineering, but I'm originally from Vancouver, BC.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
