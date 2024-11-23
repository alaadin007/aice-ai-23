import React from 'react';
import { BookOpen, TrendingUp, Award } from 'lucide-react';

interface ProficiencyData {
  subject: string;
  score: number;
  level: string;
  totalKIU: number;
  lastUpdated: string;
  trend: number;
  icon?: string;
}

interface SubjectProficiencyProps {
  proficiencies: ProficiencyData[];
}

export function SubjectProficiency({ proficiencies }: SubjectProficiencyProps) {
  const getLevelColor = (score: number) => {
    if (score >= 90) return 'text-purple-400 bg-purple-500/10';
    if (score >= 80) return 'text-blue-400 bg-blue-500/10';
    if (score >= 70) return 'text-green-400 bg-green-500/10';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/10';
    return 'text-gray-400 bg-gray-500/10';
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Subject Proficiencies
          </h3>
          <p className="text-sm text-gray-400">Combined KIU analysis</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <BookOpen className="w-6 h-6 text-blue-500" />
        </div>
      </div>

      <div className="grid gap-4">
        {proficiencies.map((prof, index) => (
          <div
            key={index}
            className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-700 flex items-center justify-center text-xl shrink-0">
                {prof.icon || '📚'}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-white truncate">
                    {prof.subject}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-lg text-sm ${getLevelColor(prof.score)}`}>
                      {prof.level}
                    </span>
                    <span className="text-lg font-bold text-white">
                      {prof.score}%
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-400">
                      {prof.totalKIU} KIU
                    </span>
                    <span className="text-gray-400">
                      Updated {prof.lastUpdated}
                    </span>
                  </div>
                  <div className={`flex items-center gap-1 ${
                    prof.trend > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    <TrendingUp className="w-4 h-4" />
                    {prof.trend > 0 ? '+' : ''}{prof.trend}%
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3 h-1.5 bg-zinc-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${prof.score}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}