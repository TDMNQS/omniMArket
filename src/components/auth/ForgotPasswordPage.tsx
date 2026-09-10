import React, { useState } from 'react';
import { AuthBackground3D } from '../3d/AuthBackground3D';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

interface ForgotPasswordPageProps {
  navigate: (route: string) => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({ navigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 overflow-hidden">
      <AuthBackground3D />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#0F0F14]/90 border border-white/15 p-8 shadow-2xl backdrop-blur-2xl">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </button>

        <h2 className="text-xl font-bold text-white mb-1">Reset Password</h2>
        <p className="text-xs text-white/50 mb-6 font-mono">
          Enter your registered email to receive simulated recovery credentials.
        </p>

        {submitted ? (
          <div className="text-center py-6 space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-white">Reset Link Dispatched</h4>
            <p className="text-xs text-white/60">
              A recovery link has been simulated for <strong className="text-white">{email}</strong>.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="mt-4 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
            >
              Return to Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 font-mono">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="forecaster@example.com"
                  className="w-full bg-[#0A0A0E] border border-white/10 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/60"
                  required
                />
                <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#EF233C] hover:bg-[#d91d34] text-white font-bold text-xs shadow-[0_0_20px_-3px_rgba(239,35,60,0.5)] transition-all"
            >
              Send Reset Link
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
