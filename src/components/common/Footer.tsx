import React from 'react';
import { ShieldAlert, Activity, Sparkles, HelpCircle, ExternalLink } from 'lucide-react';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  return (
    <footer className="bg-[#08080A] border-t border-white/[0.08] text-white/60 text-xs py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Important Regulatory / Demo Disclaimer Banner */}
        <div className="mb-10 p-4 rounded-xl bg-red-950/20 border border-[#EF233C]/30 flex flex-col md:flex-row items-start md:items-center gap-3">
          <div className="p-2 rounded-lg bg-[#EF233C]/10 text-[#EF233C] shrink-0">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-0.5 flex items-center gap-2">
              <span>DEMO MODE — VIRTUAL FUNDS ONLY</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-red-500/20 text-red-300 font-mono">
                SIMULATION
              </span>
            </h4>
            <p className="text-[11px] text-white/60 leading-relaxed">
              OmniMarketX is a futuristic social prediction-market discovery platform. All trading activities on this platform are conducted strictly using virtual non-monetary demo credits for educational and social forecasting purposes. No real-money wagering, deposits, or guaranteed payouts exist on this platform.
            </p>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Info */}
          <div className="col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#EF233C] to-[#22C55E] p-[1px]">
                <div className="w-full h-full bg-[#0E0E12] rounded-[7px] flex items-center justify-center font-bold text-xs text-white">
                  OMX
                </div>
              </div>
              <span className="font-extrabold text-white text-base tracking-tight">OmniMarketX</span>
            </div>
            <p className="text-xs text-white/50 leading-relaxed max-w-sm">
              The world’s next-generation 3D social prediction market platform. Follow real-world event dynamics, verify oracles, and test your forecasting accuracy in a risk-free demo environment.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              <span>Simulation Engine v2.4 Live</span>
            </div>
          </div>

          {/* Markets */}
          <div>
            <h5 className="text-white font-semibold mb-3">Live Markets</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigate('/markets')} className="hover:text-white transition-colors">All Markets</button></li>
              <li><button onClick={() => navigate('/markets')} className="hover:text-white transition-colors">Crypto & Bitcoin</button></li>
              <li><button onClick={() => navigate('/markets')} className="hover:text-white transition-colors">AI & Robotics</button></li>
              <li><button onClick={() => navigate('/markets')} className="hover:text-white transition-colors">Finance & FOMC</button></li>
              <li><button onClick={() => navigate('/markets')} className="hover:text-white transition-colors">Sports & UCL</button></li>
            </ul>
          </div>

          {/* Social & Community */}
          <div>
            <h5 className="text-white font-semibold mb-3">Community</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigate('/feed')} className="hover:text-white transition-colors">Prediction Feed</button></li>
              <li><button onClick={() => navigate('/leaderboard')} className="hover:text-white transition-colors">Top Forecasters</button></li>
              <li><button onClick={() => navigate('/portfolio')} className="hover:text-white transition-colors">My Positions</button></li>
              <li><button onClick={() => navigate('/learn')} className="hover:text-white transition-colors">Learning Hub</button></li>
            </ul>
          </div>

          {/* Transparency & Rules */}
          <div>
            <h5 className="text-white font-semibold mb-3">Integrity & FAQ</h5>
            <ul className="space-y-2 text-xs">
              <li><button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">Resolution Criteria</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">Oracle Data Sources</button></li>
              <li><button onClick={() => navigate('/faq')} className="hover:text-white transition-colors">Demo Mode Rules</button></li>
              <li><a href="https://www.omnimarketx.com/home" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">Official Reference <ExternalLink className="w-3 h-3" /></a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/40">
          <p>© 2026 OmniMarketX. All rights reserved. Built as a social prediction demo platform.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/faq')}>Terms of Simulation</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/faq')}>Privacy Guidelines</span>
            <span className="hover:text-white cursor-pointer" onClick={() => navigate('/faq')}>Oracle Integrity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
