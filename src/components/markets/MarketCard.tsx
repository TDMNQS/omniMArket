import React, { useState } from 'react';
import { Market } from '../../types/market';
import { useMarket } from '../../context/MarketContext';
import { Star, TrendingUp, TrendingDown, Radio, ExternalLink, Zap } from 'lucide-react';

interface MarketCardProps {
  market: Market;
  onTradeClick: (market: Market, outcome: 'YES' | 'NO') => void;
  onViewDetails: (marketId: string) => void;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  market,
  onTradeClick,
  onViewDetails
}) => {
  const { watchlist, toggleWatchlist } = useMarket();
  const isWatchlisted = watchlist.includes(market.id);

  // Subtle 3D Card Tilt State
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`
      }}
      className="group relative flex flex-col justify-between rounded-2xl bg-[#111115]/90 border border-white/[0.08] hover:border-white/20 p-5 backdrop-blur-xl shadow-xl transition-all duration-200 hover:shadow-[0_12px_32px_rgba(0,0,0,0.5)]"
    >
      {/* Top Meta Bar */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/80">
              {market.category}
            </span>
            
            {market.status === 'Active' && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                LIVE
              </span>
            )}

            {market.status === 'Closing Soon' && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30">
                Closing Soon
              </span>
            )}

            {market.status === 'Resolved' && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30">
                Resolved
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWatchlist(market.id);
            }}
            className="p-1 text-white/30 hover:text-amber-400 transition-colors"
            title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
          >
            <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>

        {/* Title */}
        <h3
          onClick={() => onViewDetails(market.id)}
          className="text-sm font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer line-clamp-2 leading-snug mb-2"
        >
          {market.title}
        </h3>

        {/* Resolution Source Tag */}
        <div className="flex items-center gap-1.5 text-[11px] text-white/50 mb-4 truncate font-mono">
          <span>Source:</span>
          <span className="text-white/70 truncate">{market.resolutionSource}</span>
        </div>
      </div>

      {/* Probabilities & Live Odds Section */}
      <div>
        <div className="grid grid-cols-2 gap-2 mb-3">
          {/* YES Button / Odds */}
          <button
            onClick={() => onTradeClick(market, 'YES')}
            className="group/yes flex flex-col items-center justify-center p-2.5 rounded-xl bg-emerald-950/20 hover:bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-500/70 transition-all cursor-pointer"
          >
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5 flex items-center gap-1">
              <span>YES</span>
              <Zap className="w-3 h-3 group-hover/yes:scale-110 transition-transform" />
            </span>
            <span className="font-mono text-xl font-extrabold text-white group-hover/yes:text-emerald-300">
              {market.yesProbability}%
            </span>
            <span className="text-[10px] text-emerald-400/80 font-mono">
              {(market.yesProbability / 100).toFixed(2)}¢
            </span>
          </button>

          {/* NO Button / Odds */}
          <button
            onClick={() => onTradeClick(market, 'NO')}
            className="group/no flex flex-col items-center justify-center p-2.5 rounded-xl bg-red-950/20 hover:bg-red-950/40 border border-[#EF233C]/30 hover:border-[#EF233C]/70 transition-all cursor-pointer"
          >
            <span className="text-[11px] font-bold text-[#EF233C] uppercase tracking-wider mb-0.5">
              NO
            </span>
            <span className="font-mono text-xl font-extrabold text-white group-hover/no:text-red-300">
              {market.noProbability}%
            </span>
            <span className="text-[10px] text-[#EF233C]/80 font-mono">
              {(market.noProbability / 100).toFixed(2)}¢
            </span>
          </button>
        </div>

        {/* Probability Dual Bar */}
        <div className="w-full h-1.5 bg-black rounded-full overflow-hidden flex mb-3">
          <div
            style={{ width: `${market.yesProbability}%` }}
            className="bg-emerald-500 h-full transition-all duration-500 shadow-[0_0_8px_#22C55E]"
          />
          <div
            style={{ width: `${market.noProbability}%` }}
            className="bg-[#EF233C] h-full transition-all duration-500 shadow-[0_0_8px_#EF233C]"
          />
        </div>

        {/* Card Footer Metrics */}
        <div className="flex items-center justify-between text-[11px] text-white/50 pt-2 border-t border-white/[0.06] font-mono">
          <div className="flex items-center gap-1.5">
            <span className="text-white/40">24h Vol:</span>
            <span className="text-white/80 font-bold">
              ${(market.volume24h / 1000).toLocaleString('en-US', { maximumFractionDigits: 0 })}k
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className={`flex items-center font-bold ${market.change24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {market.change24h >= 0 ? <TrendingUp className="w-3 h-3 mr-0.5" /> : <TrendingDown className="w-3 h-3 mr-0.5" />}
              {market.change24h >= 0 ? `+${market.change24h}%` : `${market.change24h}%`}
            </span>
            <button
              onClick={() => onViewDetails(market.id)}
              className="text-white/60 hover:text-white transition-colors"
              title="View full market details"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
