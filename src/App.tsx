import React, { useState } from 'react';
import { UserDashboard } from './components/UserDashboard';
import { TeamDashboard } from './components/TeamDashboard';
import { LoginModal } from './components/LoginModal';
import { Hero } from './components/Hero';
import { ProcessSteps } from './components/ProcessSteps';
import { ContentUploader } from './components/ContentUploader';

const SAMPLE_USER = {
  name: "Dr. Sarah Johnson",
  email: "sarah@example.com",
  organization: "Harley Street Clinic",
  isVerified: true,
  totalPoints: 45,
  memberNumber: "AiCE-001",
  photoUrl: null,
  isTeamHead: true
};

const SAMPLE_ORG = {
  name: "Harley Street Clinic",
  totalEmployees: 12,
  averageKIU: 42,
  monthlyGrowth: 24
};

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [showTeamDashboard, setShowTeamDashboard] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false);
  };

  if (isLoggedIn) {
    if (showTeamDashboard) {
      return (
        <TeamDashboard 
          organization={SAMPLE_ORG}
          onSwitchToPersonal={() => setShowTeamDashboard(false)}
        />
      );
    }

    return (
      <UserDashboard 
        user={SAMPLE_USER}
        onLogout={() => setIsLoggedIn(false)}
        onSwitchToTeam={() => setShowTeamDashboard(true)}
        isTeamHead={SAMPLE_USER.isTeamHead}
      />
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <h1 className="text-6xl font-bold">
                  <span className="text-white">A</span>
                  <span className="text-blue-600">i</span>
                  <span className="text-white">CE</span>
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
                onClick={() => setIsLoginOpen(true)}
              >
                Login / Register
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container px-6 pt-32 pb-20">
        <Hero />
        <ProcessSteps />
        <ContentUploader onUpload={() => setIsLoginOpen(true)} />
      </main>

      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onComplete={handleLogin}
      />
    </div>
  );
}