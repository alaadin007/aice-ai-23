interface CompletionData {
  assessmentScore: number;
  timeSpent: number;
  interactionMetrics: {
    resourcesAccessed: number;
    questionsAnswered: number;
  };
}

export function validateKIU(points: number, data: CompletionData): boolean {
  if (points < 0 || points > 10) return false;
  if (data.timeSpent < 0) return false;
  if (data.assessmentScore < 0 || data.assessmentScore > 100) return false;

  return true;
}