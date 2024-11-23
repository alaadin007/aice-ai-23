import React from 'react';
import { Brain } from 'lucide-react';

interface Subject {
  name: string;
  color: string;
}

interface KFSProps {
  title: string;
  score: number;
  subjects: Subject[];
}

export function KnowledgeFusionScore({ title, score, subjects }: KFSProps) {
  const educationLevels = [
    'Foundational',
    'Certificate',
    'Diploma',
    "Bachelor's",
    "Master's",
    'PhD'
  ];

  const getScoreLevel = (score: number) => {
    if (score >= 75) return 'PhD';
    if (score >= 65) return "Master's";
    if (score >= 55) return "Bachelor's";
    if (score >= 45) return 'Diploma';
    if (score >= 35) return 'Certificate';
    return 'Foundational';
  };

  const currentLevel = getScoreLevel(score);
  const levelIndex = educationLevels.indexOf(currentLevel);

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            {title} KFS
          </h3>
          <p className="text-sm text-gray-400">Knowledge Fusion Score</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <Brain className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="mb-6">
        <div className="text-4xl font-bold text-white mb-4">
          {score.toFixed(1)}
        </div>
        <div className="space-y-2">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm mr-2 mb-2"
              style={{ backgroundColor: `${subject.color}20`, color: subject.color }}
            >
              {subject.name}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm text-white mb-2">
          {educationLevels.map((level, index) => (
            <div
              key={level}
              className={`text-xs ${index <= levelIndex ? 'text-white' : 'text-gray-600'}`}
            >
              {level}
            </div>
          ))}
        </div>
        <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
            style={{ width: `${(levelIndex + 1) * (100 / educationLevels.length)}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-400 text-right">
          Legacy Education System Equivalence
        </div>
      </div>
    </div>
  );
}