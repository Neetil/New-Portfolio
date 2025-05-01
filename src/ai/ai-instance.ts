import { createAI } from 'genkit/ai';
import { GoogleAIChat } from '@genkit-ai/googleai/chat';
import { GoogleAI } from '@genkit-ai/googleai';

// AI instance with appropriate models
export const ai = createAI({
  defaultProvider: 'googleai',
  providers: {
    //  Google AI as the main provider
    googleai: new GoogleAIChat({
      apiKey: process.env.GOOGLE_API_KEY || '',
      model: 'gemini-pro',
      defaultOptions: {
        // Configure default options for the chat model
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    }),
  },
});

// Export Google AI instance for direct access in our flows
export const googleAI = new GoogleAI({
  apiKey: process.env.GOOGLE_API_KEY || '',
});
