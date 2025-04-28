'use server';

import { getPortfolioFeedback, PortfolioFeedbackOutput } from './flows'; // Import the async function and output type

// Define a server action that wraps the call to the async flow function
export async function callPortfolioFeedbackFlow(portfolioDescription: string): Promise<PortfolioFeedbackOutput> {
  // Input validation could be added here if needed, using PortfolioFeedbackInputSchema.parse(portfolioDescription)
  // though the schema is just z.string() currently.

  try {
    // Call the exported async function which internally runs the flow
    const result = await getPortfolioFeedback(portfolioDescription);
    return result;
  } catch (error) {
    console.error('Error running portfolio feedback flow:', error);
    // Consider throwing a more specific error or returning a structured error object
    // For now, re-throwing a generic error
    throw new Error('Failed to get portfolio feedback.');
  }
}
