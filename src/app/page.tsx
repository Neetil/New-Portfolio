import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ProjectCard } from '@/components/project-card';
import { AiAssistant } from '@/components/ai-assistant';
import { Testimonials } from '@/components/testimonials'; // Import testimonials component
import { ContactForm } from '@/components/contact-form'; // Import contact form
import { Code, Download, Layers, Mail } from 'lucide-react';

// Dummy project data - replace with your actual projects
const projects = [
  {
    title: "Project Alpha",
    description: "A web application built with Next.js and Tailwind CSS demonstrating server components.",
    imageUrl: "https://picsum.photos/seed/alpha/400/225",
    tags: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
    liveUrl: "#",
    repoUrl: "#",
  },
  {
    title: "Project Beta",
    description: "An API service developed using Node.js and Express, integrated with a PostgreSQL database.",
    imageUrl: "https://picsum.photos/seed/beta/400/225",
    tags: ["Node.js", "Express", "API", "PostgreSQL"],
    repoUrl: "#",
    liveUrl: "#",
  },
  {
    title: "Project Gamma",
    description: "A design system implemented with Storybook and styled-components for reusable UI elements.",
    imageUrl: "https://picsum.photos/seed/gamma/400/225",
    tags: ["UI/UX", "Design System", "Storybook", "CSS-in-JS"],
    liveUrl: "#",
    repoUrl: "#",
  },
   {
    title: "Project Delta",
    description: "A mobile-first application using React Native targeting both iOS and Android platforms.",
    imageUrl: "https://picsum.photos/seed/delta/400/225",
    tags: ["React Native", "Mobile", "JavaScript"],
    liveUrl: "#",
    repoUrl: "#",
  },
];

// Dummy skills data - replace with your actual skills
const skills = [
  { name: "JavaScript", icon: Code },
  { name: "Java", icon: Code }, // Added Java
  { name: "React", icon: Code },
  { name: "Next.js", icon: Code },
  { name: "Node.js", icon: Code },
  { name: "HTML & CSS", icon: Code },
  { name: "Tailwind CSS", icon: Code },
  { name: "SQL", icon: Code },
  // { name: "Git", icon: Code }, // Removed Git
  // { name: "Docker", icon: Code }, // Removed Docker
  { name: "Figma", icon: Layers },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section id="home" className="container grid lg:grid-cols-2 gap-10 items-center">
        <div className="flex flex-col items-start space-y-4 text-center lg:text-left animate-fade-in-up">
           <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Neetil
          </h1>
          <p className="text-xl text-muted-foreground md:text-2xl">
            Full-Stack Developer | UI/UX Enthusiast
          </p>
          <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Passionate about building beautiful, functional, and user-centric web experiences. Let's create something amazing together.
          </p>
          <div className="flex gap-2">
            <Button asChild size="lg">
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/neetil-resume.pdf" target="_blank" download="Neetil Resume.pdf">
                <Download className="mr-2 h-4 w-4" /> Resume
              </Link>
            </Button>
          </div>
        </div>
         <div className="relative aspect-square w-full max-w-[300px] mx-auto lg:mx-0 lg:justify-self-end animate-fade-in">
            <Image
                src="/images/neetil-profile.jpg"
                alt="Neetil"
                fill
                className="rounded-full object-cover shadow-lg border-4 border-secondary"
                priority
                sizes="(max-width: 768px) 100vw, 300px"
            />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container">
        <div className="grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
           <div className="space-y-4 animate-slide-in-left">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">About Me</h2>
                <p className="text-muted-foreground md:text-xl/relaxed">
                    I'm Neetil, a passionate developer with a strong focus on building clean, efficient, and user-centric digital experiences. My journey into tech began during the first semester of my college when I started experimenting with simple HTML pages, which soon turned into a deep passion for web development. Since then, I've worked on mastering both frontend and backend technologies, developing robust, scalable applications.
                </p>
                <p className="text-muted-foreground md:text-xl/relaxed">
                    Beyond coding, I find energy in challenges — whether it's collaborating with dynamic teams, participating in intense hackathons, or pushing boundaries through new projects. Every experience fuels my growth, sharpens my perspective, and strengthens my passion for making a difference through what I build.
                </p>
                <Button variant="outline" asChild>
                  <Link href="#contact">
                    <Mail className="mr-2 h-4 w-4" /> Get In Touch
                  </Link>
                </Button>
            </div>
            <div className="space-y-4 animate-slide-in-right">
                <h3 className="text-2xl font-bold">Skills</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                    <Card key={skill.name} className="flex items-center p-3 gap-3 hover:bg-accent/50 transition-colors">
                        <skill.icon className="h-5 w-5 text-accent" />
                        <span className="text-sm font-medium">{skill.name}</span>
                    </Card>
                    ))}
                </div>
             </div>
        </div>
      </section>





      {/* Projects Section */}
      <section id="projects" className="container py-10">
        <div className="space-y-4 mb-8 text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects Showcase</h2>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
                Here are some of the projects I've worked on. Take a look!
            </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div key={project.title} className={`animate-fade-in-up delay-${index * 100}`}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </section>



      {/* Testimonials Section (NEW) */}
      <section id="testimonials" className="container py-10">
        <div className="space-y-4 mb-8 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Client Testimonials</h2>
          <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            What people are saying about working with me.
          </p>
        </div>
        <div className="mt-10 max-w-4xl mx-auto">
          <Testimonials />
        </div>
      </section>

      {/* Contact Section (NEW) */}
      <section id="contact" className="container py-10">
        <div className="grid gap-10 lg:grid-cols-2 items-start">
          <div>
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Get In Touch</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                Have a project in mind or want to discuss potential opportunities? Send me a message and I'll get back to you as soon as possible.
              </p>
            </div>
            <div className="mt-8 space-y-4">
              <Card>
                <CardContent className="p-6 flex items-center gap-4">
                  <Mail className="h-6 w-6 text-primary" />
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <a href="mailto:neetilwork@gmail.com" className="text-sm text-muted-foreground hover:underline">
                      neetilwork@gmail.com
                    </a>
                  </div>
                </CardContent>
              </Card>
              {/* Can add more contact methods here like phone, location, etc. */}
            </div>
          </div>
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send me a message</CardTitle>
                <CardDescription>Fill out the form below to get in touch with me.</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* AI Assistant Section */}
      <AiAssistant />

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

// Inject styles - In a real app, prefer adding to globals.css or a dedicated CSS module
if (typeof window !== 'undefined') {
  let styleSheet = document.getElementById('animation-styles');
  if (!styleSheet) {
    styleSheet = document.createElement("style");
    styleSheet.id = 'animation-styles';
    styleSheet.type = "text/css";
    styleSheet.innerText = animationStyles;
    document.head.appendChild(styleSheet);
  }
}
