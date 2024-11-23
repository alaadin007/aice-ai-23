import React, { useState } from 'react';
import { Shield, Key, AlertTriangle } from 'lucide-react';
import { markAdminInitialized } from '../utils/auth';

export function AdminSetup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    setupKey: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/admin/setup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        markAdminInitialized();
        window.location.href = '/admin';
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setError('Failed to setup admin account');
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="glass-effect rounded-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Admin Setup</h2>
            <p className="text-gray-400">Initialize your admin account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Setup Key
              </label>
              <div className="relative">
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={formData.setupKey}
                  onChange={(e) => setFormData(prev => ({ ...prev, setupKey: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-white"
                  required
                />
              </div>
            </div>

            {/* Name, Email, Password fields... */}

            {error && (
              <div className="flex items-center gap-2 text-red-400 text-sm">
                <AlertTriangle className="w-4 h-4" />
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full btn-primary py-3"
            >
              Initialize Admin Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}