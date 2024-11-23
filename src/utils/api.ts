import axios from 'axios';
import { config } from '../config';

interface ExpertiseAnalysisResult {
  summary: string;
  details: string[];
  confidence: number;
}

export async function analyzeExpertise(query: string): Promise<ExpertiseAnalysisResult> {
  try {
    const response = await axios.post(`${config.apiUrl}/api/analyze`, { query });
    return response.data;
  } catch (error) {
    console.error('Error analyzing expertise:', error);
    throw error;
  }
}