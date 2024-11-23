import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  openaiApiKey: process.env.OPENAI_API_KEY,
  aestheticProjectId: process.env.AESTHETIC_PROJECT_ID,
  jwtSecret: process.env.JWT_SECRET,
  environment: process.env.NODE_ENV || 'development'
};