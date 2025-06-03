export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white py-16 px-6"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-10 text-blue-400">Projects</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Project 1 */}
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition transform duration-300">
            <h3 className="text-2xl font-semibold mb-2">
              <a href="https://github.com/amcli/Top-Down-2D-Unity" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition">
                Top-Down Unity Game
              </a>
            </h3>
            <p className="text-gray-400 mb-2">
              A top-down Unity game where the player escapes mazes and defeats enemies.
            </p>
            <p className="text-gray-500 text-sm">
              Built core mechanics in C# using OOP: input handling, collision detection, enemy AI, and UI systems like health/stamina bars and menus.
            </p>
          </div>

          {/* Project 2 */}
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition transform duration-300">
            <h3 className="text-2xl font-semibold mb-2">
              <a href="https://github.com/amcli/Personal-Website" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition">
                Portfolio Website
              </a>
            </h3>
            <p className="text-gray-400 mb-2">
              This site! Built with React, Vite, and styled using Tailwind CSS for fast and responsive design.
            </p>
          </div>

          {/* Project 3 */}
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition transform duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">Empty Project</h3>
            <p className="text-gray-500">Awaiting new projects!</p>
          </div>

          {/* Project 4 */}
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition transform duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">Empty Project</h3>
            <p className="text-gray-500">Project where??</p>
          </div>
        </div>
      </div>
    </section>
  );
}