export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  apiKey: import.meta.env.VITE_API_KEY,
  aestheticProjectId: import.meta.env.VITE_AESTHETIC_PROJECT_ID,
  openaiApiKey: import.meta.env.VITE_OPENAI_API_KEY,
};