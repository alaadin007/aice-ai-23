import React from 'react';
import { MoreVertical, Clock, BookOpen, Award, CheckCircle } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  date: string;
  sources: number;
  points: number;
  icon: string;
  summary: string;
  status: string;
  score: number;
}

interface UserCourseCardProps {
  course: Course;
  viewMode: 'grid' | 'list';
}

export function UserCourseCard({ course, viewMode }: UserCourseCardProps) {
  if (viewMode === 'list') {
    return (
      <div className="glass-effect rounded-xl p-4 hover:bg-zinc-800/50 transition-colors group">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl">
            {course.icon}
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-1">
              {course.title}
            </h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.date}
              </div>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                {course.sources} {course.sources === 1 ? 'source' : 'sources'}
              </div>
              {course.status === 'completed' && (
                <div className="text-green-400 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Score: {course.score}%
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {course.points}
              </div>
              <div className="text-sm text-gray-400">KIU Points</div>
            </div>
            <button className="p-2 rounded-lg hover:bg-zinc-700 text-gray-400 hover:text-white">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-effect rounded-xl p-6 hover:bg-zinc-800/50 transition-colors group">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-2xl">
          {course.icon}
        </div>
        <button className="p-2 rounded-lg hover:bg-zinc-700 text-gray-400 hover:text-white">
          <MoreVertical className="w-5 h-5" />
        </button>
      </div>
      
      <div className="flex items-start gap-2 mb-2">
        <h3 className="text-lg font-semibold text-white flex-1">
          {course.title}
        </h3>
        {course.status === 'completed' && (
          <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
        )}
      </div>
      
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
        {course.summary}
      </p>
      
      <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          {course.date}
        </div>
        <div className="flex items-center gap-1">
          <BookOpen className="w-4 h-4" />
          {course.sources} {course.sources === 1 ? 'source' : 'sources'}
        </div>
      </div>
      
      {course.status === 'completed' && (
        <div className="bg-green-500/10 text-green-400 px-4 py-2 rounded-lg text-sm flex items-center gap-2 mb-4">
          <Award className="w-4 h-4" />
          Score: {course.score}%
        </div>
      )}
      
      <div className="flex items-baseline justify-between pt-4 border-t border-zinc-700">
        <div className="text-4xl font-bold text-white">
          {course.points}
        </div>
        <div className="text-sm text-gray-400">KIU Points</div>
      </div>
    </div>
  );
}