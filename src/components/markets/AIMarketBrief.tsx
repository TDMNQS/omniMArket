import React from 'react';
import { Market } from '../../types/market';
import { Sparkles, ShieldCheck, AlertCircle, ExternalLink, Activity } from 'lucide-react';

interface AIMarketBriefProps {
  market: Market;
}

export const AIMarketBrief: React.FC<AIMarketBriefProps> = ({ market }) => {
  const { aiBrief } = market;

  return (
    <div className="space-y-6">
      {/* AI Market Synthesis Card */}
      <div className="rounded-2xl bg-gradient-to-br from-[#121218] via-[#0E0E12] to-[#121218] border border-white/10 p-5 shadow-xl relative overflow-hidden">
        
        {/* Glowing Ambient Corner Accent */}
        <div className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-[#EF233C]/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-32 h-32 rounded-full bg-[#22C55E]/10 blur-2xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                AI Market Brief & Synthesis
              </h4>
              <span className="text-[10px] text-white/50 font-mono">
                Model: OMX-Intelligence Core • Verified Data Sources
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Real-time
          </span>
        </div>

        {/* Executive Summary */}
        <p className="text-xs text-white/80 leading-relaxed mb-4">
          {aiBrief.summary}
        </p>

        {/* Drivers & Risks Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          
          {/* Key Drivers */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <h5 className="text-[11px] font-bold text-emerald-400 mb-2 flex items-center gap-1.5 font-mono uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Primary Catalysts</span>
            </h5>
            <ul className="space-y-1.5 text-[11px] text-white/70">
              {aiBrief.keyDrivers.map((driver, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-400 font-bold">•</span>
                  <span>{driver}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Risk Factors */}
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
            <h5 className="text-[11px] font-bold text-[#EF233C] mb-2 flex items-center gap-1.5 font-mono uppercase">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Downside Risks</span>
            </h5>
            <ul className="space-y-1.5 text-[11px] text-white/70">
              {aiBrief.riskFactors.map((risk, idx) => (
                <li key={idx} className="flex items-start gap-1.5">
                  <span className="text-[#EF233C] font-bold">•</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Verified Data Sources */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-2 text-[11px] font-mono">
          <span className="text-white/40">Verified Sources:</span>
          <div className="flex items-center gap-3 flex-wrap">
            {aiBrief.sources.map((src, idx) => (
              <a
                key={idx}
                href={src.url}
                target="_blank"
                rel="noreferrer"
                className="text-white/70 hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <span>{src.name}</span>
                <ExternalLink className="w-3 h-3 text-white/40" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Community Pulse & Sentiment Meter */}
      <div className="rounded-2xl bg-[#0E0E12] border border-white/10 p-4 shadow-lg">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-white">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span>Community Pulse Sentiment</span>
          </div>
          <span className="text-xs font-mono font-bold text-emerald-400">
            {aiBrief.sentimentBullish}% Bullish
          </span>
        </div>

        {/* Bar */}
        <div className="w-full h-2.5 bg-[#16161A] rounded-full overflow-hidden flex mb-2">
          <div
            style={{ width: `${aiBrief.sentimentBullish}%` }}
            className="bg-emerald-500 h-full transition-all duration-700"
          />
          <div
            style={{ width: `${100 - aiBrief.sentimentBullish}%` }}
            className="bg-[#EF233C] h-full transition-all duration-700"
          />
        </div>

        <div className="flex justify-between text-[10px] font-mono text-white/50">
          <span className="text-emerald-400">
            {aiBrief.sentimentBullish}% Predict YES
          </span>
          <span className="text-[#EF233C]">
            {100 - aiBrief.sentimentBullish}% Predict NO
          </span>
        </div>
      </div>
    </div>
  );
};
