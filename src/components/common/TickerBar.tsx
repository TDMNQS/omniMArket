import React from 'react';
import { useMarket } from '../../context/MarketContext';
import { TrendingUp, TrendingDown, Radio } from 'lucide-react';

export const TickerBar: React.FC = () => {
  const { markets, lastGlobalUpdate } = useMarket();

  // Pick top 6 markets for the marquee
  const tickerItems = markets.slice(0, 7);

  return (
    <div className="bg-[#08080A] border-b border-white/[0.06] text-xs py-1.5 px-4 overflow-hidden select-none flex items-center justify-between relative z-40">
      <div className="flex items-center gap-2 pr-4 shrink-0 border-r border-white/10 text-emerald-400 font-semibold uppercase tracking-wider">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <span className="hidden sm:inline">LIVE MARKETS</span>
      </div>

      <div className="flex-1 overflow-hidden relative mx-2">
        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {tickerItems.concat(tickerItems).map((m, idx) => (
            <div key={`${m.id}-${idx}`} className="flex items-center gap-2.5 hover:text-white transition-colors cursor-pointer">
              <span className="text-white/60 font-medium">{m.category}:</span>
              <span className="text-white font-medium max-w-[200px] truncate">{m.title}</span>
              <span className="font-mono font-bold text-emerald-400">{m.yesProbability}% YES</span>
              <span className={`flex items-center text-[11px] font-mono ${m.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {m.change24h >= 0 ? (
                  <TrendingUp className="w-3 h-3 mr-0.5 inline" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-0.5 inline" />
                )}
                {m.change24h >= 0 ? `+${m.change24h}%` : `${m.change24h}%`}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 pl-4 shrink-0 border-l border-white/10 text-white/50 text-[11px]">
        <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
        <span>Updated {lastGlobalUpdate}</span>
      </div>
    </div>
  );
};
