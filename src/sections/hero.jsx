import { motion } from 'framer-motion';
import Fireflies from '../components/fireflies';
import FireflyEmblem from '../components/firefly_emblem';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden min-h-screen flex items-center justify-center text-center px-6 bg-gradient-to-b from-ff-bg via-ff-bg-2 to-ff-bg text-ff-text"
    >
      {/* Rising flame glow: teal at the base, a faint ember tint above it */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 45% at 50% 100%, rgba(95,232,209,0.18) 0%, rgba(95,232,209,0.05) 45%, transparent 75%), radial-gradient(40% 30% at 50% 100%, rgba(255,122,60,0.10) 0%, transparent 70%)',
        }}
      />

      {/* Firefly's emblem, a faint teal sketch sitting behind the headline */}
      <FireflyEmblem className="absolute left-1/2 top-1/2 z-0 w-[min(80vw,720px)] -translate-x-1/2 -translate-y-1/2 opacity-60 blur-[0.5px] pointer-events-none" />

      <Fireflies count={18} className="z-0" />

      <motion.div
        className="relative space-y-6 z-10"

        initial={{ opacity: 0, y: 20 }}

        animate={{ opacity: 1, y: 0 }}
        
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
          Hello, I'm{' '}
          <span className="text-ff-text hover:text-transparent hover:bg-clip-text ff-eye-gradient bg-clip-text transition drop-shadow-md">
            Andrew
          </span>
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-ff-muted tracking-wide">
          Software, Embedded, Fullstack, and Game Developer
        </h2>
        <p className="text-base sm:text-lg max-w-xl mx-auto text-ff-text">
          Current 2A Computer Engineering student at the University of Waterloo
        </p>

        <div className="mx-auto mt-2 h-px w-24 bg-gradient-to-r from-transparent via-ff-teal to-transparent" />
      </motion.div>
    </section>
  );
}
