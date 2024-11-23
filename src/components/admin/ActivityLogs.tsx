import React, { useState } from 'react';
import { Activity, Search, Filter, Download } from 'lucide-react';

interface LogEntry {
  id: number;
  type: 'info' | 'warning' | 'error';
  message: string;
  user: string;
  timestamp: string;
  details?: string;
}

const SAMPLE_LOGS: LogEntry[] = [
  {
    id: 1,
    type: 'info',
    message: 'New admin user added',
    user: 'Sarah Johnson',
    timestamp: '2024-02-20 14:30:00',
    details: 'Added admin user michael@example.com with restricted permissions'
  },
  {
    id: 2,
    type: 'warning',
    message: 'High API usage detected',
    user: 'System',
    timestamp: '2024-02-20 14:15:00',
    details: 'API usage exceeded 80% of monthly limit'
  }
];

export function ActivityLogs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'info' | 'warning' | 'error'>('all');

  const getTypeStyles = (type: LogEntry['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-500/20 text-blue-500';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'error':
        return 'bg-red-500/20 text-red-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Activity Logs
            </h2>
            <p className="text-gray-400">
              Monitor system and user activities
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Activity className="w-6 h-6 text-blue-500" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value as any)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="info">Info</option>
              <option value="warning">Warnings</option>
              <option value="error">Errors</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="btn-secondary flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {SAMPLE_LOGS.map((log) => (
            <div
              key={log.id}
              className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className={`px-2 py-1 rounded-lg text-xs ${getTypeStyles(log.type)}`}>
                    {log.type.toUpperCase()}
                  </span>
                  <span className="text-white">{log.message}</span>
                </div>
                <span className="text-sm text-gray-400">{log.timestamp}</span>
              </div>

              {log.details && (
                <p className="text-sm text-gray-400 mt-2">
                  {log.details}
                </p>
              )}

              <div className="mt-2 text-sm text-gray-500">
                User: {log.user}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}