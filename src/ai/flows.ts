/**
 * @fileOverview Provides an AI flow for generating feedback on a portfolio description.
 *
 * - portfolioFeedbackFlow - A Genkit flow that takes a portfolio description and returns feedback.
 * - PortfolioFeedbackInputSchema - Zod schema for the input to the flow.
 * - PortfolioFeedbackOutputSchema - Zod schema for the output of the flow.
 * - getPortfolioFeedback - An exported function to run the portfolio feedback flow.
 */
// 'use server'; removed: This file exports non-async objects (schemas, flow)

import { ai } from '@/ai/ai-instance';
import { runFlow } from 'genkit';
import { z } from 'zod';

// Define Zod schemas for input and output
export const PortfolioFeedbackInputSchema = z.string().describe('A textual description of the personal portfolio.');
export type PortfolioFeedbackInput = z.infer<typeof PortfolioFeedbackInputSchema>;

export const PortfolioFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Constructive feedback on the portfolio description, focusing on clarity, completeness, impact, and presentation, with suggestions for improvement.')
});
export type PortfolioFeedbackOutput = z.infer<typeof PortfolioFeedbackOutputSchema>;


// Define the prompt using the configured AI instance
const feedbackPrompt = ai.definePrompt({
  name: 'portfolioFeedbackPrompt',
  input: { schema: PortfolioFeedbackInputSchema },
  output: { schema: PortfolioFeedbackOutputSchema },
  prompt: `You are an expert portfolio reviewer for software developers and designers.
Analyze the following description of a personal portfolio and provide constructive feedback.
Focus on clarity, completeness, impact, and presentation.
Suggest specific improvements where possible. Be encouraging but honest.

Portfolio Description:
---
{{{input}}}
---

Feedback:
`,
  config: {
    temperature: 0.5, // Moderate temperature for balanced creativity and coherence
  },
});

// Define the flow using the prompt
export const portfolioFeedbackFlow = ai.defineFlow(
  {
    name: 'portfolioFeedbackFlow',
    inputSchema: PortfolioFeedbackInputSchema,
    outputSchema: PortfolioFeedbackOutputSchema,
  },
  async (portfolioDescription) => {
    const { output } = await feedbackPrompt(portfolioDescription);
    // Ensure output is not null; if it is, return an empty feedback object or handle error
    return output ?? { feedback: "Could not generate feedback." };
  }
);

// Exported async function to run the flow (used by server actions or API routes)
export async function getPortfolioFeedback(description: string): Promise<PortfolioFeedbackOutput> {
  return await runFlow(portfolioFeedbackFlow, description);
}
