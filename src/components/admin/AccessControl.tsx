import React, { useState } from 'react';
import { Users, Plus, Search, Shield, Edit2, Trash2 } from 'lucide-react';

interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  lastActive: string;
}

const SAMPLE_USERS: AdminUser[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    role: "Admin",
    permissions: ["users.view", "users.edit", "content.manage"],
    lastActive: "2 hours ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    role: "Manager",
    permissions: ["users.view", "content.view"],
    lastActive: "1 day ago"
  }
];

export function AccessControl() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              Access Management
            </h2>
            <p className="text-gray-400">
              Manage admin access and permissions
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <Shield className="w-6 h-6 text-purple-500" />
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search admins..."
              className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Admin
          </button>
        </div>

        <div className="space-y-4">
          {SAMPLE_USERS.map((user) => (
            <div
              key={user.id}
              className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{user.name}</h3>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                    <Edit2 className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className="px-2 py-1 rounded-lg bg-purple-500/20 text-purple-400">
                    {user.role}
                  </span>
                  <span className="text-gray-400">
                    Active {user.lastActive}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap gap-2">
                {user.permissions.map((permission, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 rounded-lg bg-zinc-700 text-gray-300 text-xs"
                  >
                    {permission}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}