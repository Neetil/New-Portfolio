import { startDevServer } from '@genkit-ai/next/dev';
import { portfolioFeedbackFlow } from './flows'; // Correct path confirmed

startDevServer({ flows: [portfolioFeedbackFlow] });
