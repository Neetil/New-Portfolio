 "use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Globe, Github, ArrowRight } from 'lucide-react';

interface TechIcon {
  name: string;
  icon?: string;
  iconSrc?: string;
  bgColor?: string;
  textColor?: string;
}

interface Project {
  title: string;
  description: string;
  imageUrl?: string | null;
  tags: string[];
  techIcons?: TechIcon[];
  liveUrl?: string;
  repoUrl?: string;
}

interface ProjectCardFeaturedProps {
  project: Project;
}

// Technology icon component
const TechIconComponent = ({
  tech,
  onHover,
  onLeave,
}: {
  tech: TechIcon;
  onHover?: (name: string) => void;
  onLeave?: () => void;
}) => {
  const lowerName = tech.name.toLowerCase();
  const isNextJs = lowerName === 'next.js' || lowerName === 'nextjs';
  const isNodeJs = lowerName === 'node.js' || lowerName === 'nodejs' || lowerName === 'node.js runtime';
  const styleOverrides = {
    ...(tech.bgColor ? { backgroundColor: tech.bgColor } : {}),
    ...(tech.textColor ? { color: tech.textColor } : {}),
  };

  const sizeClass = isNextJs ? 'w-11 h-11' : 'w-9 h-9';
  const iconSize = isNextJs ? 26 : isNodeJs ? 30 : 20;

  return (
    <div 
      className={`${sizeClass} flex items-center justify-center text-xs font-semibold transition-transform duration-200 hover:scale-110`}
      style={styleOverrides}
      title={tech.name}
      onMouseEnter={() => onHover?.(tech.name)}
      onMouseLeave={() => onLeave?.()}
    >
      {tech.iconSrc ? (
        <Image 
          src={tech.iconSrc} 
          alt={tech.name} 
          width={iconSize} 
          height={iconSize} 
          className="object-contain"
        />
      ) : (
        tech.icon
      )}
    </div>
  );
};

export function ProjectCardFeatured({ project }: ProjectCardFeaturedProps) {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="group relative overflow-hidden rounded-lg transition-all duration-300 h-full flex flex-col border" style={{ borderColor: '#0A0A0A' }}>
      {/* Gradient Border - Always visible */}
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
      <div className="absolute inset-[2px] rounded-lg" style={{ backgroundColor: '#0A0A0A' }}></div>
      
      {/* Content */}
      <div className="relative flex flex-col h-full">
        {/* Screenshot Container - Full width, no padding, attached to gradient */}
        <div className="relative w-full aspect-[4/3] overflow-hidden bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-purple-500/30">
          {project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="text-muted-foreground">No preview available</span>
            </div>
          )}
        </div>

        {/* Content Section - Dark background below image */}
        <div className="p-4 flex-grow flex flex-col" style={{ backgroundColor: '#171717' }}>
          {/* Title with icons */}
          <div className="flex items-center gap-3 mb-3">
            <h3 className="text-xl font-bold">{project.title}</h3>
            <div className="flex items-center gap-2 ml-auto">
              {project.liveUrl && (
                <Link 
                  href={project.liveUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Live site"
                >
                  <Globe className="h-5 w-5" />
                </Link>
              )}
              {project.repoUrl && (
                <Link 
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="GitHub repository"
                >
                  <Github className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-grow">
            {project.description}
          </p>

          {/* Technologies */}
          {project.techIcons && project.techIcons.length > 0 && (
            <div className="space-y-2 mb-4">
              <p className="text-xs text-muted-foreground font-medium">Technologies</p>
                <div className="flex flex-wrap items-center gap-0.4">
                {project.techIcons.map((tech, index) => (
                  <TechIconComponent
                    key={index}
                    tech={tech}
                    onHover={(name) => setHoveredTech(name)}
                    onLeave={() => setHoveredTech(null)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer with view details only */}
          <div className="flex items-center justify-end pt-2">
            <Link 
              href={project.liveUrl || project.repoUrl || '#'}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors group/link"
            >
              View Details
              <ArrowRight className="h-4 w-4 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>

      {hoveredTech && (
        <div className="fixed bottom-4 right-4 px-3 py-2 rounded-md bg-black/80 text-xs text-white shadow-lg pointer-events-none z-50">
          {hoveredTech}
        </div>
      )}
    </div>
  );
}
