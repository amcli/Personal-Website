import { motion } from "framer-motion";


export default function Projects() {
  return (
    <section
      id="projects"
      className="bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white py-16 px-6"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/*This framer motion sets up the fading and sliding of the heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 50 }} 

          whileInView={{ opacity: 1, y: 0 }} 

          transition={{ duration: 0.5, ease: "easeOut" }} 
          
          className="text-4xl font-bold mb-10 text-white"
        >
            Projects
        </motion.h2>

        {/*This framer motion uses staggerChildren to delay the appearance of each card*/}
        <motion.div 
          initial="hidden"

          whileInView="visible"

          transition={{ staggerChildren: 0.1 }}

          viewport={{ amount: 0.1 }}

          variants={{
            hidden: {},
            visible: {}
          }}
        
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >

          {/*Each card is generated with .map() for better scalability*/}
              {[
            {
              title: "Top-Down Unity Game",
              link: "https://github.com/amcli/Top-Down-2D-Unity",
              description: "A top-down Unity game where the player escapes mazes and defeats enemies.",
              tech: "Built core mechanics in C# using OOP: input handling, collision detection, enemy AI, and UI systems like health/stamina bars and menus.",
            },
            {
              title: "Portfolio Website",
              link: "https://github.com/amcli/Personal-Website",
              description: "This site! Built with React, Vite, and styled using Tailwind CSS for fast and responsive design.",
              tech: null,
            },
            {
              title: "Empty Project",
              description: "Awaiting new projects!",
              tech: null,
            },
            {
              title: "Empty Project",
              description: "Project where??",
              tech: null,
            },
            
          ].map((project, idx) => (

            //this motion.div allows the cards to slide and fade in smoothly with a st agger effect
            <motion.div
              key={idx}
              
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}

              transition={{ duration: 0.5, ease: "easeOut" }}

              className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition transform duration-300"
            >
              <h3 className="text-2xl font-semibold mb-2">
                {project.link ? (
                  <a
                    href={project.link}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="text-white hover:text-blue-400 transition"
                  >
                    {project.title}
                  </a>
                ) : (
                  <span className="text-gray-400">{project.title}</span>
                )}
              </h3>
              <p className="text-gray-400 mb-2">{project.description}</p>

              {project.tech && (
                <p className="text-gray-500 text-sm">{project.tech}</p>
              )}

            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}


{/* Old code prior to adding scrolling and element staggering */}

      {/* Project 1
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

          Project 2
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

          Project 3
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition transform duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">Empty Project</h3>
            <p className="text-gray-500">Awaiting new projects!</p>
          </div>

           Project 4
          <div className="bg-[#1e1e1e] p-6 rounded-2xl shadow-lg hover:-translate-y-1 transition transform duration-300">
            <h3 className="text-2xl font-semibold mb-2 text-gray-400">Empty Project</h3>
            <p className="text-gray-500">Project where??</p>
          </div> */}