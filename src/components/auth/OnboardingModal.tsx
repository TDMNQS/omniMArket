import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocial } from '../../context/SocialContext';
import { Sparkles, Check, ArrowRight, ShieldCheck, DollarSign } from 'lucide-react';

export const OnboardingModal: React.FC = () => {
  const { showOnboardingModal, completeOnboarding } = useAuth();
  const { experts } = useSocial();

  const [step, setStep] = useState<1 | 2>(1);
  const [selectedCats, setSelectedCats] = useState<string[]>(['Crypto', 'AI', 'Finance']);
  const [selectedExperts, setSelectedExperts] = useState<string[]>(['usr-elena', 'usr-aris']);

  if (!showOnboardingModal) return null;

  const categories = [
    'Crypto',
    'AI',
    'Finance',
    'Technology',
    'Sports',
    'Politics',
    'Entertainment',
    'Culture'
  ];

  const toggleCategory = (cat: string) => {
    setSelectedCats((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleExpert = (id: string) => {
    setSelectedExperts((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleFinish = () => {
    completeOnboarding(selectedCats, selectedExperts);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/85 backdrop-blur-md" />

      <div className="relative w-full max-w-lg bg-[#111116] border border-white/15 rounded-3xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95">
        
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
          <div>
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block">
              Step {step} of 2
            </span>
            <h3 className="text-base font-bold text-white">
              {step === 1 ? 'Personalize Market Feeds' : 'Follow Top Verified Experts'}
            </h3>
          </div>
          <div className="flex gap-1">
            <span className={`w-6 h-1.5 rounded-full ${step === 1 ? 'bg-emerald-500' : 'bg-white/20'}`} />
            <span className={`w-6 h-1.5 rounded-full ${step === 2 ? 'bg-emerald-500' : 'bg-white/20'}`} />
          </div>
        </div>

        {step === 1 ? (
          /* Step 1: Categories */
          <div className="space-y-4">
            <p className="text-xs text-white/60">
              Select your favorite prediction domains to calibrate your real-time ticker and social feed.
            </p>

            <div className="grid grid-cols-2 gap-2.5">
              {categories.map((cat) => {
                const isSelected = selectedCats.includes(cat);
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => toggleCategory(cat)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]'
                        : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                    }`}
                  >
                    <span>{cat}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-xs flex items-center gap-1.5 shadow-lg"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          /* Step 2: Follow Experts */
          <div className="space-y-4">
            <p className="text-xs text-white/60">
              Follow top forecasters to see their live trade rationales in your social feed.
            </p>

            <div className="space-y-2.5 max-h-60 overflow-y-auto">
              {experts.map((exp) => {
                const isSelected = selectedExperts.includes(exp.id);
                return (
                  <div
                    key={exp.id}
                    onClick={() => toggleExpert(exp.id)}
                    className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-950/30 border-emerald-500/50'
                        : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={exp.avatar}
                        alt={exp.name}
                        className="w-9 h-9 rounded-full object-cover"
                      />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-white">{exp.name}</span>
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        </div>
                        <span className="text-[10px] text-white/50 font-mono block">
                          {exp.badge}
                        </span>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${
                      isSelected ? 'bg-emerald-500 border-emerald-500 text-black' : 'border-white/20 text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Claim Demo Funds Note */}
            <div className="p-3 rounded-xl bg-gradient-to-r from-emerald-950/30 to-black border border-emerald-500/30 flex items-center gap-2.5 text-xs text-emerald-400 font-mono">
              <DollarSign className="w-4 h-4" />
              <span>$10,000 Virtual Demo Balance is ready in your account.</span>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-white/50 hover:text-white"
              >
                Back
              </button>

              <button
                type="button"
                onClick={handleFinish}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#EF233C] to-red-600 text-white font-bold text-xs shadow-[0_0_20px_rgba(239,35,60,0.5)] flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                <span>Enter OmniMarketX</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
