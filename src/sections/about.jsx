import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="bg-[#1e1e1e] text-gray-300 py-20 px-6 flex justify-center"
    >
      <motion.div 
        initial={{ opacity: 0, y: 50 }}

        whileInView={{opacity: 1, y: 0 }}

        transition={{ duration: 0.5, ease: "easeOut" }}

        className="bg-[#2a2a2a] max-w-4xl w-full rounded-2xl p-8 shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl flex flex-col md:flex-row items-center gap-8"
    >
        {/* Portrait Image Placeholder */}
        <div className="w-40 h-40 rounded-full bg-gray-700 flex-shrink-0"></div>

        {/* Text Content */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-white">About Me</h2>
          <p className="text-base md:text-lg leading-relaxed">
            I’m a software developer passionate about building innovative user experiences, especially in the realm of AR/VR and games.
            I also have a strong interest in AI/ML and Fullstack Development.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            I'm currently in my 1B term at the University of Waterloo for Computer Engineering, but I'm originally from Vancouver, BC.
          </p>
        </div>
      </motion.div>
    </section>
  );
}