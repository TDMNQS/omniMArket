import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthBackground3D } from '../3d/AuthBackground3D';
import { Eye, EyeOff, Sparkles, ArrowRight, Lock, Mail, User } from 'lucide-react';

interface SignupPageProps {
  navigate: (route: string) => void;
}

export const SignupPage: React.FC<SignupPageProps> = ({ navigate }) => {
  const { signup, loginDemoUser } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await signup(name, email, password);
      navigate('/');
    } catch (err) {
      setError('Failed to create account.');
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 overflow-hidden">
      <AuthBackground3D />

      <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#0F0F14]/90 border border-white/15 p-8 shadow-2xl backdrop-blur-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EF233C] to-[#22C55E] p-[1.5px] mb-3 shadow-lg">
            <div className="w-full h-full bg-[#0E0E12] rounded-[14px] flex items-center justify-center font-extrabold text-white text-lg">
              OMX
            </div>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Join OmniMarketX
          </h2>
          <p className="text-xs text-white/50 mt-1 font-mono">
            Get $10,000 in virtual funds to test predictions
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-[#EF233C]/40 text-xs text-red-300">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5 font-mono">
              Display Name / Forecaster Handle
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Elena Rostova"
                className="w-full bg-[#0A0A0E] border border-white/10 rounded-xl px-3.5 py-2.5 pl-10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/60"
              />
              <User className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            </div>
          </div>

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
              />
              <Mail className="w-4 h-4 text-white/40 absolute left-3 top-3" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-white/70 mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
                className="w-full bg-[#0A0A0E] border border-white/10 rounded-xl px-3.5 py-2.5 pl-10 pr-10 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/60"
              />
              <Lock className="w-4 h-4 text-white/40 absolute left-3 top-3" />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-white/40 hover:text-white"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-[0_0_20px_-3px_rgba(34,197,94,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Create Demo Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-white/60">
          Already have an account?{' '}
          <button
            onClick={() => navigate('/login')}
            className="text-emerald-400 font-bold hover:underline"
          >
            Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
