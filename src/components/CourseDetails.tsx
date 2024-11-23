import React from 'react';
import { ArrowRight, Star } from 'lucide-react';

interface CourseDetailsProps {
  title: string;
  description: string;
  points: number;
  onContinue: () => void;
}

export function CourseDetails({ title, description, points, onContinue }: CourseDetailsProps) {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="glass-effect rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-2">Course Details</h1>
        <div className="w-12 h-1 bg-blue-500 mx-auto mb-12 rounded-full" />

        <div className="space-y-8">
          <div>
            <h2 className="text-lg font-medium text-gray-400 mb-2">Title</h2>
            <p className="text-2xl font-semibold">{title}</p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-gray-400 mb-2">Description</h2>
            <p className="text-lg leading-relaxed">{description}</p>
          </div>

          <div className="relative">
            <h2 className="text-lg font-medium text-gray-400 mb-4">KIU (Knowledge Impact Units)</h2>
            <div className="bg-gradient-to-br from-blue-600 to-blue-400 p-6 rounded-2xl relative overflow-hidden group">
              {/* Animated background elements */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.1),transparent)] opacity-70"></div>
              <div className="absolute -right-8 -top-8 w-32 h-32 bg-white/10 rounded-full blur-2xl transform group-hover:scale-150 transition-transform duration-700"></div>
              
              {/* Points display */}
              <div className="relative flex items-center gap-4">
                <div className="flex items-start">
                  <span className="text-7xl font-bold text-white animate-pulse">
                    {points}
                  </span>
                  <div className="flex flex-col ml-4 mt-2">
                    <span className="text-2xl font-semibold text-blue-100">KIU</span>
                    <span className="text-blue-200 text-sm">Allocated</span>
                  </div>
                </div>
                <Star className="w-12 h-12 text-yellow-300 absolute right-4 top-1/2 -translate-y-1/2 animate-spin-slow" />
              </div>

              {/* Decorative elements */}
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded-full animate-ping"></div>
              <div className="absolute top-2 right-12 w-1.5 h-1.5 bg-blue-200 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex justify-end">
          <button
            onClick={onContinue}
            className="btn-primary flex items-center gap-2 text-lg px-6"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}