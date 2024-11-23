import React from 'react';
import { Users, Award, TrendingUp, AlertTriangle, Activity } from 'lucide-react';

export function SystemStats() {
  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center mb-4">
            <Users className="w-6 h-6 text-blue-500" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            12,458
          </div>
          <div className="text-sm text-gray-400">Total Users</div>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center mb-4">
            <Award className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            45,892
          </div>
          <div className="text-sm text-gray-400">KIU Points Awarded</div>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mb-4">
            <TrendingUp className="w-6 h-6 text-green-500" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            +24%
          </div>
          <div className="text-sm text-gray-400">Monthly Growth</div>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center mb-4">
            <Activity className="w-6 h-6 text-orange-500" />
          </div>
          <div className="text-2xl font-bold text-white mb-1">
            99.9%
          </div>
          <div className="text-sm text-gray-400">System Uptime</div>
        </div>
      </div>

      {/* System Health */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">System Health</h2>
        <div className="space-y-4">
          <div className="bg-zinc-800/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">API Response Time</span>
              <span className="text-white font-medium">124ms</span>
            </div>
            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-green-400 rounded-full"
                style={{ width: '92%' }}
              />
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Database Load</span>
              <span className="text-white font-medium">45%</span>
            </div>
            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full"
                style={{ width: '45%' }}
              />
            </div>
          </div>

          <div className="bg-zinc-800/50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-400">Memory Usage</span>
              <span className="text-white font-medium">78%</span>
            </div>
            <div className="h-2 bg-zinc-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-yellow-500 to-yellow-400 rounded-full"
                style={{ width: '78%' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="glass-effect rounded-xl p-6">
        <h2 className="text-lg font-semibold text-white mb-4">System Alerts</h2>
        <div className="space-y-4">
          <div className="flex items-start gap-3 bg-yellow-500/10 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-500 mb-1">
                High API Usage Warning
              </h4>
              <p className="text-sm text-yellow-500/80">
                API usage is approaching the monthly limit. Consider upgrading the plan.
              </p>
              <p className="text-xs text-yellow-500/60 mt-1">
                2 hours ago
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 bg-green-500/10 rounded-xl p-4">
            <Activity className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-green-500 mb-1">
                System Update Completed
              </h4>
              <p className="text-sm text-green-500/80">
                All systems have been updated to the latest version successfully.
              </p>
              <p className="text-xs text-green-500/60 mt-1">
                1 day ago
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}