export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f0f0f]/80 backdrop-blur-md z-80 border-b border-gray-800">
      <div className="w-full px-8 py-8 flex justify-between items-center">

        <a
          href="#hero"
          className="text-lg sm:text-xl font-bold text-white tracking-tight hover:text-blue-400 transition"
        >
          Andrew M C Li
        </a>

        <ul className="flex gap-4 sm:gap-6 text-sm sm:text-base text-gray-300 font-medium">
          <li><a href="#about" className="hover:text-blue-400 transition">About</a></li>
          <li><a href="#projects_experience" className="hover:text-blue-400 transition">Projects & Experience</a></li>
          <li><a href="#contact" className="hover:text-blue-400 transition">Contact Me</a></li>
        </ul>
      </div>

      {/* <div className="md:hidden px-6 pb-4">
        <ul className="flex flex-col gap-2 text-gray-400 text-sm">
          <li><a href="#about" className="hover:text-blue-400">About</a></li>
          <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </div> */}
    </nav>
  );
}