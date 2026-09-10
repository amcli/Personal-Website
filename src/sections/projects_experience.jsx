import CardGrid from "../components/card_grid";

const experience = [
  {
    title: "AI Research Consultant",
    description: "WEAccelerate Microsoft Azure & AI Project Experience – Zanis Tech",
    tech: "Researched and evaluated over 10 AI-driven features (personalized health suggestions and medical chatbots) for Zanis Tech's upcoming healthcare platform. Conducted competitive analysis focusing on cost-efficiency, scalability, and user satisfaction to identify optimal solutions. Coordinated meetings with clients and third-party service providers to align technical capabilities with customer needs and pricing expectations.",
  },
  {
    title: "Engineering Intern",
    description: "Microm Group of Companies",
    tech: "Developed a cross-platform firmware upgrade GUI in Python/Tkinter for Mircom's STM32-based fire alarm devices, supporting YMODEM, DFU, and ST-Link programming methods. Assisted in the development of automated QA testing software for the FX-4000N series fire panels, enabling serial commands to simulate physical button presses for remote, repeatable hardware testing. Designed and implemented an MVVM architecture to decouple UI from business logic, improving maintainability and scalability across multiple device configurations.",
  },
];

const projects = [
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
];

export default function Projects_Experience() {
  return (
    <section
      id="projects_experience"
      className="relative overflow-hidden bg-gradient-to-b from-ff-bg via-ff-bg-2 to-ff-bg text-ff-text py-16 px-6 scroll-mt-20"
    >
      {/* Soft ambient glows: teal (Firefly) top-left, ember (SAM) bottom-right */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(45% 35% at 10% 15%, rgba(95,232,209,0.10) 0%, transparent 70%), radial-gradient(40% 30% at 90% 90%, rgba(255,122,60,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 space-y-16">
        <CardGrid label="MODULE β" heading="Experience" items={experience} boldDescription />
        <CardGrid label="MODULE γ" heading="Projects" items={projects} />
      </div>
    </section>
  );
}
