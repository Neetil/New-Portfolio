'use server';

import { runFlow } from 'genkit';
import { PortfolioFeedbackOutput, getPortfolioFeedback, portfolioAnalysisFlow } from './flows';

/**
 * Server action that calls the original portfolio feedback flow
 * @param description Text description of a portfolio
 * @returns The AI feedback on the portfolio
 */
export async function callPortfolioFeedbackFlow(description: string): Promise<PortfolioFeedbackOutput> {
  return getPortfolioFeedback(description);
}

/**
 * Server action that calls our new improved portfolio analysis flow
 * @param description Text description of a portfolio
 * @returns The AI feedback on the portfolio with structured analysis
 */
export async function callPortfolioAnalysisFlow(description: string): Promise<{ feedback: string }> {
  try {
    const result = await runFlow({
      flow: portfolioAnalysisFlow,
      inputs: {
        portfolioDescription: description
      }
    });

    return result;
  } catch (error) {
    console.error('Error running portfolio analysis flow:', error);
    throw new Error('Failed to generate portfolio feedback');
  }
}
