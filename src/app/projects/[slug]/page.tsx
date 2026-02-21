import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, Github, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, getAllProjectSlugs } from "@/data/projects";
import { RevealSection } from "@/components/reveal-section";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  const title = `${project.title} | Neetil's Portfolio`;
  const description =
    project.overview.slice(0, 155) + (project.overview.length > 155 ? "…" : "");
  const imageUrl = project.bannerUrl || project.imageUrl;
  const url = `https://neetil.in/projects/${slug}`;
  const absoluteImageUrl = imageUrl.startsWith("http")
    ? imageUrl
    : `https://neetil.in${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Neetil - Developer",
      images: [
        { url: absoluteImageUrl, width: 1200, height: 630, alt: project.title },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteImageUrl],
    },
    alternates: { canonical: url },
  };
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const bannerSrc = project.bannerUrl || project.imageUrl;

  return (
    <article className="min-h-screen animate-page-enter">
      {/* Hero — full-width banner with overlay and title */}
      <header className="relative w-full aspect-[21/9] min-h-[200px] sm:min-h-[280px] md:min-h-[340px] overflow-hidden">
        <Image
          src={bannerSrc}
          alt={project.title}
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent"
          aria-hidden
        />
        <div className="absolute bottom-0 left-0 right-0 container pb-6 md:pb-10">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground drop-shadow-sm">
            {project.title}
          </h1>
        </div>
      </header>

      <div className="container py-10 md:py-16 space-y-16">
        {/* Project Overview */}
        <RevealSection>
          <div className="space-y-8">
            <h2 className="text-2xl font-bold tracking-tight">Project Overview</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              {project.overview}
            </p>

            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {project.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-accent mt-1.5 shrink-0">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">Future Plans</h3>
                <ul className="space-y-2 text-muted-foreground">
                  {project.futurePlans.map((plan, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-secondary mt-1.5 shrink-0">→</span>
                      <span>{plan}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </RevealSection>

        {/* CTA Buttons */}
        <RevealSection>
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <Button asChild size="lg" className="gap-2 transition-transform hover:scale-105">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Globe className="h-5 w-5" aria-hidden />
                  Live Demo
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            )}
            {project.repoUrl && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="gap-2 border-2 transition-transform hover:scale-105"
              >
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <Github className="h-5 w-5" aria-hidden />
                  Source Code
                  <ExternalLink className="h-4 w-4" aria-hidden />
                </a>
              </Button>
            )}
          </div>
        </RevealSection>

        {/* Tech Stack */}
        <RevealSection>
          <h2 className="text-2xl font-bold tracking-tight mb-6">Tech Stack</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {project.techStack.frontend?.length ? (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Frontend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.frontend.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {project.techStack.backend?.length ? (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Backend
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.backend.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {project.techStack.database?.length ? (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Database
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.database.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
            {project.techStack.tools?.length ? (
              <div className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Tools / Deployment
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.tools.map((tech) => (
                    <span
                      key={tech}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg bg-muted/80 border border-border text-sm font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </RevealSection>

        {/* Key Highlights / Achievements */}
        <RevealSection>
          <h2 className="text-2xl font-bold tracking-tight mb-6">
            Key Highlights & Achievements
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.highlights.map((h, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-accent/50 transition-colors"
              >
                <h3 className="font-semibold text-foreground">{h.title}</h3>
                {h.description && (
                  <p className="text-sm text-muted-foreground mt-1">{h.description}</p>
                )}
                {h.metric && (
                  <p className="text-sm font-medium text-accent mt-2">{h.metric}</p>
                )}
              </div>
            ))}
          </div>
        </RevealSection>

        <RevealSection>
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/#projects">
              <ArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </Button>
        </RevealSection>
      </div>
    </article>
  );
}
