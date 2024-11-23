import React, { useState } from 'react';
import { Mail, ArrowRight, RefreshCw } from 'lucide-react';

interface EmailVerificationProps {
  email: string;
  onVerified: () => void;
  onResend: () => void;
}

export function EmailVerification({ email, onVerified, onResend }: EmailVerificationProps) {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return; // Only allow single digits
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      onVerified();
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="glass-effect rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mx-auto mb-6">
          <Mail className="w-8 h-8 text-blue-500" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Check Your Email</h2>
        <p className="text-gray-400 mb-8">
          We sent a verification code to<br />
          <span className="text-white font-medium">{email}</span>
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                id={`code-${index}`}
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-bold bg-zinc-800 border border-zinc-700 rounded-lg focus:border-blue-500 focus:outline-none text-white"
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={isLoading || code.some(d => !d)}
            className="w-full btn-primary py-3 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Verify Email
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>

          <div className="text-center">
            <button
              type="button"
              onClick={onResend}
              className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-4 h-4" />
              Resend Code
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}