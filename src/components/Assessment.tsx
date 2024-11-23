import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, X } from 'lucide-react';

interface Question {
  id: number;
  text: string;
  options: {
    id: string;
    text: string;
  }[];
  correctAnswer: string;
  visual?: {
    type: string;
    url: string;
    caption: string;
  };
}

interface AssessmentProps {
  questions: Question[];
  onComplete: (score: number, answers: Record<number, string>) => void;
  onBack: () => void;
  onClose?: () => void;
}

export function Assessment({ questions, onComplete, onBack, onClose }: AssessmentProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showWarning, setShowWarning] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isFirstQuestion = currentQuestionIndex === 0;

  const handleAnswerSelect = (answerId: string) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: answerId
    }));
  };

  const handleNext = () => {
    if (!selectedAnswers[currentQuestion.id]) return;

    if (isLastQuestion) {
      const score = calculateScore();
      onComplete(score, selectedAnswers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (isFirstQuestion) {
      onBack();
    } else {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    return Object.entries(selectedAnswers).reduce((score, [questionId, answer]) => {
      const question = questions.find(q => q.id === parseInt(questionId));
      return score + (question?.correctAnswer === answer ? 1 : 0);
    }, 0);
  };

  const handleCloseClick = () => {
    if (Object.keys(selectedAnswers).length > 0) {
      setShowWarning(true);
    } else {
      onClose?.();
    }
  };

  return (
    <div className="max-w-6xl mx-auto relative">
      <div className="glass-effect rounded-2xl p-8">
        {onClose && (
          <button
            onClick={handleCloseClick}
            className="absolute -right-3 -top-3 w-8 h-8 bg-zinc-800 hover:bg-zinc-700 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200 border border-zinc-700 shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        <h1 className="text-3xl font-bold text-center mb-2">Short Assessment</h1>
        <div className="w-12 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">
              {currentQuestionIndex + 1}- {currentQuestion.text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.options.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleAnswerSelect(option.id)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 ${
                    selectedAnswers[currentQuestion.id] === option.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-zinc-800 text-gray-300 hover:bg-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      selectedAnswers[currentQuestion.id] === option.id
                        ? 'border-white'
                        : 'border-gray-400'
                    }`}>
                      {option.id}
                    </span>
                    <span>{option.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {currentQuestion.visual && (
            <div className="rounded-xl overflow-hidden h-[400px] bg-zinc-800">
              <div className="relative h-full">
                <img
                  src={currentQuestion.visual.url}
                  alt={currentQuestion.visual.caption}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-sm text-gray-200">
                    {currentQuestion.visual.caption}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleBack}
              className="btn-secondary flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>
            <div className="text-sm text-gray-400">
              {currentQuestionIndex + 1}/{questions.length}
            </div>
          </div>
          <button
            onClick={handleNext}
            disabled={!selectedAnswers[currentQuestion.id]}
            className={`btn-primary flex items-center gap-2 ${
              !selectedAnswers[currentQuestion.id] ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLastQuestion ? 'Complete' : 'Next'}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showWarning && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-md relative animate-fadeIn border border-zinc-800">
            <h3 className="text-xl font-bold mb-4">Are you sure?</h3>
            <p className="text-gray-400 mb-6">
              Your progress will be lost if you exit the assessment now.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowWarning(false)}
                className="btn-secondary flex-1"
              >
                Continue Assessment
              </button>
              <button
                onClick={() => onClose?.()}
                className="btn-primary flex-1"
              >
                Exit Anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}