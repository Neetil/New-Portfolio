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
import { projects } from '@/data/projects';


const skills = [
  { name: "Next.js", icon: Code },
  { name: "React", icon: Code },
  { name: "TypeScript", icon: Code },
  { name: "Node.js", icon: Code },
  { name: "Tailwind CSS", icon: Code },
  { name: "PostgreSQL", icon: Code },
  { name: "Prisma ORM", icon: Code },
  { name: "Socket.IO", icon: Code },
  { name: "WebRTC", icon: Code },
  { name: "Vercel & Cloudflare", icon: Layers },
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
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              About <span className="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Me</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Main Content */}
            <div className="space-y-6">
              <div className="space-y-5">
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  I'm <span className="text-foreground font-semibold">Neetil</span>, a full-stack developer who turns ideas into real products. 
                  I build fast, responsive interfaces with <span className="text-foreground font-medium">React</span> and <span className="text-foreground font-medium">Next.js</span>, 
                  and connect them to reliable backends using <span className="text-foreground font-medium">Node.js</span>, <span className="text-foreground font-medium">PostgreSQL</span>, and <span className="text-foreground font-medium">Prisma</span>.
                </p>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  When I need real-time features — live chat, collaboration tools, or dynamic dashboards — I use <span className="text-foreground font-medium">Socket.IO</span> and <span className="text-foreground font-medium">WebRTC</span>. 
                  I focus on clean design with <span className="text-foreground font-medium">Tailwind CSS</span>, smooth animations, and making sure everything feels polished.
                </p>

                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  I deploy on <span className="text-foreground font-medium">Vercel</span> and experiment with <span className="text-foreground font-medium">Cloudflare</span> to keep apps fast. 
                  Always learning, always building something new.
                </p>
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="space-y-8">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:border-accent/50 transition-all group">
                  <div className="text-3xl font-bold text-foreground mb-1 group-hover:scale-105 transition-transform">4+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="p-6 rounded-xl border border-border/50 bg-gradient-to-br from-card/50 to-card/30 backdrop-blur-sm hover:border-accent/50 transition-all group">
                  <div className="text-3xl font-bold text-foreground mb-1 group-hover:scale-105 transition-transform">2</div>
                  <div className="text-sm text-muted-foreground">Live Apps</div>
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">TypeScript</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">Next.js</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">PostgreSQL</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">Prisma</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">Socket.IO</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">WebRTC</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">Tailwind</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">Vercel</span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-foreground text-sm font-medium hover:border-accent/50 transition-colors">Cloudflare</span>
                </div>
              </div>

              {/* Focus Areas */}
              <div className="space-y-4">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Focus Areas</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>Full-stack web development</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                    <span>Real-time applications</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent"></div>
                    <span>UI/UX design & animations</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-secondary"></div>
                    <span>Performance optimization</span>
                        </div>
                </div>
              </div>
            </div>
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
