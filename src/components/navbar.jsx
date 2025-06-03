export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0f0f0f]/80 backdrop-blur-md z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo / Name */}
        <a
          href="#hero"
          className="text-lg sm:text-xl font-bold text-white tracking-tight hover:text-blue-400 transition"
        >
          Andrew M C Li
        </a>

        {/* Navigation Links */}
        <ul className="hidden md:flex gap-6 text-gray-300 font-medium">
          <li><a href="#about" className="hover:text-blue-400 transition">About</a></li>
          <li><a href="#projects" className="hover:text-blue-400 transition">Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
        </ul>
      </div>

      {/* Optional mobile nav (simple and subtle) */}
      <div className="md:hidden px-6 pb-4">
        <ul className="flex flex-col gap-2 text-gray-400 text-sm">
          <li><a href="#about" className="hover:text-blue-400">About</a></li>
          <li><a href="#projects" className="hover:text-blue-400">Projects</a></li>
          <li><a href="#contact" className="hover:text-blue-400">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
}