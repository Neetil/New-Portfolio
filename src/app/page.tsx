import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCardFeatured } from '@/components/project-card-featured';
import { Testimonials } from '@/components/testimonials';
import { ContactForm } from '@/components/contact-form';
import { Download, Mail, Github, Linkedin, Twitter, Instagram } from 'lucide-react';
import { CursorStatus } from '@/components/cursor-status';
import { GitHubContributions } from '@/components/github-contributions';
import { projects } from '@/data/projects';


const aboutTechStack = [
  { name: "Next.js", iconSrc: "/svg/nextjs-svg.svg" },
  { name: "TypeScript", iconSrc: "/svg/typescript-svg.svg" },
  { name: "React", iconSrc: "/svg/react-svg.svg" },
  { name: "Node.js", iconSrc: "/svg/nodejs-svg.svg" },
  { name: "Tailwind CSS", iconSrc: "/svg/tailwind-svg.svg" },
  { name: "PostgreSQL", iconSrc: "/svg/postgresql-svg.svg" },
  { name: "Prisma", iconSrc: "/svg/prisma-svg.svg" },
  { name: "Socket.IO", iconSrc: "/svg/socketio-svg.svg" },
  { name: "WebRTC", iconSrc: "/svg/webrtc-svg.svg" },
  { name: "Framer Motion", iconSrc: "/svg/framermotion-svg.svg" },
  { name: "Vercel", iconSrc: "/svg/vercel-svg.svg" },
  { name: "Cloudflare", iconSrc: "/svg/cloudflare-svg.svg" },
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
      <section id="about" className="container relative pt-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 ">About Me</h2>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-6">
            Neetil Sahu
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl mb-6">
          I’m a full-stack developer working with React, Next.js, Node.js, and TypeScript to build scalable and production-ready applications. I design clean user interfaces, structure efficient backend logic, and ensure smooth performance across the stack. I focus on writing maintainable code and delivering reliable solutions that are built to scale.
          </p>
          
          <p className="text-sm font-medium text-muted-foreground mb-3">Skills</p>
          <div className="flex flex-wrap items-center gap-3">
            {aboutTechStack.map((tech) => (
              <div
                key={tech.name}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-muted/60 border border-border/60 hover:border-muted-foreground/30 transition-colors"
                title={tech.name}
              >
                <Image
                  src={tech.iconSrc}
                  alt=""
                  width={22}
                  height={22}
                  className="object-contain"
                  aria-hidden
                />
                <span className="sr-only">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="container relative pt-4">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/5 to-transparent -z-10"></div>
        
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              What People <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Say</span>
            </h2>
          </div>
          <div className="max-w-5xl mx-auto">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container relative pt-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              Let's <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Connect</span>
            </h2>
          </div>

          <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:border-accent/50 transition-all">
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-2">Send a message</h3>
              <p className="text-sm text-muted-foreground">
                Have a project in mind or just want to chat? Drop me a message and I'll get back to you.
              </p>
            </div>
                <ContactForm />
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
