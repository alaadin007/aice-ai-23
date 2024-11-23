import React, { useState } from 'react';
import { CheckCircle, XCircle, ChevronLeft, AlertCircle, RefreshCcw } from 'lucide-react';

interface ResultScreenProps {
  score: number;
  totalQuestions: number;
  questions: Array<{
    id: number;
    text: string;
    options: Array<{ id: string; text: string }>;
    correctAnswer: string;
  }>;
  userAnswers: Record<number, string>;
  onRetry: () => void;
  onContinue: () => void;
  onBack: () => void;
}

export function ResultScreen({ 
  score, 
  totalQuestions, 
  questions,
  userAnswers,
  onRetry, 
  onContinue, 
  onBack 
}: ResultScreenProps) {
  const [reviewedAnswers, setReviewedAnswers] = useState(false);
  const passThreshold = 0.7;
  const percentage = (score / totalQuestions) * 100;
  const passed = percentage >= (passThreshold * 100);
  const incorrectAnswers = questions.filter(q => userAnswers[q.id] !== q.correctAnswer);
  const hasIncorrectAnswers = incorrectAnswers.length > 0;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="glass-effect rounded-2xl p-8">
        <div className="text-center mb-12">
          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-3xl font-bold mb-2">
            {passed ? "Congratulations!" : "Assessment Not Passed"}
          </h2>
          <p className="text-gray-400 text-lg mb-6">
            {passed 
              ? hasIncorrectAnswers 
                ? "You've passed! Review the questions you missed below" 
                : "Perfect score! You've mastered the content"
              : "Don't worry! Review the answers below and try again"}
          </p>

          <div className="bg-zinc-800 rounded-xl p-6 inline-block">
            <div className="text-5xl font-bold mb-2">
              {percentage.toFixed(0)}%
            </div>
            <div className="text-gray-400">
              {score} out of {totalQuestions} correct
            </div>
          </div>
        </div>

        {hasIncorrectAnswers && (
          <div className="mb-12 space-y-6">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-500" />
              Learning Review
            </h3>
            
            <div className="space-y-6">
              {incorrectAnswers.map((question) => {
                const correctOption = question.options.find(opt => opt.id === question.correctAnswer);
                return (
                  <div 
                    key={question.id}
                    className="bg-zinc-800/50 rounded-xl p-6 border border-zinc-700"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center shrink-0 mt-1">
                        <XCircle className="w-5 h-5 text-red-500" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-3">
                          {question.text}
                        </h4>
                        <div className="space-y-2">
                          <div className="text-red-400">
                            <span className="font-medium">Your answer: </span>
                            {question.options.find(opt => opt.id === userAnswers[question.id])?.text}
                          </div>
                          <div className="text-green-400">
                            <span className="font-medium">Correct answer: </span>
                            {correctOption?.text}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {passed && (
              <label className="flex items-center gap-3 bg-zinc-800 p-4 rounded-xl cursor-pointer group">
                <input
                  type="checkbox"
                  checked={reviewedAnswers}
                  onChange={(e) => setReviewedAnswers(e.target.checked)}
                  className="w-5 h-5 rounded border-gray-500 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-800"
                />
                <span className="text-gray-300 group-hover:text-white transition-colors">
                  I have reviewed the correct answers and understand my mistakes
                </span>
              </label>
            )}
          </div>
        )}

        <div className="flex gap-4">
          <button
            onClick={onBack}
            className="btn-secondary flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </button>
          
          {passed ? (
            <button
              onClick={onContinue}
              disabled={hasIncorrectAnswers && !reviewedAnswers}
              className={`btn-primary flex-1 py-3 text-lg ${
                hasIncorrectAnswers && !reviewedAnswers ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              Continue to Certificate
            </button>
          ) : (
            <button
              onClick={onRetry}
              className="btn-primary flex-1 py-3 text-lg flex items-center justify-center gap-2"
            >
              <RefreshCcw className="w-5 h-5" />
              Retry Assessment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}