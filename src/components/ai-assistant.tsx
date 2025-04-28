'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Wand2 } from 'lucide-react';
import { callPortfolioFeedbackFlow } from '@/ai/actions'; // Assuming the Genkit flow action exists

export function AiAssistant() {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [portfolioDescription, setPortfolioDescription] = useState('');
  const { toast } = useToast();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setFeedback(null);

    if (!portfolioDescription.trim()) {
        toast({
            title: "Error",
            description: "Please provide a description of your portfolio.",
            variant: "destructive",
        });
        setIsLoading(false);
        return;
    }

    try {
      const result = await callPortfolioFeedbackFlow(portfolioDescription);
      setFeedback(result.feedback);
      toast({
        title: "Feedback Generated",
        description: "The AI assistant has provided feedback on your portfolio description.",
      });
    } catch (error) {
      console.error("Error calling AI assistant:", error);
      toast({
        title: "Error",
        description: "Failed to get feedback from the AI assistant. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-assistant" className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-2xl md:text-3xl">
            <Wand2 className="h-6 w-6 text-accent" />
            AI Portfolio Assistant
          </CardTitle>
          <CardDescription>
            Get AI-powered feedback on your portfolio presentation. Describe your portfolio's content and structure below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
             <Textarea
                placeholder="Describe your portfolio here (e.g., 'My portfolio showcases 3 web development projects using React and Node.js. It includes an about me section with my resume and contact info. The layout is minimalist...')"
                value={portfolioDescription}
                onChange={(e) => setPortfolioDescription(e.target.value)}
                rows={6}
                aria-label="Portfolio Description"
                disabled={isLoading}
              />
              {feedback && (
                <Card className="bg-secondary/50 border-secondary">
                  <CardHeader>
                    <CardTitle className="text-lg">Feedback:</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm whitespace-pre-wrap">{feedback}</p>
                  </CardContent>
                </Card>
              )}
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Getting Feedback...
                </>
              ) : (
                'Get Feedback'
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </section>
  );
}
