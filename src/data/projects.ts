/**
 * Central project data for portfolio homepage and project detail pages.
 * Single source of truth — add slug for dynamic routing.
 */

export interface TechIcon {
  name: string;
  iconSrc?: string;
  bgColor?: string;
  textColor?: string;
}

export interface TechStackCategory {
  frontend?: string[];
  backend?: string[];
  database?: string[];
  tools?: string[];
}

export interface ProjectHighlight {
  title: string;
  description?: string;
  metric?: string;
}

export interface ProjectDetail {
  slug: string;
  title: string;
  description: string;
  imageUrl: string;
  bannerUrl?: string;
  tags: string[];
  techIcons: TechIcon[];
  repoUrl?: string;
  liveUrl?: string;
  overview: string;
  keyFeatures: string[];
  futurePlans: string[];
  techStack: TechStackCategory;
  highlights: ProjectHighlight[];
}

export const projects: ProjectDetail[] = [
  {
    slug: "astronomy-club",
    title: "Astronomy Club",
    description:
      "A platform designed to showcase the club highlights, events, team and explorations, featuring a manageable database-driven backend that seamlessly handles content and updates in real time.",
    imageUrl: "/images/projects/science-club.png",
    bannerUrl: "/images/projects/science-club.png",
    tags: ["Club Management", "Event Planning", "Member Management"],
    techIcons: [
      { name: "Next.js", iconSrc: "/svg/nextjs-svg.svg" },
      { name: "TypeScript", iconSrc: "/svg/typescript-svg.svg" },
      { name: "PostgreSQL", iconSrc: "/svg/postgresql-svg.svg" },
      { name: "Prisma", iconSrc: "/svg/prisma-svg.svg" },
      { name: "Tailwind CSS", iconSrc: "/svg/tailwind-svg.svg" },
      { name: "Framer Motion", iconSrc: "/svg/framermotion-svg.svg" },
      { name: "Cloudflare", iconSrc: "/svg/cloudflare-svg.svg" },
      { name: "Vercel", iconSrc: "/svg/vercel-svg.svg" },
    ],
    repoUrl: "https://github.com/Neetil/Science_Club_MU",
    liveUrl: "https://scienceclub.neetil.in",
    overview:
      "A club management platform . It serves all club operations including event registration, content management, and member engagement.",
    keyFeatures: [
      "Comprehensive admin dashboard with 10+ management modules: events, registrations, gallery, team, statistics, and newsletter — enabling full content control without code deployments.",

      "Cloudflare R2 for CDN-backed image storage, Instagram API for social feed integration, and an email newsletter system with Excel export for 100+ subscriber management.",

      "Advanced performance optimizations: client-side caching and lazy loading for images.",

      "Security best practices: bcrypt password hashing, IP-based rate limiting, input validation, and CSRF protection.",
    ],
    futurePlans: [
      "Members would be able to download their certificates",
      "Additional third-party integrations and analytics.",
    ],
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      backend: ["Node.js", "Next.js API Routes"],
      database: ["PostgreSQL", "Prisma ORM"],
      tools: ["Vercel", "Cloudflare R2"],
    },
    highlights: [
      {
        title: "Homepage load time",
        description: "Client-side caching and optimizations",
        metric: "85% faster (2.5s → 0.4s)",
      },
      {
        title: "API response time",
        description: "Optimized Prisma queries and type-safe CRUD",
        metric: "~40% reduction",
      },
      {
        title: "Security",
        description: "bcrypt, rate limiting, validation, CSRF",
        metric: "Zero security incidents in production",
      },
      {
        title: "Scale",
        description: "9 database models, 23 API endpoints, 30+ components",
        metric: "Production-ready",
      },
    ],
  },
  {
    slug: "campus-vibe",
    title: "Campus Vibe",
    description:
      "An anonymous platform for students to meet and connect with others on campus through real-time text and video chat.",
    imageUrl: "/images/projects/campus-vibe.png",
    bannerUrl: "/images/projects/campus-vibe.png",
    tags: ["Next.js", "React", "Tailwind CSS", "Real-time Chat"],
    techIcons: [
      { name: "Next.js", iconSrc: "/svg/nextjs-svg.svg" },
      { name: "React", iconSrc: "/svg/react-svg.svg" },
      { name: "TypeScript", iconSrc: "/svg/typescript-svg.svg" },
      { name: "Node.js", iconSrc: "/svg/nodejs-svg.svg" },
      { name: "Tailwind CSS", iconSrc: "/svg/tailwind-svg.svg" },
      { name: "Socket.IO", iconSrc: "/svg/socketio-svg.svg" },
      { name: "WebRTC", iconSrc: "/svg/webrtc-svg.svg" },
    ],
    liveUrl: "https://campus-vibe-git-main-neetils-projects.vercel.app/",
    repoUrl: "https://github.com/Neetil/campus-vibe",
    overview:
      "A production-ready anonymous real-time chat platform offering dual communication channels — text and video — with zero authentication required. Built with a full P2P WebRTC video system and a Socket.IO real-time layer with a queue-based partner matching algorithm for instant pairing and sub-second message delivery.",
    keyFeatures: [
      "WebRTC video chat with full P2P architecture: ICE candidate exchange and STUN/TURN server integration.",
      "Socket.IO real-time communication with a queue-based partner matching algorithm using Map data structures for O(1) lookup.",
      "Sub-second latency for user pairing and message delivery.",
      "Anonymous usage — no sign-up required.",
    ],
    futurePlans: [
      "Room persistence and chat history (optional).",
      "Moderation tools and reporting.",
      "Mobile-responsive improvements and native feel.",
    ],
    techStack: {
      frontend: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Shadcn/UI"],
      backend: ["Node.js", "Socket.IO"],
      database: [],
      tools: ["WebRTC", "Vercel"],
    },
    highlights: [
      {
        title: "Latency",
        description: "Queue-based matching with O(1) lookup",
        metric: "Sub-second pairing & messaging",
      },
      {
        title: "Architecture",
        description: "Full P2P video, STUN/TURN",
        metric: "Dual channel (text + video)",
      },
      {
        title: "UX",
        description: "Anonymous, zero auth",
        metric: "Production-ready",
      },
    ],
  },
  {
    slug: "color-picker",
    title: "Color Picker",
    description:
      "A browser extension that provides an intuitive color picker tool for developers and designers to easily select, copy, and manage colors from any webpage.",
    imageUrl: "/images/projects/color-picker.png",
    bannerUrl: "/images/projects/color-picker.png",
    tags: ["Browser Extension", "Color Tools", "Developer Tools"],
    techIcons: [
      { name: "JavaScript", iconSrc: "/svg/javascript-svg.svg" },
      { name: "HTML5", iconSrc: "/svg/html-5-svg.svg" },
      { name: "CSS3", iconSrc: "/svg/css-3-svg.svg" },
    ],
    repoUrl: "https://github.com/Neetil/Color-Picker-Extension",
    overview:
      "A browser extension (Chrome Manifest V3) that lets users pick colors from any webpage and copy HEX, RGB, and HSL values with one click, improving design and development workflows. It uses the EyeDropper API for in-page color sampling and the Chrome Storage API for persistent state across sessions.",
    keyFeatures: [
      "EyeDropper API integration for accurate in-page color sampling.",
      "Chrome Storage API for persistent last-color state across sessions.",
      "Client-side color conversion (HEX ↔ RGB ↔ HSL) and Clipboard API for instant copy in multiple formats.",
      "Manifest V3 compliant for modern Chrome extension standards.",
    ],
    futurePlans: [
      "Support for Firefox and other browsers where EyeDropper is available.",
      "Color palettes and history.",
      "Contrast checker and accessibility hints.",
    ],
    techStack: {
      frontend: ["JavaScript", "HTML5", "CSS3"],
      backend: [],
      database: [],
      tools: ["Chrome Extension (Manifest V3)", "EyeDropper API", "Chrome Storage API"],
    },
    highlights: [
      {
        title: "Workflow",
        description: "One-click copy in HEX, RGB, HSL",
        metric: "Instant copy",
      },
      {
        title: "Persistence",
        description: "Last color saved across sessions",
        metric: "Chrome Storage API",
      },
      {
        title: "Standards",
        description: "Manifest V3, EyeDropper API",
        metric: "Modern extension",
      },
    ],
  },
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return projects.map((p) => p.slug);
}
