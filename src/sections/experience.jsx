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

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-gradient-to-b from-ff-bg via-ff-bg-2 to-ff-bg text-ff-text py-16 px-6 scroll-mt-20"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 0,
          background:
            'radial-gradient(45% 35% at 10% 15%, rgba(95,232,209,0.10) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10">
        <CardGrid label="MODULE β" heading="Experience" items={experience} boldDescription />
      </div>
    </section>
  );
}
