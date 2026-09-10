import React, { useState } from 'react';
import { useMarket } from '../context/MarketContext';
import { useTrading } from '../context/TradingContext';
import { useSocial } from '../context/SocialContext';
import { MarketChart } from '../components/markets/MarketChart';
import { AIMarketBrief } from '../components/markets/AIMarketBrief';
import { PostCard } from '../components/social/PostCard';
import { 
  Radio, 
  Star, 
  ExternalLink, 
  ShieldAlert, 
  Calendar, 
  Users, 
  BarChart3, 
  ShieldCheck, 
  AlertCircle, 
  ArrowLeft,
  Share2,
  Zap,
  MessageSquare
} from 'lucide-react';

interface MarketDetailPageProps {
  marketId: string;
  navigate: (route: string) => void;
  onTradeClick: (market: any, outcome: 'YES' | 'NO') => void;
}

export const MarketDetailPage: React.FC<MarketDetailPageProps> = ({
  marketId,
  navigate,
  onTradeClick
}) => {
  const { getMarketById, toggleWatchlist, watchlist, markets } = useMarket();
  const { posts } = useSocial();

  const market = getMarketById(marketId);
  const [activeTab, setActiveTab] = useState<'chart' | 'brief' | 'rules' | 'experts' | 'social'>('chart');

  if (!market) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-bold text-white">Market Not Found</h2>
        <p className="text-xs text-white/50">The requested event market could not be located.</p>
        <button
          onClick={() => navigate('/markets')}
          className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-bold text-xs"
        >
          Return to Markets
        </button>
      </div>
    );
  }

  const isWatchlisted = watchlist.includes(market.id);
  const relatedMarkets = markets.filter((m) => m.id !== market.id && m.category === market.category).slice(0, 2);
  const marketPosts = posts.filter((p) => p.attachedMarket?.id === market.id);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Back Button & Category Path */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/markets')}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Live Markets</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => toggleWatchlist(market.id)}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-amber-400 transition-colors"
            title="Toggle Watchlist"
          >
            <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-400 text-amber-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Grid: Left Details & Chart, Right Trade Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Card */}
          <div className="p-6 rounded-3xl bg-[#0F0F14] border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-mono font-bold uppercase px-2.5 py-0.5 rounded bg-white/10 text-white/80">
                {market.category}
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                {market.status} • Updated {market.lastUpdated}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              {market.title}
            </h1>

            <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
              {market.description}
            </p>

            {/* Quick Stat Chips */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/[0.08] text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-white/40 block text-[10px]">24h Volume</span>
                <span className="text-white font-bold">${(market.volume24h / 1000).toFixed(0)}k</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-white/40 block text-[10px]">Closing Date</span>
                <span className="text-white font-bold">{market.closingDate}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-white/40 block text-[10px]">Participants</span>
                <span className="text-white font-bold">{market.participantsCount.toLocaleString()}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                <span className="text-white/40 block text-[10px]">Liquidity</span>
                <span className="text-emerald-400 font-bold">${(market.liquidity / 1000).toFixed(0)}k</span>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-white/10 pb-2 overflow-x-auto scrollbar-none text-xs font-semibold">
            {[
              { id: 'chart', label: 'Interactive Probability Chart' },
              { id: 'brief', label: 'AI Market Brief' },
              { id: 'rules', label: 'Resolution & Oracle Rules' },
              { id: 'experts', label: `Expert Opinions (${market.expertOpinions.length})` },
              { id: 'social', label: 'Market Discussions' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-bold'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content Panes */}
          <div>
            {activeTab === 'chart' && (
              <div className="p-6 rounded-3xl bg-[#0F0F14] border border-white/10 shadow-xl">
                <MarketChart chartHistory={market.chartHistory} />
              </div>
            )}

            {activeTab === 'brief' && (
              <AIMarketBrief market={market} />
            )}

            {activeTab === 'rules' && (
              <div className="p-6 rounded-3xl bg-[#0F0F14] border border-white/10 space-y-6 shadow-xl text-xs">
                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Resolution Criteria</span>
                  </h4>
                  <p className="text-white/80 leading-relaxed bg-[#0A0A0E] p-4 rounded-xl border border-white/[0.06]">
                    {market.resolutionCriteria}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <ExternalLink className="w-4 h-4 text-blue-400" />
                    <span>Resolution Source & Oracle</span>
                  </h4>
                  <div className="bg-[#0A0A0E] p-4 rounded-xl border border-white/[0.06] flex items-center justify-between">
                    <div>
                      <p className="text-white font-semibold">{market.resolutionSource}</p>
                      <span className="text-[11px] text-white/40 font-mono">{market.resolutionSourceUrl}</span>
                    </div>
                    <a
                      href={market.resolutionSourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-mono transition-colors"
                    >
                      Verify Oracle
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#EF233C] mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-[#EF233C]" />
                    <span>Excluded Conditions & Anomalies</span>
                  </h4>
                  <p className="text-white/70 leading-relaxed bg-[#0A0A0E] p-4 rounded-xl border border-white/[0.06]">
                    {market.excludedConditions}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'experts' && (
              <div className="space-y-4">
                {market.expertOpinions.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#0F0F14] border border-white/10 text-white/40 text-xs">
                    No verified analyst reports filed yet for this specific market.
                  </div>
                ) : (
                  market.expertOpinions.map((exp) => (
                    <div key={exp.id} className="p-5 rounded-2xl bg-[#0F0F14] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <img src={exp.avatar} alt={exp.name} className="w-8 h-8 rounded-full object-cover" />
                          <div>
                            <span className="text-xs font-bold text-white block">{exp.name}</span>
                            <span className="text-[10px] text-white/40 font-mono">{exp.handle} • {exp.timestamp}</span>
                          </div>
                        </div>
                        <span className={`px-2.5 py-0.5 rounded text-xs font-bold font-mono ${
                          exp.stance === 'YES' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-[#EF233C]'
                        }`}>
                          STANCE: {exp.stance} ({exp.probabilityEstimate}%)
                        </span>
                      </div>
                      <p className="text-xs text-white/80 leading-relaxed">{exp.rationale}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'social' && (
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#0F0F14] border border-white/10 flex items-center justify-between">
                  <span className="text-xs text-white/60">
                    Community predictions and arguments for this event
                  </span>
                  <button
                    onClick={() => onTradeClick(market, 'YES')}
                    className="px-3 py-1.5 rounded-xl bg-[#EF233C] text-white font-bold text-xs"
                  >
                    Post Analysis
                  </button>
                </div>

                {marketPosts.length === 0 ? (
                  <div className="p-8 text-center rounded-2xl bg-[#0F0F14] border border-white/10 text-white/40 text-xs">
                    No public community posts for this market yet. Be the first to place a demo trade and share!
                  </div>
                ) : (
                  marketPosts.map((p) => (
                    <PostCard
                      key={p.id}
                      post={p}
                      onTradeClick={(id, outcome) => onTradeClick(market, outcome)}
                      onViewMarket={() => {}}
                    />
                  ))
                )}
              </div>
            )}
          </div>

          {/* Related Markets */}
          {relatedMarkets.length > 0 && (
            <div className="pt-6 border-t border-white/10 space-y-3">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Related Markets in {market.category}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedMarkets.map((rm) => (
                  <div
                    key={rm.id}
                    onClick={() => navigate(`/market/${rm.id}`)}
                    className="p-4 rounded-2xl bg-[#0F0F14] border border-white/10 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span className="text-xs text-white font-bold line-clamp-1 mr-2">{rm.title}</span>
                    <span className="text-xs font-mono font-bold text-emerald-400 shrink-0">{rm.yesProbability}% YES</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right Column (4 cols) - Sticky Demo Trade Panel */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 rounded-3xl bg-[#0F0F14] border border-white/10 p-6 shadow-2xl space-y-5">
            
            {/* Regulatory Notice */}
            <div className="p-3 rounded-xl bg-red-950/30 border border-[#EF233C]/30 text-[11px] font-mono text-[#EF233C] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>DEMO MODE — VIRTUAL FUNDS ONLY</span>
            </div>

            <h3 className="text-base font-bold text-white">
              Instant Demo Prediction
            </h3>

            {/* Odds Split */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => onTradeClick(market, 'YES')}
                className="p-4 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-500 text-center transition-all cursor-pointer group"
              >
                <span className="text-xs font-bold text-emerald-400 block mb-1">YES</span>
                <span className="text-2xl font-black font-mono text-white group-hover:text-emerald-300">
                  {market.yesProbability}%
                </span>
                <span className="text-[10px] font-mono text-white/50 block mt-1">
                  ${(market.yesProbability / 100).toFixed(2)}
                </span>
              </button>

              <button
                onClick={() => onTradeClick(market, 'NO')}
                className="p-4 rounded-2xl bg-red-950/40 hover:bg-red-900/60 border border-[#EF233C]/40 hover:border-[#EF233C] text-center transition-all cursor-pointer group"
              >
                <span className="text-xs font-bold text-[#EF233C] block mb-1">NO</span>
                <span className="text-2xl font-black font-mono text-white group-hover:text-red-300">
                  {market.noProbability}%
                </span>
                <span className="text-[10px] font-mono text-white/50 block mt-1">
                  ${(market.noProbability / 100).toFixed(2)}
                </span>
              </button>
            </div>

            {/* Trade Action Button */}
            <button
              onClick={() => onTradeClick(market, 'YES')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#EF233C] to-[#d91d34] text-white font-extrabold text-xs shadow-[0_0_20px_-3px_rgba(239,35,60,0.5)] flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer"
            >
              <Zap className="w-4 h-4" />
              <span>Configure Demo Order Slip</span>
            </button>

            <div className="pt-2 border-t border-white/10 text-[11px] font-mono text-white/50 space-y-1.5">
              <div className="flex justify-between">
                <span>Oracle Resolution:</span>
                <span className="text-white font-semibold">Automated</span>
              </div>
              <div className="flex justify-between">
                <span>Simulated Fee:</span>
                <span className="text-emerald-400">$0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Winning Payout:</span>
                <span className="text-white">$1.00 / share</span>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
