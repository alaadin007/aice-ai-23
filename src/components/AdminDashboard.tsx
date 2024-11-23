import React, { useState } from 'react';
import { Shield, Users, Key, Settings, Database, Activity, Lock, Server, AlertTriangle } from 'lucide-react';
import { APIKeyManagement } from './admin/APIKeyManagement';
import { UserManagement } from './admin/UserManagement';
import { SystemStats } from './admin/SystemStats';
import { AccessControl } from './admin/AccessControl';
import { ActivityLogs } from './admin/ActivityLogs';

interface AdminDashboardProps {
  user: {
    name: string;
    role: 'owner' | 'admin';
    email: string;
  };
}

type ActiveView = 'overview' | 'users' | 'api' | 'access' | 'activity';

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeView, setActiveView] = useState<ActiveView>('overview');
  const [showAPIKeyModal, setShowAPIKeyModal] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Database },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'api', label: 'API Integration', icon: Key },
    { id: 'access', label: 'Access Control', icon: Lock },
    { id: 'activity', label: 'Activity Logs', icon: Activity }
  ];

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
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-sm">
                <Shield className="w-4 h-4" />
                Admin Console
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium text-white">{user.name}</div>
                <div className="text-xs text-gray-400">{user.role}</div>
              </div>
              <button className="p-2 hover:bg-zinc-800 rounded-lg transition-colors">
                <Settings className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="pt-24 pb-12">
        <div className="container mx-auto px-6">
          <div className="flex gap-6">
            {/* Sidebar Navigation */}
            <div className="w-64 shrink-0">
              <div className="glass-effect rounded-xl p-4">
                <nav className="space-y-2">
                  {navigationItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setActiveView(item.id as ActiveView)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                        activeView === item.id
                          ? 'bg-blue-500 text-white'
                          : 'text-gray-400 hover:bg-zinc-800 hover:text-white'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {user.role === 'owner' && (
                <div className="glass-effect rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 text-yellow-500 mb-3">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="text-sm font-medium">Owner Actions</span>
                  </div>
                  <button
                    onClick={() => setShowAPIKeyModal(true)}
                    className="w-full px-4 py-3 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors text-left text-sm"
                  >
                    Update OpenAI Project Key
                  </button>
                </div>
              )}
            </div>

            {/* Main Content Area */}
            <div className="flex-1">
              {activeView === 'overview' && <SystemStats />}
              {activeView === 'users' && <UserManagement />}
              {activeView === 'api' && <APIKeyManagement />}
              {activeView === 'access' && <AccessControl />}
              {activeView === 'activity' && <ActivityLogs />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}