/**
 * @fileOverview Provides AI flows for generating feedback on a portfolio description.
 *
 * - portfolioAnalysisFlow - A Genkit flow that takes a portfolio description and returns detailed, structured feedback.
 * - PortfolioFeedbackInputSchema - Zod schema for the input to the original flow (deprecated in favor of portfolioAnalysisFlow).
 * - PortfolioFeedbackOutputSchema - Zod schema for the output of the original flow.
 * - getPortfolioFeedback - An exported function to run the original portfolio feedback flow.
 */

import { ai } from '@/ai/ai-instance';
import { runFlow, createFlow } from 'genkit';
import { z } from 'zod';

// Define Zod schemas for input and output (for the original flow)
export const PortfolioFeedbackInputSchema = z.string().describe('A textual description of the personal portfolio.');
export type PortfolioFeedbackInput = z.infer<typeof PortfolioFeedbackInputSchema>;

export const PortfolioFeedbackOutputSchema = z.object({
  feedback: z.string().describe('Constructive feedback on the portfolio description, focusing on clarity, completeness, impact, and presentation, with suggestions for improvement.')
});
export type PortfolioFeedbackOutput = z.infer<typeof PortfolioFeedbackOutputSchema>;

// Define the prompt using the configured AI instance (original flow)
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

// Define the original flow using the prompt
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

// Exported async function to run the original flow (used by server actions or API routes)
export async function getPortfolioFeedback(description: string): Promise<PortfolioFeedbackOutput> {
  return await runFlow(portfolioFeedbackFlow, description);
}

// Define a new, improved portfolio analysis flow using createFlow and Google AI
export const portfolioAnalysisFlow = createFlow({
  name: 'Portfolio Analysis',
  description: 'Analyzes a portfolio description and provides personalized feedback',
  inputSchema: {
    type: 'object',
    properties: {
      portfolioDescription: {
        type: 'string',
        description: 'The user\'s portfolio description to analyze'
      }
    },
    required: ['portfolioDescription']
  },
  execute: async ({ portfolioDescription }, { googleAI }) => {
    // Create the prompt for portfolio analysis
    const prompt = `You are a helpful portfolio assistant specialized in providing feedback on personal portfolios for developers, designers, and other creative professionals.

User has shared the following portfolio description:
"""
${portfolioDescription}
"""

Provide constructive feedback on the portfolio with the following structure:
1. Overall impression (summarize strengths)
2. Content suggestions (what's missing or could be improved)
3. Structure recommendations (organization, flow)
4. Visual/presentation tips (if applicable)
5. Three specific action items to improve the portfolio

Be encouraging but honest, specific, and actionable in your feedback. Focus on helping the user make their portfolio stand out to potential employers or clients.`;

    // Generate feedback using the Google AI model
    const model = googleAI.getGenerativeModel({
      model: 'gemini-pro',
      apiVersion: 'v1beta',
    });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return {
      feedback: text,
    };
  }
});
