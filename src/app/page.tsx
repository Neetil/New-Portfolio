import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCardFeatured } from '@/components/project-card-featured';
import { Testimonials } from '@/components/testimonials'; 
import { ContactForm } from '@/components/contact-form'; 
import { Code, Download, Layers, Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { CursorStatus } from '@/components/cursor-status';
import { GitHubContributions } from '@/components/github-contributions';


const projects = [
  {
    title: "Astronomy Club",
    description: "A platform designed to showcase the club highlights, events, team and explorations, featuring a manageable database-driven backend that seamlessly handles content and updates in real time.",
    imageUrl: "/images/projects/physics-astronomy-club.jpeg", // Placeholder - you'll provide this later
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
    liveUrl: "https://science-club-mu-tau.vercel.app/", // Add live URL if available
  },
  {
    title: "Campus Vibe",
    description: "An anonymous platform for students to meet and connect with others on campus through real-time text and video chat.",
    imageUrl: "/images/projects/campus-vibe-screenshot.jpeg",
    tags: ["Next.js", "React", "Tailwind CSS", "Real-time Chat"],
    techIcons: [
      { name: "Next.js", icon: "N", bgColor: "#000000", textColor: "#FFFFFF" },
      { name: "TypeScript", icon: "TS", bgColor: "#3178C6", textColor: "#FFFFFF" },
      { name: "React", icon: "⚛", bgColor: "#61DAFB", textColor: "#000000" },
      { name: "Vercel", icon: "▲", bgColor: "#000000", textColor: "#FFFFFF" },
      { name: "MongoDB", icon: "🍃", bgColor: "#47A248", textColor: "#FFFFFF" },
      { name: "Tailwind CSS", icon: "~", bgColor: "#06B6D4", textColor: "#FFFFFF" },
    ],
    liveUrl: "https://campus-vibe-git-main-neetils-projects.vercel.app/",
    repoUrl: "https://github.com/Neetil/campus-vibe",
  },
];


const skills = [
  { name: "JavaScript", icon: Code },
  { name: "Java", icon: Code }, 
  { name: "React", icon: Code },
  { name: "Next.js", icon: Code },
  { name: "Node.js", icon: Code },
  { name: "HTML & CSS", icon: Code },
  { name: "Tailwind CSS", icon: Code },
  { name: "SQL", icon: Code },

  { name: "Figma", icon: Layers },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="container relative pt-12 pb-16 md:pt-16 md:pb-20">
        <div className="flex flex-col space-y-6">
          {/* Heading Section */}
          <div className="space-y-3">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Hi, I'm{' '}
              </span>
              <span className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent">
                Neetil
              </span>
            </h1>
            <p className="text-xl sm:text-xl md:text-2xl font-semibold text-muted-foreground">
              Full Stack Developer
            </p>
          </div>

          {/* Description with Tech Stack */}
          <div className="space-y-4">
            <p className="text-base md:text-lg text-muted-foreground max-w-3xl leading-relaxed">
              I create dynamic web applications using{' '}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium">
                TypeScript
              </span>
              {' '}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium">
                React
              </span>
              {' '}
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium">
                Next.js
              </span>
              
              . Specializing in <strong className="text-foreground font-semibold">user interface</strong> design and development. Creating <strong className="text-foreground font-semibold">scalable solutions</strong>, and exploring <strong className="text-foreground font-semibold">GSAP & Motion Canvas</strong>, fueled by a sharp sense of visual craft.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <Button asChild size="default">
              <Link href="#projects">
                View Projects
              </Link>
            </Button>
            <Button variant="outline" size="default" asChild className="border-2">
              <Link href="/neetil-resume.pdf" target="_blank" download="Neetil Resume.pdf">
                <Download className="mr-2 h-4 w-4" /> 
                Download Resume
              </Link>
            </Button>
          </div>

          {/* Social Media Icons */}
          <div className="flex items-center gap-4 pt-2">
            <Link 
              href="https://x.com/neetilsahu" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="X (Twitter)"
            >
              <Twitter className="h-5 w-5" />
            </Link>
            <Link 
              href="https://www.linkedin.com/in/neetilsahu" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link 
              href="https://github.com/Neetil" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </Link>
            <Link 
              href="https://pin.it/7y4bEjSs0" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Pinterest"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.487.535 6.624 0 12-5.372 12-12C24 5.372 18.627.001 12.001.001z"/>
              </svg>
            </Link>
            <Link 
              href="https://www.instagram.com/neetilsahuu/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link 
              href="mailto:neetilwork@gmail.com" 
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>

          {/* Stats or Quick Info */}
          <div className="flex flex-wrap gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
              <span className="text-muted-foreground">4+ Projects</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-secondary"></div>
              <span className="text-muted-foreground">Full Stack</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-accent"></div>
              <span className="text-muted-foreground">UI/UX Focus</span>
            </div>
          </div>

          {/* Cursor Status Indicator */}
          <div className="pt-4">
            <CursorStatus initials="NS" />
          </div>

          {/* GitHub Contributions */}
          <div className="pt-6 pb-2">
            <GitHubContributions />
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="container relative pt-4">
        <div className="space-y-10">
          {/* Section Header */}
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Projects
            </h2>
          </div>

          {/* Projects Grid - 2x2 on desktop, 1 column on mobile */}
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
            {projects.map((project, index) => (
              <div 
                key={project.title} 
                className={`animate-fade-in-up delay-${index * 100} group`}
              >
                <ProjectCardFeatured project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent -z-10"></div>
        
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              About <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Me</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate developer crafting digital experiences that matter
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12">
            {/* About Text */}
            <Card className="p-8 bg-card/50 backdrop-blur-sm border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-xl">
              <CardContent className="space-y-6 p-0">
                <div className="space-y-4">
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    I'm <span className="text-foreground font-semibold">Neetil</span>, a passionate developer with a strong focus on building clean, efficient, and user-centric digital experiences. My journey into tech began during the first semester of my college when I started experimenting with simple HTML pages, which soon turned into a deep passion for web development.
                  </p>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Since then, I've worked on mastering both frontend and backend technologies, developing robust, scalable applications. Beyond coding, I find energy in challenges — whether it's collaborating with dynamic teams, participating in intense hackathons, or pushing boundaries through new projects.
                  </p>
                </div>
                <Button variant="outline" size="lg" asChild className="group">
                  <Link href="#contact">
                    <Mail className="mr-2 h-4 w-4 group-hover:animate-pulse" /> 
                    Get In Touch
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Skills Grid */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-6">Technologies & Tools</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {skills.map((skill, index) => (
                    <Card 
                      key={skill.name} 
                      className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6 gap-3">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 group-hover:from-accent/30 group-hover:to-secondary/30 transition-all">
                          <skill.icon className="h-6 w-6 text-accent" />
                        </div>
                        <span className="text-sm font-semibold text-center">{skill.name}</span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent -z-10"></div>
        
        <div className="space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              What People <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Say</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Testimonials from colleagues, clients, and collaborators
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container relative">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent -z-10"></div>
        
        <div className="space-y-12">
          {/* Section Header */}
          <div className="text-center space-y-3">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Let's <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Connect</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can bring your ideas to life
            </p>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 items-start">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
                </p>
              </div>
              
              <div className="space-y-4">
                <Card className="group hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-gradient-to-br from-accent/20 to-secondary/20 group-hover:from-accent/30 group-hover:to-secondary/30 transition-all">
                      <Mail className="h-6 w-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">Email</h3>
                      <a 
                        href="mailto:neetilwork@gmail.com" 
                        className="text-muted-foreground hover:text-foreground transition-colors hover:underline"
                      >
                        neetilwork@gmail.com
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-xl">
              <CardHeader className="space-y-2">
                <CardTitle className="text-2xl">Send me a message</CardTitle>
                <CardDescription className="text-base">
                  Fill out the form below and I'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


    </>
  );
}

// Basic animation styles (can be expanded in globals.css or via libraries)
const animationStyles = `
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes fade-in-up {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
   @keyframes slide-in-left {
    from { opacity: 0; transform: translateX(-30px); }
    to { opacity: 1; transform: translateX(0); }
  }
    @keyframes slide-in-right {
    from { opacity: 0; transform: translateX(30px); }
    to { opacity: 1; transform: translateX(0); }
  }

  .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
  .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
  .animate-slide-in-left { animation: slide-in-left 0.8s ease-out forwards; }
  .animate-slide-in-right { animation: slide-in-right 0.8s ease-out forwards; }

  /* Delay classes */
  .delay-100 { animation-delay: 0.1s; opacity: 0; } /* Start hidden for delay */
  .delay-200 { animation-delay: 0.2s; opacity: 0; } /* Start hidden for delay */
  .delay-300 { animation-delay: 0.3s; opacity: 0; } /* Start hidden for delay */
  /* Add more delays as needed */
`;

// Inject styles 
if (typeof window !== 'undefined') {
  let styleSheet = document.getElementById('animation-styles') as HTMLStyleElement | null;
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    styleSheet.id = 'animation-styles';
    styleSheet.innerText = animationStyles;
    document.head.appendChild(styleSheet);
  }
}
