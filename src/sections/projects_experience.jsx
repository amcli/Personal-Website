import { motion } from "framer-motion";


export default function Projects_Experience() {
  return (
    <section
      id="projects_experience"
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

      
      <div className="max-w-7xl mx-auto text-center mb-[64px]">
        {/*This framer motion sets up the fading and sliding of the heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 50 }} 

          whileInView={{ opacity: 1, y: 0 }} 

          transition={{ duration: 0.5, ease: "easeOut" }} 
          
          className="text-4xl font-bold mb-10 text-white"
        >
            Experience 
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
              title: "AI Research Consultant",
              description: "WEAccelerate Microsoft Azure & AI Project Experience – Zanis Tech",
              tech: "Researched and evaluated over 10 AI-driven features (personalized health suggestions and medical chatbots) for Zanis Tech's upcoming healthcare platform. Conducted competitive analysis focusing on cost-efficiency, scalability, and user satisfaction to identify optimal solutions. Coordinated meetings with clients and third-party service providers to align technical capabilities with customer needs and pricing expectations.",
            },
            {
              title: "Engineering Intern",
              description: "Microm Group of Companies",
              tech: "",
            },
            // {
            //   title: "Python RPG",
            //   //removed link because I privated the repository since it contains an API key
            //   description: "A turn-based RPG in Python",
            //   tech: "Built with pygame. Dialogue will be randomized using OpenAI o3 generation with prompts that are parts of my self-written world and story.",
            // },
            // {
            //   title: "Fishy Business!",
            //   link: "https://github.com/amcli/gdc-jam-2025",
            //   description: "A fishing & restaurant management game in Godot",
            //   tech: "Used GDScript to handle animations, collision detection, state switching and event triggers. \n Implemented randomized spawning and statistics; coded entity pathfinding and idle wandering. \n switches scenes between a top-down view and a side view with animated transitions.",
            // },
          ].map((project, idx) => (

            //this motion.div allows the cards to slide and fade in smoothly with a stagger effect
            <motion.div
              key={idx}
              
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}

              transition={{ duration: 0.5, ease: "easeOut" }}

              className="relative group"
            >
            <div /*Wrapper class */className="relative transition-transform duration-300 group-hover:-translate-y-1 rounded-2xl">

                <div //Neon border on hover
                  className={`absolute -inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 ring-4 group-hover:animate-pulse
                    ${
                      idx === 0
                        ? 'ring-blue-500'
                        : idx === 1
                        ? 'ring-pink-500'
                        : idx === 2
                        ? 'ring-green-400'
                        : 'ring-yellow-400'
                    }
                  `}
                ></div>

              <div /*Card content*/ className="relative z-10 bg-[#1e1e1e] p-6 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-semibold mb-2">
                  {project.link ? (
                    <a
                      href={project.link}

                      target="_blank"

                      rel="noopener noreferrer"
                      
                      className={`inline-block transition duration-0 hover:text-transparent text-white hover:bg-clip-text hover:bg-gradient-to-r
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
                    <span className={`text-white transition duration-0 inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
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
                <p className="text-white font-bold mb-2">{project.description}</p>

                {project.tech && (
                  <p className="text-white text-sm">{project.tech}</p>
                )}
              </div>
            </div>
            </motion.div>
          ))}

        </motion.div>
      </div>


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
              title: "Goblinator",
              link: "https://github.com/plane-paper/Goblinator",
              description: "A web app that translates to and from brainrot and English",
              tech: "Trained llama-3.2-3b-i model on a set of over 10k data points of brainrot text. \n Used Python and Flask to create an app that allows users to input text and get translations. \n Built a Python webscraper to scrape brainrot from subreddits. \n Implemented a user-friendly frontend with HTML, CSS, TailwindCSS and JavaScript.",
            },
            {
              title: "Top-Down Unity Game",
              link: "https://github.com/amcli/Top-Down-2D-Unity",
              description: "A top-down Unity game where the player escapes mazes and defeats enemies.",
              tech: "Built core mechanics in C# using OOP: input handling, collision detection, enemy AI, and UI systems like health/stamina bars and menus. \n Designed enemy spawn, pathfinding algorithm and movement mechanics.",
            },
            {
              title: "Python RPG",
              //removed link because I privated the repository since it contains an API key
              description: "A turn-based RPG in Python",
              tech: "Built with pygame. Dialogue will be randomized using OpenAI o3 generation with prompts that are parts of my self-written world and story.",
            },
            {
              title: "Fishy Business!",
              link: "https://github.com/amcli/gdc-jam-2025",
              description: "A fishing & restaurant management game in Godot",
              tech: "Used GDScript to handle animations, collision detection, state switching and event triggers. \n Implemented randomized spawning and statistics; coded entity pathfinding and idle wandering. \n switches scenes between a top-down view and a side view with animated transitions.",
            },
          ].map((project, idx) => (

            //this motion.div allows the cards to slide and fade in smoothly with a stagger effect
            <motion.div
              key={idx}
              
              variants={{
                hidden: { opacity: 0, y: 40 },
                visible: { opacity: 1, y: 0 },
              }}

              transition={{ duration: 0.5, ease: "easeOut" }}

              className="relative group"
            >
            <div /*Wrapper class */className="relative transition-transform duration-300 group-hover:-translate-y-1 rounded-2xl">

                <div //Neon border on hover
                  className={`absolute -inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 ring-4 group-hover:animate-pulse
                    ${
                      idx === 0
                        ? 'ring-blue-500'
                        : idx === 1
                        ? 'ring-pink-500'
                        : idx === 2
                        ? 'ring-green-400'
                        : 'ring-yellow-400'
                    }
                  `}
                ></div>

              <div /*Card content*/ className="relative z-10 bg-[#1e1e1e] p-6 rounded-2xl shadow-2xl">
                <h3 className="text-2xl font-semibold mb-2">
                  {project.link ? (
                    <a
                      href={project.link}

                      target="_blank"

                      rel="noopener noreferrer"

                      className={`inline-block transition duration-0 hover:text-transparent text-white hover:bg-clip-text hover:bg-gradient-to-r
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
                    <span className={`text-white transition duration-0 inline-block hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r
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
                <p className="text-white mb-2">{project.description}</p>

                {project.tech && (
                  <p className="text-white text-sm">{project.tech}</p>
                )}
              </div>
            </div>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
}