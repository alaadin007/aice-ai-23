import { useState } from 'react';
import { analyzeExpertise } from '../utils/api';

export function useExpertiseAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (query: string) => {
    try {
      setIsAnalyzing(true);
      setError(null);
      const response = await analyzeExpertise(query);
      setResult(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze expertise');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    analyze,
    isAnalyzing,
    result,
    error
  };
}