import { startDevServer } from '@genkit-ai/next/dev';
import { portfolioFeedbackFlow } from './flows'; 

startDevServer({ flows: [portfolioFeedbackFlow] });
