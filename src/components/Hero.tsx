import React from 'react';
import { Star, Brain, Award, Users } from 'lucide-react';

export function Hero() {
  return (
    <div className="mb-20">
      {/* Main Hero */}
      <div className="text-center mb-16">
        <h2 className="text-6xl font-bold mb-6">
          <span className="text-white">Surf</span>,{' '}
          <span className="text-white">Learn</span>,{' '}
          <span className="text-gray-500">Earn</span>
          <Star className="inline-block w-8 h-8 ml-2 text-blue-600" />
        </h2>
        <h3 className="text-2xl mb-4">
          Turn Your <span className="font-semibold">Browsing</span> into{' '}
          <span className="font-semibold">Equivalent Credits</span>
        </h3>
        <p className="text-gray-400 text-lg">
          CPD, CME, CE, CLE, PDUs, CPE, & More
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* KIU Feature */}
        <div className="glass-effect rounded-xl p-6 hover:bg-zinc-800/50 transition-duration-300">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Knowledge Impact Units (KIU)</h3>
          <p className="text-gray-400 leading-relaxed">
            Earn KIU points for every learning interaction. 1 KIU equals 1 hour of professional development, recognized worldwide for CPD, CME, and more.
          </p>
        </div>

        {/* KFS Feature */}
        <div className="glass-effect rounded-xl p-6 hover:bg-zinc-800/50 transition-duration-300">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-4">
            <Brain className="w-6 h-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Knowledge Fusion Score (KFS)</h3>
          <p className="text-gray-400 leading-relaxed">
            AI-powered expertise rating that evolves with your learning journey. From foundational to PhD level - Legacy Education System Equivalence.
          </p>
        </div>

        {/* Team KIU Feature */}
        <div className="glass-effect rounded-xl p-6 hover:bg-zinc-800/50 transition-duration-300">
          <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">Team Learning</h3>
          <p className="text-gray-400 leading-relaxed">
            Track your team's professional development, assign learning materials, and monitor progress. Perfect for organizations committed to continuous learning.
          </p>
        </div>
      </div>
    </div>
  );
}