import React, { useState } from 'react';
import { Users, Search, Filter, Download, Mail, BadgeCheck, XCircle } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  organization: string;
  isVerified: boolean;
  totalKIU: number;
  joinDate: string;
  status: 'active' | 'pending' | 'suspended';
}

const SAMPLE_USERS: User[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    organization: "Harley Street Clinic",
    isVerified: true,
    totalKIU: 45,
    joinDate: "2024-01-15",
    status: 'active'
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@example.com",
    organization: "City Medical Center",
    isVerified: false,
    totalKIU: 12,
    joinDate: "2024-02-01",
    status: 'pending'
  }
];

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'active' | 'pending' | 'suspended'>('all');

  const getStatusStyles = (status: User['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'suspended':
        return 'bg-red-500/20 text-red-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              User Management
            </h2>
            <p className="text-gray-400">
              Manage and monitor platform users
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-500" />
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
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as any)}
              className="px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
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
          {SAMPLE_USERS.map((user) => (
            <div
              key={user.id}
              className="bg-zinc-800/50 rounded-xl p-4 hover:bg-zinc-800 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-lg font-medium">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-white">{user.name}</h3>
                      {user.isVerified && (
                        <BadgeCheck className="w-4 h-4 text-blue-500" />
                      )}
                    </div>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-lg text-xs ${getStatusStyles(user.status)}`}>
                    {user.status.toUpperCase()}
                  </span>
                  <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                    <Mail className="w-4 h-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-zinc-700 rounded-lg transition-colors">
                    <XCircle className="w-4 h-4 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-6 text-sm">
                <div>
                  <span className="text-gray-400">Organization:</span>
                  <span className="text-white ml-2">{user.organization}</span>
                </div>
                <div>
                  <span className="text-gray-400">Total KIU:</span>
                  <span className="text-white ml-2">{user.totalKIU}</span>
                </div>
                <div>
                  <span className="text-gray-400">Joined:</span>
                  <span className="text-white ml-2">{user.joinDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}