import React, { useState } from 'react';
import { Share2, Settings, LogOut, LayoutGrid, List, Plus, BadgeCheck, Search, User, Users } from 'lucide-react';
import { UserCourseCard } from './UserCourseCard';
import { KnowledgeFusionScore } from './KnowledgeFusionScore';
import { SubjectProficiency } from './SubjectProficiency';
import { ShareProfile } from './ShareProfile';
import { ExpertiseAnalysis } from './ExpertiseAnalysis';

interface UserDashboardProps {
  user: {
    name: string;
    email: string;
    organization: string;
    isVerified: boolean;
    totalPoints: number;
    memberNumber: string;
    photoUrl: string | null;
    isTeamHead?: boolean;
  };
  onLogout: () => void;
  onSwitchToTeam?: () => void;
  isTeamHead?: boolean;
}

const SAMPLE_KFS = [
  {
    title: "Aesthetic Medicine",
    score: 92.8,
    subjects: [
      { name: "Facial Anatomy", color: "#60A5FA" },
      { name: "Injection Techniques", color: "#34D399" },
      { name: "Patient Management", color: "#F472B6" }
    ]
  },
  {
    title: "Business Management",
    score: 85.5,
    subjects: [
      { name: "Practice Operations", color: "#818CF8" },
      { name: "Marketing", color: "#FBBF24" },
      { name: "Financial Planning", color: "#6EE7B7" }
    ]
  }
];

const SAMPLE_PROFICIENCIES = [
  {
    subject: "Head & Neck Anatomy",
    score: 95,
    level: "Expert",
    totalKIU: 12,
    lastUpdated: "2 days ago",
    trend: 5,
    icon: "🧠"
  },
  {
    subject: "Injection Safety",
    score: 92,
    level: "Expert",
    totalKIU: 8,
    lastUpdated: "1 week ago",
    trend: 3,
    icon: "💉"
  },
  {
    subject: "Patient Assessment",
    score: 88,
    level: "Advanced",
    totalKIU: 6,
    lastUpdated: "3 days ago",
    trend: 4,
    icon: "👥"
  }
];

export function UserDashboard({ user, onLogout, onSwitchToTeam, isTeamHead }: UserDashboardProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [showShareProfile, setShowShareProfile] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-zinc-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-1">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-blue-400 bg-clip-text text-transparent">
                  AiCE
                </h1>
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-1 animate-pulse"></div>
              </div>

              {isTeamHead && (
                <div className="flex bg-zinc-800 rounded-xl p-1">
                  <button
                    className="px-4 py-2 rounded-lg text-sm bg-zinc-700 text-white flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    Personal
                  </button>
                  <button
                    onClick={onSwitchToTeam}
                    className="px-4 py-2 rounded-lg text-sm text-gray-400 hover:text-white flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Teams
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-6">
                {user.photoUrl ? (
                  <img 
                    src={user.photoUrl}
                    alt={user.name}
                    className="w-10 h-10 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-medium">
                    {user.name.charAt(0)}
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-white">{user.name}</span>
                    {user.isVerified && (
                      <BadgeCheck className="w-4 h-4 text-blue-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-400">{user.organization}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowShareProfile(true)}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <Share2 className="w-5 h-5 text-gray-400" />
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container px-6 pt-32 pb-20">
        {/* KFS Section */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {SAMPLE_KFS.map((kfs, index) => (
            <KnowledgeFusionScore
              key={index}
              title={kfs.title}
              score={kfs.score}
              subjects={kfs.subjects}
            />
          ))}
        </div>

        {/* Expertise Analysis */}
        <div className="mb-8">
          <ExpertiseAnalysis />
        </div>

        {/* Subject Proficiencies */}
        <div className="mb-8">
          <SubjectProficiency proficiencies={SAMPLE_PROFICIENCIES} />
        </div>

        {/* Course Management */}
        <div className="flex justify-between items-center mb-8">
          <button className="btn-primary flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add New Course
          </button>

          <div className="flex items-center gap-4">
            <div className="flex bg-zinc-800 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${
                  viewMode === 'grid' ? 'bg-zinc-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${
                  viewMode === 'list' ? 'bg-zinc-700 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-zinc-800 text-white rounded-xl px-4 py-2 border border-zinc-700 focus:outline-none focus:border-blue-500"
            >
              <option value="recent">Most Recent</option>
              <option value="points">Highest Points</option>
              <option value="title">Title (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Course Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
        }`}>
          {/* Course cards will be mapped here */}
        </div>
      </main>

      {/* Share Profile Modal */}
      <ShareProfile
        isOpen={showShareProfile}
        onClose={() => setShowShareProfile(false)}
        profileUrl={`https://aice.edu/p/${user.memberNumber}`}
        userName={user.name}
      />
    </div>
  );
}