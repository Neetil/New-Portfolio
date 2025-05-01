'use client';

import { useEffect, useState } from 'react';
import { Progress } from "@/components/ui/progress";

interface Skill {
  name: string;
  level: number; // 0-100
  category?: string;
}

interface SkillsProgressProps {
  skills?: Skill[];
  animated?: boolean;
}


const defaultSkills: Skill[] = [
  { name: "JavaScript", level: 90, category: "Frontend" },
  { name: "React", level: 85, category: "Frontend" },
  { name: "TypeScript", level: 80, category: "Frontend" },
  { name: "HTML & CSS", level: 95, category: "Frontend" },
  { name: "Next.js", level: 85, category: "Frontend" },
  { name: "Node.js", level: 75, category: "Backend" },
  { name: "Express", level: 70, category: "Backend" },
  { name: "MongoDB", level: 65, category: "Backend" },
  { name: "PostgreSQL", level: 60, category: "Backend" },
  { name: "Figma", level: 70, category: "Design" },
  { name: "UI/UX", level: 75, category: "Design" },
];

export function SkillsProgress({ skills = defaultSkills, animated = true }: SkillsProgressProps) {
  const [progress, setProgress] = useState<{ [key: string]: number }>(
    Object.fromEntries(skills.map(skill => [skill.name, 0]))
  );

  // Group skills by category
  const categorizedSkills = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  // Sort categories for consistent display
  const categories = Object.keys(categorizedSkills).sort();

  useEffect(() => {
    if (!animated) {
     
      setProgress(Object.fromEntries(skills.map(skill => [skill.name, skill.level])));
      return;
    }


    const initialTimeout = setTimeout(() => {
      // Animate each skill with a staggered start
      skills.forEach((skill, index) => {
        const startDelay = index * 100; // Stagger start of animations

        setTimeout(() => {
    
          let currentValue = 0;
          const increment = skill.level / 15; // Controls animation speed
          const intervalId = setInterval(() => {
            currentValue += increment;
            if (currentValue >= skill.level) {
              currentValue = skill.level;
              clearInterval(intervalId);
            }
            setProgress(prev => ({
              ...prev,
              [skill.name]: currentValue
            }));
          }, 20);
        }, startDelay);
      });
    }, 300);

    return () => clearTimeout(initialTimeout);
  }, [skills, animated]);

  return (
    <div className="space-y-8">
      {categories.map(category => (
        <div key={category} className="space-y-4">
          <h3 className="text-lg font-medium">{category}</h3>
          <div className="space-y-4">
            {categorizedSkills[category].map(skill => (
              <div key={skill.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{Math.round(progress[skill.name])}%</span>
                </div>
                <Progress value={progress[skill.name]} className="h-2" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
