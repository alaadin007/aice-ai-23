import React, { useState } from 'react';
import { Key, Eye, EyeOff, Copy, CheckCircle, AlertTriangle } from 'lucide-react';

export function APIKeyManagement() {
  const [showKey, setShowKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const [apiKey, setApiKey] = useState('sk-aice-.......................');

  const handleCopyKey = async () => {
    try {
      await navigator.clipboard.writeText(apiKey);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">
              API Integration
            </h2>
            <p className="text-gray-400">
              Manage OpenAI project integration
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
            <Key className="w-6 h-6 text-yellow-500" />
          </div>
        </div>

        {/* Current API Key */}
        <div className="bg-zinc-800/50 rounded-xl p-6 mb-6">
          <h3 className="text-lg font-medium text-white mb-4">Current API Key</h3>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 bg-zinc-900 rounded-xl px-4 py-3 font-mono text-sm">
              {showKey ? apiKey : '•'.repeat(35)}
            </div>
            <button
              onClick={() => setShowKey(!showKey)}
              className="p-2 hover:bg-zinc-700 rounded-lg transition-colors"
            >
              {showKey ? (
                <EyeOff className="w-5 h-5 text-gray-400" />
              ) : (
                <Eye className="w-5 h-5 text-gray-400" />
              )}
            </button>
            <button
              onClick={handleCopyKey}
              className="btn-secondary flex items-center gap-2"
            >
              {copied ? (
                <>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>

          <div className="flex items-start gap-3 bg-yellow-500/10 rounded-xl p-4">
            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-500 mb-1">
                Security Notice
              </h4>
              <p className="text-sm text-yellow-500/80">
                Keep this API key secure and never share it. If compromised, regenerate immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Update API Key */}
        <div className="bg-zinc-800/50 rounded-xl p-6">
          <h3 className="text-lg font-medium text-white mb-4">Update API Key</h3>
          
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                New OpenAI Project Key
              </label>
              <input
                type="text"
                placeholder="sk-aice-..."
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Project ID
              </label>
              <input
                type="text"
                placeholder="aice-aesthetic-intelligence-001"
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="btn-primary"
              >
                Update API Key
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}