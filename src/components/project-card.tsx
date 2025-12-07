import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  imageUrl?: string | null;
  customComponent?: React.ComponentType;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
}

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group flex flex-col overflow-hidden h-full border-2 hover:border-accent/50 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-card/50 backdrop-blur-sm">
      <CardHeader className="p-0 relative overflow-hidden">
        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-secondary/0 to-accent/0 group-hover:from-accent/10 group-hover:via-secondary/10 group-hover:to-accent/10 transition-all duration-500 z-10"></div>
        
        <div className="relative aspect-video w-full overflow-hidden">
          {project.customComponent ? (
            <project.customComponent />
          ) : project.imageUrl && project.imageUrl.includes('.svg') ? (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-500">
              <Image
                src={project.imageUrl}
                alt={project.title}
                width={200}
                height={100}
                className="object-contain"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ) : project.imageUrl ? (
            <Image
              src={project.imageUrl}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
              <span className="text-muted-foreground">No preview available</span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow space-y-4">
        <CardTitle className="text-xl font-bold group-hover:text-accent transition-colors">
          {project.title}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
          {project.description}
        </CardDescription>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs font-medium hover:bg-accent/20 transition-colors"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-end gap-3">
        {project.repoUrl && (
          <Button variant="outline" size="sm" asChild className="group/btn">
            <Link href={project.repoUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-1.5 h-4 w-4 group-hover/btn:rotate-12 transition-transform" /> 
              Code
            </Link>
          </Button>
        )}
        {project.liveUrl && (
          <Button variant="default" size="sm" asChild className="group/btn bg-gradient-to-r from-accent to-secondary hover:from-accent/90 hover:to-secondary/90">
            <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-1.5 h-4 w-4 group-hover/btn:translate-x-0.5 transition-transform" /> 
              Live Demo
            </Link>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
