import { motion } from "framer-motion";


export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gradient-to-b from-[#0f0f0f] via-[#1a1a1a] to-[#0f0f0f] text-white py-16 px-6"
    >
      <motion.div
        className="absolute w-[150%] h-[150%] rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 opacity-20 blur-3xl"
      
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
      
        style={{ top: '-30%', left: '-30%', zIndex: 0 }}
      />

      
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

              className="relative group bg-[#1e1e1e] z-20 relative p-6 rounded-2xl shadow-2xl hover:-translate-y-1 transition transform duration-300"
            >

              <div
                className={`absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300 z-0
                  ${idx === 0 ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-500'
                  : idx === 1 ? 'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500'
                  : idx === 2 ? 'bg-gradient-to-br from-green-400 via-teal-500 to-cyan-500'
                  : 'bg-gradient-to-br from-yellow-300 via-orange-400 to-pink-400'}
                `}>
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-2">
                  {project.link ? (
                    <a
                      href={project.link}

                      target="_blank"

                      rel="noopener noreferrer"

                      className={`transition duration-300 inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
                        ${
                          idx === 0
                            ? 'hover:from-blue-400 hover:to-purple-400'
                            : idx === 1
                            ? 'hover:from-pink-400 hover:to-yellow-400'
                            : idx === 2
                            ? 'hover:from-green-400 hover:to-cyan-400'
                            : 'hover:from-yellow-300 hover:to-pink-400'
                        }`}>
              
                      {project.title}
                    </a>
                  ) : (
                    <span className={`transition duration-300 inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
                      ${
                        idx === 0
                          ? 'hover:from-blue-400 hover:to-purple-400'
                          : idx === 1
                          ? 'hover:from-pink-400 hover:to-yellow-400'
                          : idx === 2
                          ? 'hover:from-green-400 hover:to-cyan-400'
                          : 'hover:from-yellow-300 hover:to-pink-400'
                      }`}>
                        {project.title}
                    </span>
                  )}
                </h3>
                <p className="text-gray-400 mb-2">{project.description}</p>

                {project.tech && (
                  <p className="text-gray-500 text-sm">{project.tech}</p>
                )}
              </div>
              
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