import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white"
    >
      <motion.div
        className="absolute w-[200%] h-[200%] rounded-full blur-[120px] opacity-30 z-0"
        
        style={{ top: '-50%', left: '-50%', background: 'conic-gradient(from 0deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)' }}

        animate={{
          rotate: [0, 360],
        }}
        
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: 'linear',
        }}
      />

      <motion.div
        className="space-y-6 z-10"

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}
        
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Hello, I'm{' '}
          <span className="text-white hover:text-blue-400 transition drop-shadow-md">
            Andrew M C Li
          </span>
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-400 tracking-wide">
          Software and Fullstack Developer
        </h2>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-white">
          I love to build engaging and practical digital experiences that are fast, intuitive, and impactful.
        </p>
      </motion.div>
    </section>
  );
}