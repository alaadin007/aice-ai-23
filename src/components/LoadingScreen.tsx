import React from 'react';
import { Clock } from 'lucide-react';

interface LoadingScreenProps {
  isLongProcess?: boolean;
}

export function LoadingScreen({ isLongProcess }: LoadingScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      {isLongProcess ? (
        <>
          <Clock className="w-16 h-16 text-blue-500 mb-6 animate-pulse" />
          <h2 className="text-2xl font-bold mb-3">Processing Your Content</h2>
          <p className="text-gray-400 max-w-md">
            This might take a few minutes. Feel free to come back later - we'll save your progress.
          </p>
        </>
      ) : (
        <>
          <div className="w-16 h-16 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-6" />
          <h2 className="text-2xl font-bold mb-3">Analyzing Content</h2>
          <p className="text-gray-400">
            We're preparing your assessment...
          </p>
        </>
      )}
    </div>
  );
}