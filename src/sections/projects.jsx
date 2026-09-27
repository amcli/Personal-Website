import ProjectExplorer from "../components/project_explorer";
import fishy from "../assets/fishy-business.png";
import campaign from "../assets/CM-dashboard.png";

// Filter options in the search bar; each project's `category` is one of these keys
const categories = [
  { key: "fullstack", label: "Fullstack" },
  { key: "gamedev", label: "Gamedev" },
  { key: "embedded", label: "Embedded" },
];

const projects = [
  {
    title: "DnD Campaign Manager",
    category: "fullstack",
    github: "https://github.com/amcli/campaign-manager",
    description: "A Java/Spring Boot website for managing tabletop RPG campaigns",
    stack: ["Typescript", "React", "Java", "Spring Boot", "MySQL"],
    tech: "A polymorphic schema and REST API supporting multiple tabletop RPG rule systems, built with Spring Boot, MySQL, and React/TS.",
    media: campaign
  },
  {
    title: "Arknights Base Planner",
    category: "fullstack",
    github: "https://github.com/amcli/arknights-riic-planner",
    description: "A Rust/React optimiser that finds the most productive operator assignments for the Arknights base",
    stack: ["TypeScript", "React", "Rust", "Axum", "Tokio", "Vite"],
    tech: "A skill-description parser, a morale-aware production simulator and a simulated-annealing solver, served through an Axum REST API with a background job queue and a React/TS frontend.",
  },
  {
    title: "Goblinator",
    category: "fullstack",
    github: "https://github.com/plane-paper/Goblinator",
    description: "A web app that translates Gen-Z slang to and from English",
    stack: ["Python", "Llama 3.2", "React", "Vercel"],
    tech: "A fine-tuned Llama 3.2 model paired with a React frontend, deployed via Vercel CI/CD.",
  },
  {
    title: "Parry Arena",
    category: "gamedev",
    github: "https://github.com/amcli/HackAndSlash",
    description: "A C# Unity combat game with dynamic, reactive enemy AI",
    stack: ["C#", "Unity"],
    tech: "A shared combat system for players and AI, with enemies that react dynamically to the player's attacks based on adjustable behavior parameters.",
  },
  {
    title: "Fishy Business!",
    category: "gamedev",
    github: "https://github.com/amcli/gdc-jam-2025",
    itch: "https://gaioc.itch.io/fishy-business",
    description: "A fishing & restaurant management game in Godot",
    stack: ["Godot", "GDScript"],
    tech: "Randomized fish attributes and spawn conditions, with finite-state-machine-driven AI for realistic fish behavior.",
    media: { src: fishy, link: "https://gaioc.itch.io/fishy-business" },
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-gradient-to-b from-ff-bg via-ff-bg-2 to-ff-bg text-ff-text py-16 px-6 scroll-mt-20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(40% 30% at 90% 90%, rgba(255,122,60,0.08) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <ProjectExplorer label="MODULE γ" heading="Projects" categories={categories} projects={projects} />
      </div>
    </section>
  );
}
