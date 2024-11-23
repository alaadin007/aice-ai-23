import React, { useState } from 'react';

interface HeaderProps {
  onLogin: () => void;
}

export function Header({ onLogin }: HeaderProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-zinc-800">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <div className="flex items-center gap-3">
              <h1 className="text-6xl font-bold">
                <span className="text-black">A</span>
                <span className="text-blue-600">i</span>
                <span className="text-black">CE</span>
              </h1>
              <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
            </div>
            <span className="text-xl text-gray-300 mt-1">
              Artificial Intelligence Continuing Education Credits
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="text-right">
              <div className="text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                Smarter, Unbiased,
              </div>
              <div className="text-gray-400 text-sm">Ever-Evolving Equivalency</div>
            </div>
            
            <button 
              className="btn-primary"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={onLogin}
            >
              Login / Register {isHovered ? '→' : ''}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}