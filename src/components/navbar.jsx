import UltMark from "./ult_mark";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-ff-bg/80 backdrop-blur-md z-80 border-b border-ff-line">
      <div className="w-full px-8 py-8 flex justify-between items-center gap-4">

        <a
          href="#hero"
          className="group flex items-center gap-3 text-lg sm:text-xl font-bold text-ff-text tracking-tight hover:text-ff-teal transition"
        >
          <UltMark className="w-7 h-7 group-hover:drop-shadow-[0_0_8px_rgba(255,122,60,0.7)] transition" />
          Andrew M C Li
        </a>

        {/*On narrow phones the links wrap onto a second row instead of running off the edge*/}
        <ul className="flex flex-wrap justify-end gap-x-4 gap-y-1 sm:gap-x-6 text-sm sm:text-base text-ff-muted font-medium">
          <li><a href="#about" className="hover:text-ff-teal transition">About</a></li>
          <li><a href="#experience" className="hover:text-ff-teal transition">Experience</a></li>
          <li><a href="#projects" className="hover:text-ff-teal transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-ff-teal transition">Contact Me</a></li>
        </ul>
      </div>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-ff-teal/60 to-ff-ember/40" />
    </nav>
  );
}
