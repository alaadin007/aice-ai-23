import { Router } from 'express';
import { OpenAI } from 'openai';
import { config } from '../config';

const router = Router();

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
  defaultHeaders: {
    'X-Project-ID': config.aestheticProjectId
  }
});

router.post('/', async (req, res) => {
  try {
    const { query } = req.body;

    const systemPrompt = `You are an AI expert trained specifically for the Aesthetic Intelligence project (ID: ${config.aestheticProjectId}).
    Analyze the given query about someone's expertise in aesthetic medicine and provide a detailed assessment.
    Focus on key competencies, skill levels, and areas for improvement within the aesthetic medicine domain.
    Format the response with clear sections for expertise level, specific skills, and recommendations.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const response = completion.choices[0].message.content;
    
    // Process and structure the response
    const expertise = {
      summary: extractSummary(response),
      details: extractDetails(response),
      confidence: 0.9
    };

    res.json(expertise);
  } catch (error) {
    console.error('Error analyzing expertise:', error);
    res.status(500).json({ error: 'Failed to analyze expertise' });
  }
});

function extractSummary(response: string): string {
  const lines = response.split('\n');
  return lines[0] || 'Analysis not available';
}

function extractDetails(response: string): string[] {
  const lines = response.split('\n').slice(1);
  return lines.filter(line => line.trim().length > 0);
}

export const analyzeExpertiseRouter = router;