export interface ExperienceSkill {
  name: string;
  iconSrc?: string;
}

export interface WorkExperience {
  id: number;
  title: string;
  organization: string;
  location?: string;
  period: string;
  description: string[];
  skills?: ExperienceSkill[];
}

export const workExperiences: WorkExperience[] = [
  {
    id: 1,
    title: "Full Stack Intern",
    organization: "Avotech Systems",
    location: "Pune, Maharashtra (Onsite)",
    period: "Jun 2026 – Present",
    description: [
      "Designing and implementing responsive web applications for client projects, ensuring seamless performance across desktop and mobile platforms.",
"Working with cross-functional teams to translate client requirements into scalable and user-friendly software solutions.",
"Utilizing modern development tools and optimization techniques to improve application performance, reliability, and long-term maintainability.",
    ],
    skills: [
      { name: "Next.js", iconSrc: "/svg/nextjs-svg.svg" },
      { name: "React", iconSrc: "/svg/react-svg.svg" },
      { name: "javascript", iconSrc: "/svg/javascript-svg.svg" },
      { name: "PostgreSQL", iconSrc: "/svg/postgresql-svg.svg" },
      { name: "Tailwind CSS", iconSrc: "/svg/tailwind-svg.svg" },
      { name: "Framer Motion", iconSrc: "/svg/framermotion-svg.svg" },
    ],
  },
  {
    id: 2,
    title: "Founding Developer",
    organization: "Medicaps Physics and Astronomy Club",
    location: "Indore, M.P. (Onsite)",
    period: "Nov 2025 – Feb 2026",
    description: [
      "Built a full-stack club management platform using Next.js, TypeScript, PostgreSQL, Tailwind CSS, and Framer Motion.",
      "Streamlined content management and member engagement across all club operations.",
    ],
    skills: [
      { name: "Next.js", iconSrc: "/svg/nextjs-svg.svg" },
      { name: "TypeScript", iconSrc: "/svg/typescript-svg.svg" },
      { name: "PostgreSQL", iconSrc: "/svg/postgresql-svg.svg" },
      { name: "Prisma", iconSrc: "/svg/prisma-svg.svg" },
      { name: "Tailwind CSS", iconSrc: "/svg/tailwind-svg.svg" },
      { name: "Framer Motion", iconSrc: "/svg/framermotion-svg.svg" },
    ],
  },
  {
    id: 3,
    title: "Treasurer",
    organization: "Medicaps Physics and Astronomy Club",
    location: "Indore, M.P. (Onsite)",
    period: "Sep 2025 – Nov 2025",
    description: [
      "Managed annual club budget, expense tracking, and financial planning.",
      "Ensured transparent and efficient fund allocation across club activities.",
    ],
    skills: [
      { name: "Budget Management" },
      { name: "Financial Planning" },
      { name: "Expense Tracking" },
    ],
  },
  {
    id: 4,
    title: "Tech Support",
    organization: "IndoriX",
    location: "Indore, M.P. (Onsite)",
    period: "Nov 2024 – Apr 2025",
    description: [
      "Provided technical support for website development and maintenance, ensuring smooth functionality and performance.",
      "Assisted in data management, organization, and optimization to improve backend efficiency.",
    ],
    skills: [
      { name: "Web Development" },
      { name: "Data Management" },
      { name: "Performance Optimization" },
    ],
  },
  {
    id: 5,
    title: "Media Head",
    organization: "Medicaps Physics and Astronomy Club",
    location: "Indore, M.P. (Onsite)",
    period: "Aug 2024 – Aug 2025",
    description: [
      "Led content production for club events, increasing online visibility and engagement.",
      "Managed social media platforms, improving reach through consistent content planning.",
    ],
    skills: [
      { name: "Content Production" },
      { name: "Social Media" },
      { name: "Event Promotion" },
    ],
  },
  {
    id: 6,
    title: "Junior Manager — iGTa/e Department",
    organization: "AIESEC",
    location: "Indore, M.P. (Onsite)",
    period: "Aug 2024 – Jan 2025",
    description: [
      "Managed international coordination meetings to facilitate global exchange and internship opportunities.",
      "Supported candidate screening, documentation, and onboarding while contributing to exchange targets through structured follow-ups and CRM tracking.",
      "Contributed to achieving exchange targets through structured follow-ups and CRM tracking.",
    ],
    skills: [
      { name: "Coordination" },
      { name: "CRM" },
      { name: "Documentation" },
      { name: "Onboarding" },
    ],
  },
];

export const INITIAL_VISIBLE_EXPERIENCES = 3;
