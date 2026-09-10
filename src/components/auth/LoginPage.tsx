import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { AuthBackground3D } from '../3d/AuthBackground3D';
import { Eye, EyeOff, ShieldAlert, Sparkles, ArrowRight, Lock, Mail, CheckCircle2 } from 'lucide-react';

interface LoginPageProps {
  navigate: (route: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ navigate }) => {
  const { login, loginDemoUser } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password.');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickDemoAccess = () => {
    loginDemoUser();
    navigate('/');
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 overflow-hidden">
      {/* 3D Particle Background */}
      <AuthBackground3D />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-[#0F0F14]/90 border border-white/15 p-8 shadow-2xl backdrop-blur-2xl">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#EF233C] to-[#22C55E] p-[1.5px] mb-3 shadow-lg">
            <div className="w-full h-full bg-[#0E0E12] rounded-[14px] flex items-center justify-center font-extrabold text-white text-lg">
              OMX
            </div>
          </div>
          <h2 className="text-2xl font-black text-white tracking-tight">
            Sign In to OmniMarketX
          </h2>
          <p className="text-xs text-white/50 mt-1 font-mono">
            Next-Gen 3D Social Prediction Market
          </p>
        </div>

        {/* 1-Click Instant Demo Button */}
        <div className="mb-6">
          <button
            onClick={handleQuickDemoAccess}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-500 hover:opacity-95 text-black font-extrabold text-xs shadow-[0_0_24px_rgba(34,197,94,0.4)] flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            <Sparkles className="w-4 h-4 fill-black" />
            <span>Instant Demo Mode Access ($10,000 Virtual Funds)</span>
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 border-t border-white/10" />
            <span className="px-3 text-[10px] font-mono uppercase tracking-wider text-white/40">
              Or sign in with email
            </span>
            <div className="flex-1 border-t border-white/10" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          {error && (
            <div className="p-3 rounded-xl bg-red-950/40 border border-[#EF233C]/40 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Email */}
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

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-semibold text-white/70 font-mono">
                Password
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-[11px] text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
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

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#EF233C] hover:bg-[#d91d34] text-white font-bold text-xs shadow-[0_0_20px_-3px_rgba(239,35,60,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isLoading ? (
              <span>Authenticating...</span>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Social Logins Placeholder */}
        <div className="mt-5 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleQuickDemoAccess}
              className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-medium flex items-center justify-center gap-2"
            >
              <span>Google</span>
            </button>
            <button
              onClick={handleQuickDemoAccess}
              className="py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-white font-medium flex items-center justify-center gap-2"
            >
              <span>Web3 Wallet</span>
            </button>
          </div>
        </div>

        {/* Create Account Link */}
        <div className="mt-6 text-center text-xs text-white/60">
          Don't have an account?{' '}
          <button
            onClick={() => navigate('/signup')}
            className="text-emerald-400 font-bold hover:underline"
          >
            Create Free Demo Account
          </button>
        </div>

        {/* Terms and Simulation Notice */}
        <p className="mt-6 text-[10px] text-center text-white/40 font-mono leading-relaxed">
          DEMO MODE — VIRTUAL FUNDS ONLY. By entering, you agree to our Terms of Simulation and Community Guidelines.
        </p>
      </div>
    </div>
  );
};
