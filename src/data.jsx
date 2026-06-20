// ============================================================
// PORTFOLIO DATA — Single source of truth for all content
// ============================================================

export const siteConfig = {
  brand: "Vinay.dev",
  title: "Vinay — Digital Designer & Developer",
  email: "hello@vinay.dev",
  linkedin: "#",
  github: "#",
  dribbble: "#",
  readcv: "#",
  copyright: "© 2024 Vinay. Handcrafted with care.",
};

export const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" },
];

// Hero section
export const hero = {
  name: "vinay",
  portraitImage:"/decap.gif",
  portraitAlt: "Vinay — Digital Designer & Developer",
  marqueeItems: [
    "Available for work",
    "React Developer",
    "UI/UX Design",
    "Motion Design",
    "Full Stack",
    "Open to Collab",
    "AWS",
    "FireBase",
    "AI IDE's",
    "Backend Developer"
  ],
};

// Services (what I do)
export const services = [
  {
    id: "design",
    number: "01",
    title: "UI/UX Design",
    description:
      "Crafting interfaces that are bold, and honest. From wireframes to high-fidelity systems — I design with intent.",
    tags: ["Figma", "Stitch", "Prototyping", "User Research"],
    accent: "bg-[#FFEB3B]", // Neon Yellow
  },
  {
    id: "frontend",
    number: "02",
    title: "Frontend Dev",
    description:
      "Turning designs into fast, accessible, and animated web experiences.",
    tags: ["React", "GSAP", "Tailwind"],
    accent: "bg-[#00E5FF]", // Electric Cyan
  },
  {
    id: "motion",
    number: "03",
    title: "Motion & Animation",
    description:
      "Micro-interactions, scroll-driven storytelling, and cinematic page transitions.",
    tags: ["GSAP", "Framer Motion", "CSS Animation", "ScrollTrigger"],
    accent: "bg-[#FF6B6B]", // Coral Red
  },
  {
    id: "backend",
    number: "04",
    title: "Backend Dev",
    description:
      "Implementing modular, scalable, secure backend systems.",
    tags: ["Node.js", "Express.js", "npm", "MongoDB", "Supabase", "Firebase"],
    accent: "bg-[#7C4DFF]", // Brutalist Purple
  },
];

// Timeline / journey items
export const timeline = [
  {
    id: 1,
    period: "2016 – 2021",
    role: "Student",
    dotColor: "bg-[#e5e2e1]",
    title: "Primary Education",
    body: "Studied at ZPHS Kalla, Andhra Pradesh. Built a curiosity for how things work — the foundation for everything that followed.",
  },
  {
    id: 2,
    period: "2021 – 2023",
    role: "Secondary Edu",
    dotColor: "bg-[#bc87fe]",
    title: "Secondary Education",
    body: "Completed secondary education at an IIT Academy. Scored 82 percentile in JEE Mains and a 2000 category rank in JEE Advanced. Started coding as a side quest.",
  },
  {
    id: 3,
    period: "2023 – Present",
    role: "Graduation",
    dotColor: "bg-[#c8f232]",
    title: "Graduation",
    body: "Currently studying Computer Science at JNTUGV-CEV. Building optimised, scalable products and obsessing over clean UI/UX. This is where it all comes together.",
  },
];

export const story = {
  title: "THE STORY",
  body: "Digital architect pushing pixels and code to their absolute limits. I don't just build interfaces; I engineer experiences that demand attention and refuse to be ignored. My journey is defined by raw creativity and structured execution.",
};


// Skills
import {
  Gauge,
  Orbit,
  Database,
  Terminal,
  Rocket,
  Bot,
} from "lucide-react";

import {
  FaPaintBrush,
  FaReact,
  FaNodeJs,
  FaFigma,
  FaGitAlt,
} from "react-icons/fa";

import {
  SiTailwindcss,
  SiFirebase,
  SiSupabase,
} from "react-icons/si";

import { PiSparkleFill } from "react-icons/pi";
import { TbVectorBezier, TbApi } from "react-icons/tb";
import { VscVscode } from "react-icons/vsc";

export const skills = [
  {
    id: "design",
    title: "Design",
    cardBg: "bg-[#eedbff]",
    items: [
      { icon: FaPaintBrush, label: "UI/UX Design" },
      { icon: PiSparkleFill, label: "Motion Design" },
      { icon: TbVectorBezier, label: "Stitch" },
    ],
  },

  {
    id: "frontend",
    title: "Frontend",
    cardBg: "bg-[#e5e2e1]",
    items: [
      { icon: FaReact, label: "React.js" },
      { icon: SiTailwindcss, label: "Tailwind CSS" },
      { icon: Gauge, label: "Performance Optimization" },
      { icon: Orbit, label: "GSAP" },
    ],
  },

  {
    id: "backend",
    title: "Backend",
    cardBg: "bg-[#FFFB2B]",
    items: [
      { icon: FaNodeJs, label: "Node.js" },
      { icon: TbApi, label: "Express.js" },
      { icon: Database, label: "MongoDB" },
      { icon: SiFirebase, label: "Firebase" },
      { icon: SiSupabase, label: "Supabase" },
      { icon: TbApi, label: "REST API" },
    ],
  },

  {
    id: "tools",
    title: "Tools",
    cardBg: "bg-[#ffdad6]",
    items: [
      { icon: FaFigma, label: "Figma" },
      { icon: FaGitAlt, label: "Git" },
      { icon: Terminal, label: "Webpack / Vite / Linux" },
      { icon: VscVscode, label: "VS Code" },
      { icon: Rocket, label: "AntiGravity" },
      { icon: Bot, label: "OpenCode / Claude Code / OpenDesign" },
    ],
  },
];

// About section cards
export const aboutCards = {
  designPhilosophy: {
    title: "About this Design Philosophy",
    body: "Brutalism isn't about being ugly; it's about being raw, honest, and unapologetic. Form follows function, but function doesn't have to be boring.",
  },
  coreStack: {
    title: "Core Stack",
    items: ["UI/UX Design", "Frontend Dev", "Motion Design@GSAP","Backend Dev","Prompting","JS","System Design","Cloud Computing","DevOps@learning"],
  },
};

// Projects
export const projects = [
  {
    id: "alpha",
    title: "Project Crescence",
    category: "UI/UX Design , Frontend ,Backend",
    description:
      "A comprehensive design system built for a next-generation fintech platform. Focused on accessibility, scalability, and a cohesive visual language across multiple digital touchpoints.",
    techStack: ["React.js", "Tailwind", "Framer Motion","GSAP","Express.js","MongoDB"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBXbTS2tZnHyzRgkf0EnM65gst5ARpaM1HZnuzoNSZUuCY4UzqtbXCfgjizKnpL6wqxOrw1hrsPtcbPDxQ_wg5mUeEsCAkK68rpbYWC6c4RVmDI0qSIMDx8ehMxQFM-gMiP3TW4TM_BGLmBM_vpi5YiNw7ibaJ5hmeOuk6jrK_JqU79VpwC2zDY2oFxnt7Q29yuAMT9sMknOUqfqEJ8Sm9ld3CKS-tKE0aMbuycb_NoRboseWs4kT2vNEjn7SJISHqcWGz8p8QITtQ",
    imageAlt: "Project Alpha",
    stackCardBg: "bg-[#c8f232]",
    link: "https://www.cresence.in/",
  },
  {
    id: "digital-frontier",
    title: "Faculty Info System",
    category: "Backend Dev",
    description:
      "Redefining the visual identity for a leading tech consultancy. A bold, brutalist-inspired brand system that reflects an unapologetic approach to innovation and digital transformation.",
    techStack: ["REST API", "Express.js" , "MongoDB","Self Hosting"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD4dY37D0430YHy8MjkKlUBzvi_uzPJ5GrSSy0HMx7GJaarnSTdINNuqwf8kor7YYgk9Fj8xqVqajs9Bs1KsRvN4eRTigKQVSOyPX_3qjQSjHDrWSEd3gNaPKuTo1rwHG1jTpWw8EUEI5snbpJcgm_SUpfXL6ryvI4H77hwekT1il0Wpn5p8EfompBxzCDzj8_Et9EQSn7mt95AvV46F62LMczMIPUeKi9LZs4qeeQxc5VtLT3tBm32Zuk2eoN2KLiu5rR0VMkegbc",
    imageAlt: "Digital Frontier",
    stackCardBg: "bg-[#fdf8f8]",
    link: "https://facultyinfosys.jntugvcev.in/",
  },
  {
    id: "nexgen",
    title: "PREU",
    category: "Full Stack ,AI Integration",
    description:
      "A high-performance mobile application for real-time data visualization. Complex interactive charts and a seamless UX optimised for low-latency environments.",
    techStack: ["React.js", "GSAp", "Firebase","Express.js","MongoDB","Local LLM"],
    imageUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDSOH6RtmImXWcqrH1RW-QkZXGl2_Cs92LNhlK5_oQc8t6pEVjtxr-QLKRYubDKEIGeqsH676A_xPhjV6mX2SVm2YUUP5Yuun5DSkgC9OA12a1Q7wVIqsuG4VxkKm3EVg46MsyqaKZ3nfNdi60B4zBHIMRnl4q_Vq_BGphvDGHH0rkpTOLWVZsNmo6WWfvmufo9Kq1kOUP-p9Fj31jnb_fE5p_7vtvxwNZJl8kbZUdu9baDH38n1DqxLDOyGiwv5Ur8qP8B-VBwYxg",
    imageAlt: "NexGen App",
    stackCardBg: "bg-[#c8f232]",
    link: "#",
  },
];

// Footer links
export const footerLinks = [
  { label: "LinkedIn", href: "#", icon: "link" },
  { label: "GitHub", href: "#", icon: "code" },
  { label: "Dribbble", href: "#", icon: "palette" },
  { label: "Read.cv", href: "#", icon: "description" },
];
