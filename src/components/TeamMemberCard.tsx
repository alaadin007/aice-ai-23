import React from 'react';
import { MoreVertical, Award, TrendingUp, Clock } from 'lucide-react';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  photoUrl: string | null;
  totalKIU: number;
  recentActivity?: string;
  lastActive?: string;
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

interface TeamMemberCardProps {
  member: TeamMember;
}

export function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <div className="glass-effect rounded-xl p-6 hover:bg-zinc-800/50 transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {member.photoUrl ? (
            <img 
              src={member.photoUrl} 
              alt={member.name}
              className="w-12 h-12 rounded-xl object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xl font-medium">
              {member.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="font-medium text-white">{member.name}</h3>
            <p className="text-sm text-gray-400">{member.role}</p>
          </div>
        </div>
        <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-400" />
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm">
            <Award className="w-4 h-4 text-blue-500" />
            <span className="text-gray-400">Total KIU:</span>
            <span className="text-white font-medium">{member.totalKIU}</span>
          </div>
          {member.progress && (
            <div className="flex items-center gap-1 text-sm">
              <TrendingUp className={`w-4 h-4 ${member.progress.trend >= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <span className={member.progress.trend >= 0 ? 'text-green-500' : 'text-red-500'}>
                {member.progress.trend >= 0 ? '+' : ''}{member.progress.trend}%
              </span>
            </div>
          )}
        </div>

        {(member.recentActivity || member.lastActive) && (
          <div>
            <div className="text-sm text-gray-400 mb-2">Recent Activity</div>
            {member.recentActivity && (
              <p className="text-sm text-white">{member.recentActivity}</p>
            )}
            {member.lastActive && (
              <div className="flex items-center gap-1 text-xs text-gray-400 mt-1">
                <Clock className="w-3 h-3" />
                {member.lastActive}
              </div>
            )}
          </div>
        )}

        {member.topSkills && member.topSkills.length > 0 && (
          <div>
            <div className="text-sm text-gray-400 mb-2">Top Skills</div>
            <div className="flex flex-wrap gap-2">
              {member.topSkills.map((skill, index) => (
                <div
                  key={index}
                  className="px-3 py-1 rounded-full text-xs bg-blue-500/10 text-blue-400"
                >
                  {skill.name} • {skill.level}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}