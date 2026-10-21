import { Mail, Linkedin, Phone } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import fishy from "../assets/fishy-business.png";
import campaign from "../assets/CM-dashboard.png";
import arknights from "../assets/Arknights-RIIC-planner.png";

// The page's sections, in order. `code` and `hdg` feed the compass nav at the top of the HUD.
export const SECTIONS = [
  { id: "hero", code: "◆", label: "Home", hdg: "000" },
  { id: "about", code: "α", label: "About", hdg: "072" },
  { id: "experience", code: "β", label: "Experience", hdg: "144" },
  { id: "projects", code: "γ", label: "Projects", hdg: "216" },
  { id: "contact", code: "Δ", label: "Contact", hdg: "288" },
];

export const experience = [
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

// Filter options in the projects search bar; each project's `category` is one of these keys
export const categories = [
  { key: "fullstack", label: "Fullstack" },
  { key: "gamedev", label: "Gamedev" },
  { key: "embedded", label: "Embedded" },
];

export const projects = [
  {
    title: "DnD Campaign Manager",
    category: "fullstack",
    github: "https://github.com/amcli/campaign-manager",
    description: "A Java/Spring Boot website for managing tabletop RPG campaigns",
    stack: ["Typescript", "React", "Java", "Spring Boot", "MySQL"],
    tech: "A polymorphic schema and REST API supporting multiple tabletop RPG rule systems, built with Spring Boot, MySQL, and React/TS.",
    media: campaign,
  },
  {
    title: "Arknights Base Planner",
    category: "fullstack",
    github: "https://github.com/amcli/arknights-riic-planner",
    description: "A Rust/React optimiser for your Arknights RIIC",
    stack: ["TypeScript", "React", "Rust", "Axum", "Tokio", "Vite"],
    tech: "A skill-description parser, a morale-aware production simulator and a simulated-annealing solver, served through an Axum REST API with a background job queue and a React/TS frontend.",
    media: arknights,
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
    title: "Isometric TD",
    category: "gamedev",
    github: "https://github.com/amcli/isometric-td",
    description: "A tower defense game in 2D isometric.",
    stack: ["C#", "Unity"],
    tech: "In progress! Currently under maintenance.",
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

export const contactLinks = [
  { href: "mailto:amcli@uwaterloo.ca", label: "Email", Icon: Mail, external: true },
  { href: "https://www.linkedin.com/in/amcli/", label: "LinkedIn", Icon: Linkedin, external: true },
  { href: "https://github.com/amcli", label: "GitHub", Icon: FaGithub, external: true },
  { href: "tel:7787065362", label: "Phone", Icon: Phone, external: false },
];

// Two-digit readout, e.g. 6 -> "06"
export const pad2 = (n) => String(n).padStart(2, "0");
