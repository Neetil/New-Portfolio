'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BriefcaseIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  workExperiences,
  INITIAL_VISIBLE_EXPERIENCES,
  type WorkExperience,
  type ExperienceSkill,
} from "@/data/experience";

interface ExperienceTimelineProps {
  experiences?: WorkExperience[];
}

function ExperienceSkills({ skills }: { skills: ExperienceSkill[] }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {skills.map((skill) =>
          skill.iconSrc ? (
            <div
              key={skill.name}
              className="flex h-9 w-9 items-center justify-center transition-transform duration-200 hover:scale-110"
              title={skill.name}
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <Image
                src={skill.iconSrc}
                alt={skill.name}
                width={20}
                height={20}
                className="object-contain"
              />
            </div>
          ) : (
            <span
              key={skill.name}
              className="inline-flex items-center rounded-md border border-border/30 bg-muted/15 px-2 py-0.5 text-xs text-muted-foreground"
            >
              {skill.name}
            </span>
          )
        )}
      </div>

      {hoveredSkill && (
        <div className="fixed bottom-4 right-4 z-50 pointer-events-none rounded-md bg-black/80 px-3 py-2 text-xs text-white shadow-lg">
          {hoveredSkill}
        </div>
      )}
    </>
  );
}

interface ExperienceItemProps {
  exp: WorkExperience;
  index: number;
  total: number;
  showAll: boolean;
  isLast: boolean;
}

function ExperienceItem({ exp, index, total, showAll, isLast }: ExperienceItemProps) {
  const isExtra = index >= INITIAL_VISIBLE_EXPERIENCES;
  const revealDelay = showAll
    ? isExtra
      ? 280 + (index - INITIAL_VISIBLE_EXPERIENCES) * 140
      : index * 90
    : Math.max(0, (total - index - 1) * 40);

  return (
    <div
      className={cn(
        "grid transition-[grid-template-rows,opacity,margin] duration-500 ease-out",
        isExtra && !showAll ? "grid-rows-[0fr] opacity-0" : "grid-rows-[1fr] opacity-100"
      )}
      style={{ transitionDelay: `${revealDelay}ms` }}
    >
      <div className="overflow-hidden min-h-0">
        <div
          className={cn(
            "relative pl-10",
            !isLast && "pb-2",
            showAll && isExtra && "animate-experience-reveal"
          )}
          style={
            showAll && isExtra
              ? { animationDelay: `${280 + (index - INITIAL_VISIBLE_EXPERIENCES) * 140}ms` }
              : undefined
          }
        >
          {!isLast && (
            <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-border" />
          )}

          <div className="absolute left-0 top-1 flex items-center justify-center w-8 h-8 rounded-full border border-border/60 bg-muted/40 shadow-sm">
            <BriefcaseIcon className="h-4 w-4 text-accent" />
          </div>

          <Card className="w-full border-border/60 bg-card/50 backdrop-blur-sm">
            <CardContent className="p-3 sm:p-4">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-semibold">{exp.title}</h3>
                  <p className="text-sm text-muted-foreground">{exp.organization}</p>
                </div>

                <div className="flex flex-col sm:items-end sm:text-right shrink-0">
                  <time className="text-sm text-muted-foreground font-medium whitespace-nowrap">
                    {exp.period}
                  </time>
                  {exp.location && (
                    <p className="text-sm text-muted-foreground mt-0.5">{exp.location}</p>
                  )}
                </div>
              </div>

              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-500 ease-out",
                  showAll ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
                style={{ transitionDelay: showAll ? `${index * 90 + 120}ms` : `${(total - index) * 35}ms` }}
              >
                <div className="overflow-hidden min-h-0">
                  <ul className="mt-3 list-disc space-y-1.5 pl-5 text-[13px] text-muted-foreground leading-relaxed">
                    {exp.description.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                  {exp.skills && exp.skills.length > 0 && (
                    <ExperienceSkills skills={exp.skills} />
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export function ExperienceTimeline({ experiences = workExperiences }: ExperienceTimelineProps) {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={exp.id}
            exp={exp}
            index={index}
            total={experiences.length}
            showAll={showAll}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>

      {experiences.length > INITIAL_VISIBLE_EXPERIENCES && (
        <div className="flex justify-center pt-1">
          <Button
            variant="outline"
            onClick={() => setShowAll((prev) => !prev)}
            className="border-2 hover:bg-muted/30 hover:text-foreground hover:border-muted-foreground/30 transition-colors"
          >
            {showAll ? "Show less" : "Show all Work Experience"}
          </Button>
        </div>
      )}
    </div>
  );
}
