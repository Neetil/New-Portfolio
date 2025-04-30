'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Sparkles, Copy, CheckCheck, RefreshCw } from 'lucide-react';

// Sample feedback responses for demonstration purposes
const sampleFeedbacks = [
  {
    title: "Professional Developer Portfolio",
    feedback: `# Portfolio Analysis

## 1. Overall Impression
Your portfolio effectively showcases your skills as a full-stack developer with a focus on React and Next.js. The clean layout and project organization demonstrate your attention to detail and design sensibility.

## 2. Content Suggestions
Consider adding:
- A dedicated skills section with proficiency levels
- Brief case studies for your major projects explaining challenges and solutions
- A timeline of your professional journey
- Testimonials from colleagues or clients

## 3. Structure Recommendations
The current structure is logical, but you might benefit from:
- Adding a clear call-to-action at the end of each section
- Creating a dedicated blog section to showcase your technical knowledge
- Implementing project filtering by technology or category

## 4. Visual Presentation Tips
- Consider adding subtle animations for scrolling and hover effects
- Ensure consistent spacing between sections
- Use a color scheme that reflects your personality while maintaining professionalism
- Add interactive elements to showcase your frontend abilities

## 5. Action Items
1. Add metrics or quantifiable results to your project descriptions
2. Include a downloadable resume in PDF format
3. Implement a dark/light mode toggle to demonstrate your technical skills

Your portfolio is already strong, and these suggestions will help elevate it further to capture the attention of potential employers and clients.`
  },
  {
    title: "Creative Portfolio",
    feedback: `# Portfolio Feedback

## 1. Overall Impression
Your creative portfolio demonstrates excellent visual design skills and a strong understanding of user experience. The project thumbnails and descriptions effectively showcase your versatility and creative approach.

## 2. Content Suggestions
Consider enhancing your portfolio with:
- A more detailed about section that tells your personal story
- Process documentation showing your workflow and thought process
- More diverse project types to demonstrate range
- Client testimonials or feedback quotes

## 3. Structure Recommendations
The current organization could be improved by:
- Grouping projects by category or type
- Creating a more intuitive navigation system
- Adding a search or filter functionality
- Ensuring mobile responsiveness for all elements

## 4. Visual/Presentation Tips
- Consider a more consistent visual language across projects
- Incorporate subtle animations or transitions between sections
- Optimize image loading for better performance
- Use typography more effectively to create hierarchy

## 5. Three Specific Action Items
1. Create case studies for your top 3 projects with detailed process documentation
2. Add an interactive element or mini-game to demonstrate your skills
3. Implement analytics to see which projects receive the most attention

Your portfolio shows great potential - these refinements will help elevate it to stand out even more in the competitive creative field.`
  },
  {
    title: "UX/UI Designer Portfolio",
    feedback: `# UX/UI Portfolio Analysis

## 1. Overall Impression
Your UX/UI portfolio effectively communicates your design thinking and technical skills. The clean layout and attention to typography demonstrate your understanding of visual hierarchy and user-centered design principles.

## 2. Content Suggestions
To strengthen your portfolio, consider adding:
- More detailed case studies with problem statements and solution rationales
- User research methods and findings for each project
- Before/after comparisons when applicable
- Metrics showing the impact of your design decisions

## 3. Structure Recommendations
The current structure could be enhanced by:
- Creating a more intuitive navigation system
- Adding clear section dividers with consistent styling
- Implementing a logical flow from introduction to contact
- Including breadcrumbs or progress indicators for case studies

## 4. Visual/Presentation Tips
- Consider more consistent use of whitespace throughout
- Ensure color contrast meets accessibility standards
- Add subtle micro-interactions to demonstrate attention to detail
- Optimize for mobile viewing with responsive layouts

## 5. Three Specific Action Items
1. Implement a project filter system (by industry, skill used, or project type)
2. Create a dedicated process page showing your design methodology
3. Add interactive prototypes or videos demonstrating the final products in use

Your portfolio shows strong fundamentals - implementing these suggestions will help showcase your skills more effectively to potential clients and employers.`
  }
];

// Sample portfolio examples for inspiration
const examplePortfolios = [
  "My portfolio showcases 5 web development projects using React and Node.js. It has an about me section, skills with proficiency bars, and a contact form. The design is minimal with a dark/light theme toggle.",
  "I've created a UX/UI design portfolio with case studies for 3 major projects. Each case study includes the problem, process, and final design. I also have a skills section and testimonials from clients.",
  "My creative development portfolio features interactive web experiments using Three.js and WebGL. It includes an animated intro, project gallery with videos, and my professional background in game development."
];

export function AiAssistant() {
  const [input, setInput] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeExample, setActiveExample] = useState(-1);

  // Reset copied state after 2 seconds
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleSubmit = async () => {
    if (!input.trim()) return;

    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      // Select a random feedback from the samples
      const randomIndex = Math.floor(Math.random() * sampleFeedbacks.length);
      setFeedback(sampleFeedbacks[randomIndex].feedback);
      setIsLoading(false);
    }, 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(feedback);
    setCopied(true);
  };

  const useExample = (index) => {
    setInput(examplePortfolios[index]);
    setActiveExample(index);
  };

  const resetForm = () => {
    setInput('');
    setFeedback('');
    setActiveExample(-1);
  };

  return (
    <section id="ai-assistant" className="container py-10">
      <Card className="max-w-3xl mx-auto">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <CardTitle className="text-2xl">AI Portfolio Assistant</CardTitle>
          </div>
          <CardDescription className="text-base">
            Get AI-powered feedback on your portfolio presentation. Describe your portfolio&apos;s content and structure below.
          </CardDescription>

          {/* Example suggestions */}
          <div className="pt-2">
            <p className="text-sm text-muted-foreground mb-2">Examples for inspiration:</p>
            <div className="flex flex-wrap gap-2">
              {examplePortfolios.map((example, index) => (
                <Button
                  key={index}
                  variant={activeExample === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => useExample(index)}
                  className="text-xs"
                >
                  Example {index + 1}
                </Button>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="Describe your portfolio here (e.g., 'My portfolio showcases 3 web development projects using React and Node.js. It includes an about me section with my resume and contact info. The layout is minimal...')"
            className="min-h-[150px] text-base"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <div className="flex flex-wrap gap-2">
            <Button
              onClick={handleSubmit}
              disabled={isLoading || !input.trim()}
              className="w-full sm:w-auto"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Get Feedback
                </>
              )}
            </Button>

            {(input || feedback) && (
              <Button
                variant="outline"
                size="icon"
                onClick={resetForm}
                title="Clear form"
                className="w-10 h-10"
              >
                <RefreshCw className="h-4 w-4" />
              </Button>
            )}
          </div>

          {feedback && (
            <Card className="mt-4 border border-primary/20">
              <CardHeader className="py-3 px-6 flex flex-row items-center justify-between">
                <CardTitle className="text-lg font-medium">Portfolio Analysis</CardTitle>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  title="Copy feedback"
                  className="h-8 w-8"
                >
                  {copied ? <CheckCheck className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent className="pt-2 pb-6">
                <div className="prose prose-sm max-w-none dark:prose-invert">
                  {feedback.split('\n').map((paragraph, index) => {
                    // Handle Markdown headings
                    if (paragraph.startsWith('# ')) {
                      return <h1 key={index} className="text-xl font-bold mt-2 mb-4">{paragraph.slice(2)}</h1>;
                    } else if (paragraph.startsWith('## ')) {
                      return <h2 key={index} className="text-lg font-semibold mt-4 mb-2 text-primary">{paragraph.slice(3)}</h2>;
                    } else if (paragraph.startsWith('- ')) {
                      return <li key={index} className="ml-5 my-1">{paragraph.slice(2)}</li>;
                    } else if (paragraph === '') {
                      return <br key={index} />;
                    } else {
                      return <p key={index} className="my-2">{paragraph}</p>;
                    }
                  })}
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
