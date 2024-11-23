import React, { useState } from 'react';
import { Share2, Mail, Link2, Copy, CheckCircle, X } from 'lucide-react';

interface ShareProfileProps {
  isOpen: boolean;
  onClose: () => void;
  profileUrl: string;
  userName: string;
}

export function ShareProfile({ isOpen, onClose, profileUrl, userName }: ShareProfileProps) {
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);

    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl p-8 w-full max-w-md relative animate-fadeIn border border-zinc-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-4">
            <Share2 className="w-6 h-6 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Share Your Profile</h2>
          <p className="text-gray-400">
            Share your AiCE profile with employers or colleagues
          </p>
        </div>

        {showSuccess ? (
          <div className="text-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <p className="text-white font-medium">Profile shared successfully!</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Profile Link
              </label>
              <div className="flex gap-2">
                <div className="flex-1 bg-zinc-800 rounded-xl px-4 py-3 text-sm text-gray-300 truncate">
                  {profileUrl}
                </div>
                <button
                  onClick={handleCopyLink}
                  className="btn-secondary flex items-center gap-2 whitespace-nowrap"
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
            </div>

            <form onSubmit={handleSendEmail} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Share via Email
                </label>
                <div className="input-group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10 bg-zinc-800 border-zinc-700 text-white"
                    placeholder="recipient@example.com"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSending}
                className="w-full btn-primary py-3 flex items-center justify-center gap-2"
              >
                {isSending ? (
                  <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Mail className="w-5 h-5" />
                    Send Profile Link
                  </>
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}