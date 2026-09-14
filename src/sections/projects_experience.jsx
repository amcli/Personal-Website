import CardGrid from "../components/card_grid";

const experience = [
  {
    title: "AI Adoption Software Developer",
    description: "Hauser Industries & Communitech",
    stack: ["Python", "TypeScript", "FastAPI", "LangChain", "React", "Docker", "NetSuite"],
    tech: "Built a full-stack AI-assisted quoting engine (React/TS + FastAPI) that estimates costs with a multi-agent LangChain workflow. Added an admin interface for quote configuration and automated NetSuite data entry end-to-end.",
  },
  {
    title: "Firmware Engineering Intern",
    description: "Mircom Group of Companies",
    stack: ["C", "Python", "Tkinter", "STM32"],
    tech: "Built a cross-platform Python/Tkinter tool for flashing STM32 firmware over serial and USB, and an embedded C bootloader for over-the-air updates. Automated the team's regression and QA test suite.",
  },
];

const projects = [
  {
    title: "Parry Arena",
    link: "https://github.com/amcli/HackAndSlash",
    description: "A C# Unity combat game with dynamic, reactive enemy AI",
    stack: ["C#", "Unity"],
    tech: "A shared combat system for players and AI, with enemies that react dynamically to the player's attacks based on adjustable behavior parameters.",
  },
  {
    title: "DnD Campaign Manager",
    link: "https://github.com/amcli/campaign-manager",
    description: "A Java/Spring Boot website for managing tabletop RPG campaigns",
    stack: ["Java", "Spring Boot", "React", "MySQL"],
    tech: "A polymorphic schema and REST API supporting multiple tabletop RPG rule systems, built with Spring Boot, MySQL, and React/TS.",
  },
  {
    title: "Goblinator",
    link: "https://github.com/plane-paper/Goblinator",
    description: "A web app that translates Gen-Z slang to and from English",
    stack: ["Python", "Llama 3.2", "React", "Vercel"],
    tech: "A fine-tuned Llama 3.2 model paired with a React frontend, deployed via Vercel CI/CD.",
  },
  {
    title: "Fishy Business!",
    link: "https://github.com/amcli/gdc-jam-2025",
    description: "A fishing & restaurant management game in Godot",
    stack: ["Godot", "GDScript"],
    tech: "Randomized fish attributes and spawn conditions, with finite-state-machine-driven AI for realistic fish behavior.",
  },
];

export default function Projects_Experience() {
  return (
    <section
      id="projects_experience"
      className="relative overflow-hidden bg-gradient-to-b from-ff-bg via-ff-bg-2 to-ff-bg text-ff-text py-16 px-6 scroll-mt-20"
    >
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
        <CardGrid label="MODULE γ" heading="Projects" items={projects} showMedia />
      </div>
    </section>
  );
}
