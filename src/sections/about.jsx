import { motion } from "framer-motion";

export default function About() {
  return (
    <section
      id="about"
      className="bg-gradient-to-b from-[#1c1d26] via-[#242636] to-[#1c1d26] text-gray-300 py-20 px-6 flex justify-center items-center"
    >
      <motion.div 
        initial={{ opacity: 0, y: 2 }}

        whileInView={{opacity: 1, y: 0 }}

        transition={{ duration: 0.5, ease: "easeOut" }}

        className="relative group max-w-4xl w-full p-8 rounded-2xl shadow-lg bg-[#2a2a2a] flex flex-col md:flex-row items-center gap-8 hover:scale-105 transition-transform duration-150"
    >

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 blur-xl opacity-0 group-hover:opacity-15 transition-opacity duration-150 z-0"></div>

        {/* Portrait Image Placeholder */}
        <div className="relative z-10 flex-shrink-0">
          <div className="w-40 h-40 rounded-full bg-gray-700 flex-shrink-0"></div>
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex-1 space-y-4 text-center md:text-left text-gray-300">
          <h2 className="text-3xl md:text-4xl font-bold text-white hover:text-blue-400 transition">About Me</h2>
          <p className="text-base md:text-lg leading-relaxed hover:text-blue-400 transition">
            I’m a software developer passionate about building innovative user experiences, especially in the realm of AR/VR and games.
            I also have a strong interest in AI/ML and Fullstack Development.
          </p>
          <p className="text-base md:text-lg leading-relaxed hover:text-blue-400 transition">
            I'm currently in my 1B term at the University of Waterloo for Computer Engineering, but I'm originally from Vancouver, BC.
          </p>
        </div>
      </motion.div>
    </section>
  );
}