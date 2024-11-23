import React from 'react';
import { BarChart3, TrendingUp, Users } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  progress: {
    monthly: number;
    total: number;
    trend: number;
  };
  topSkills: Array<{
    name: string;
    level: string;
  }>;
}

interface TeamAnalyticsProps {
  team: TeamMember[];
}

export function TeamAnalytics({ team }: TeamAnalyticsProps) {
  return (
    <div className="space-y-6">
      {/* Growth Trends */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Team Growth Trends
            </h3>
            <p className="text-sm text-gray-400">Monthly KIU progress</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        <div className="h-64 flex items-end justify-between gap-2">
          {team.map((member) => (
            <div key={member.id} className="flex-1">
              <div 
                className="bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg"
                style={{ height: `${(member.progress.monthly / 10) * 100}%` }}
              />
              <div className="text-xs text-gray-400 mt-2 truncate">
                {member.name.split(' ')[0]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Skill Distribution */}
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Team Skill Distribution
            </h3>
            <p className="text-sm text-gray-400">Expertise levels across team</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-green-500" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {['Facial Anatomy', 'Injection Techniques', 'Patient Management', 'Dermal Fillers'].map((skill) => (
            <div key={skill} className="bg-zinc-800/50 rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white">{skill}</span>
                <span className="text-sm text-gray-400">
                  {team.filter(m => m.topSkills.some(s => s.name === skill)).length} members
                </span>
              </div>
              <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                  style={{ 
                    width: `${(team.filter(m => 
                      m.topSkills.some(s => s.name === skill)
                    ).length / team.length) * 100}%` 
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}