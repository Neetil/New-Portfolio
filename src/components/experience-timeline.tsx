'use client';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BriefcaseIcon, GraduationCapIcon } from "lucide-react";


interface ExperienceItem {
  id: number;
  title: string;
  organization: string;
  period: string;
  description: string;
  type: 'work' | 'education';
  skills?: string[];
}


const defaultExperiences: ExperienceItem[] = [
  {
    id: 1,
    title: "Software Developer",
    organization: "Tech Company",
    period: "Jan 2023 - Present",
    description: "Working on full-stack development using React, Next.js, and Node.js. Building responsive and accessible web applications.",
    type: 'work',
    skills: ["React", "Node.js", "TypeScript"]
  },
  {
    id: 2,
    title: "Web Development Intern",
    organization: "Start-up Studio",
    period: "Jun 2022 - Dec 2022",
    description: "Developed UI components and implemented responsive design. Collaborated with senior developers on feature implementation.",
    type: 'work',
    skills: ["HTML/CSS", "JavaScript", "UI Design"]
  },
  {
    id: 3,
    title: "Bachelor's Degree",
    organization: "University of Technology",
    period: "2018 - 2022",
    description: "Bachelor of Science in Computer Science with a focus on software engineering and web technologies.",
    type: 'education'
  }
];

interface ExperienceTimelineProps {
  experiences?: ExperienceItem[];
}

export function ExperienceTimeline({ experiences = defaultExperiences }: ExperienceTimelineProps) {
  return (
    <div className="space-y-8">
      {experiences.map((exp, index) => (
        <div key={exp.id} className={`relative pl-10 ${index !== experiences.length - 1 ? 'pb-10' : ''}`}>
          {/* Timeline connector */}
          {index !== experiences.length - 1 && (
            <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-border"></div>
          )}

          {/* Timeline icon */}
          <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full border bg-background shadow-sm">
            {exp.type === 'work' ? (
              <BriefcaseIcon className="h-4 w-4 text-primary" />
            ) : (
              <GraduationCapIcon className="h-4 w-4 text-primary" />
            )}
          </div>

          {/* Content card */}
          <Card className="w-full animate-fade-in-right">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between">
                <div>
                  <h3 className="text-lg font-medium">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground">{exp.organization}</p>
                </div>
                <time className="mt-1 sm:mt-0 text-sm text-muted-foreground font-medium">{exp.period}</time>
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{exp.description}</p>
              {exp.skills && exp.skills.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                  {exp.skills.map(skill => (
                    <Badge key={skill} variant="secondary" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
