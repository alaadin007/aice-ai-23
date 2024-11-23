import React, { useState } from 'react';
import { Search, Brain, AlertCircle } from 'lucide-react';
import { useExpertiseAnalysis } from '../hooks/useExpertiseAnalysis';

interface TestScore {
  name: string;
  score: number;
  maxScore: number;
  date: string;
}

const SAMPLE_TEST_SCORES: TestScore[] = [
  { name: "IQ Assessment", score: 128, maxScore: 150, date: "2024-01-15" },
  { name: "Critical Thinking", score: 92, maxScore: 100, date: "2024-02-01" },
  { name: "Analytical Skills", score: 88, maxScore: 100, date: "2024-02-15" },
  { name: "Problem Solving", score: 94, maxScore: 100, date: "2024-01-20" }
];

export function ExpertiseAnalysis() {
  const [query, setQuery] = useState('');
  const { analyze, isAnalyzing, result, error } = useExpertiseAnalysis();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      analyze(query);
    }
  };

  return (
    <div className="glass-effect rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white mb-1">
            Engage My Expertise
          </h3>
          <p className="text-sm text-gray-400">AI-powered knowledge assessment</p>
        </div>
        <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
          <Brain className="w-6 h-6 text-purple-500" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column: AI Analysis */}
        <div>
          <form onSubmit={handleSubmit} className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How well does Sarah know facial anatomy?"
                className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
          </form>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm mb-4">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          {isAnalyzing && (
            <div className="flex items-center justify-center py-8">
              <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
            </div>
          )}

          {result && (
            <div className="bg-zinc-800/50 rounded-xl p-4">
              <div className="mb-4">
                <div className="text-lg font-medium text-white mb-2">Analysis Result</div>
                <p className="text-gray-400">{result.summary}</p>
              </div>
              
              <div className="space-y-3">
                {result.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-blue-400">•</span>
                    <span className="text-gray-300">{detail}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Test Scores */}
        <div>
          <h4 className="text-sm font-medium text-gray-400 mb-4">Assessment Scores</h4>
          <div className="space-y-4">
            {SAMPLE_TEST_SCORES.map((test, index) => (
              <div key={index} className="bg-zinc-800/50 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">{test.name}</span>
                  <span className="text-lg font-bold text-white">
                    {test.score}
                    <span className="text-sm text-gray-400 ml-1">
                      / {test.maxScore}
                    </span>
                  </span>
                </div>
                <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-500"
                    style={{ width: `${(test.score / test.maxScore) * 100}%` }}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs text-gray-400">
                    Completed {new Date(test.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}