import React from 'react';
import { useMarket } from '../context/MarketContext';
import { useTrading } from '../context/TradingContext';
import { useSocial } from '../context/SocialContext';
import { HeroGlobe3D } from '../components/3d/HeroGlobe3D';
import { MarketCard } from '../components/markets/MarketCard';
import { 
  Sparkles, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Activity, 
  Radio, 
  Users, 
  Globe2, 
  Flame,
  Award,
  BookOpen
} from 'lucide-react';

interface HomePageProps {
  navigate: (route: string) => void;
  onTradeClick: (market: any, outcome: 'YES' | 'NO') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate, onTradeClick }) => {
  const { markets, trendingMarkets, featuredMarket, lastGlobalUpdate } = useMarket();
  const { posts } = useSocial();

  return (
    <div className="space-y-16 pb-20">
      
      {/* 3D HERO SECTION */}
      <section className="relative min-h-[640px] flex items-center justify-center overflow-hidden pt-8 pb-12 border-b border-white/[0.06]">
        
        {/* Three.js 3D Globe in Background/Right */}
        <div className="absolute inset-y-0 right-0 w-full lg:w-1/2 flex items-center justify-center pointer-events-none opacity-80 lg:opacity-100 z-0">
          <HeroGlobe3D />
        </div>

        {/* Ambient Gradient Background Glows */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#EF233C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#22C55E]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl space-y-6">
            
            {/* Live Indicator Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-xl">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                Live Simulated Markets
              </span>
              <span className="text-white/40 text-xs font-mono">• Updated {lastGlobalUpdate}</span>
            </div>

            {/* EXACT REQUIRED HEADLINE */}
            <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-[1.08]">
              Predict What <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EF233C] via-[#F5F5F5] to-[#22C55E]">
                Happens Next.
              </span>
            </h1>

            {/* EXACT REQUIRED SUPPORTING TEXT */}
            <p className="text-base sm:text-lg text-white/70 leading-relaxed font-normal">
              Explore live event markets, learn from the community, and make informed predictions with OmniMarketX.
            </p>

            {/* EXACT REQUIRED BUTTONS */}
            <div className="flex flex-wrap gap-3 pt-2">
              {/* Button 1: Explore Live Markets */}
              <button
                onClick={() => navigate('/markets')}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#EF233C] to-[#d91d34] hover:opacity-95 text-white font-extrabold text-sm shadow-[0_0_25px_-3px_rgba(239,35,60,0.5)] flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <span>Explore Live Markets</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button 2: Try Demo Trading */}
              <button
                onClick={() => navigate('/portfolio')}
                className="px-6 py-3.5 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/50 text-emerald-400 font-extrabold text-sm shadow-[0_0_20px_-3px_rgba(34,197,94,0.3)] flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4" />
                <span>Try Demo Trading</span>
              </button>

              {/* Button 3: Join the Community */}
              <button
                onClick={() => navigate('/feed')}
                className="px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/90 hover:text-white font-semibold text-sm transition-all cursor-pointer"
              >
                <Users className="w-4 h-4 inline mr-2 text-blue-400" />
                <span>Join the Community</span>
              </button>
            </div>

            {/* Live Trust / Demo Badge */}
            <div className="pt-4 flex items-center gap-4 text-xs font-mono text-white/50">
              <div className="flex items-center gap-1 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>$10,000 Virtual Funds Included</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1 text-white/70">
                <Globe2 className="w-4 h-4 text-blue-400" />
                <span>Verified Oracles</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURED SPOTLIGHT MARKET */}
      {featuredMarket && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-[#EF233C]" />
              <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                Featured Live Event Market
              </h2>
            </div>
            <button
              onClick={() => navigate('/markets')}
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View all 8 active categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="rounded-3xl bg-[#111116] border border-white/10 p-6 md:p-8 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Details & AI Synthesis */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase px-2.5 py-1 rounded bg-white/10 text-white">
                    {featuredMarket.category}
                  </span>
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 animate-pulse" />
                    LIVE Market • Updated {featuredMarket.lastUpdated}
                  </span>
                </div>

                <h3 
                  onClick={() => navigate(`/market/${featuredMarket.id}`)}
                  className="text-2xl sm:text-3xl font-black text-white hover:text-emerald-400 transition-colors cursor-pointer leading-tight"
                >
                  {featuredMarket.title}
                </h3>

                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {featuredMarket.description}
                </p>

                {/* AI Brief Highlights */}
                <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06] text-xs text-white/80 space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Consensus Driver:</span>
                  </div>
                  <p className="text-white/70 text-[11px] leading-relaxed">
                    {featuredMarket.aiBrief.summary}
                  </p>
                </div>

                <div className="flex items-center gap-6 text-xs font-mono text-white/50 pt-2">
                  <div>
                    <span className="text-white/40 block text-[10px]">24h Volume</span>
                    <span className="text-white font-bold">${(featuredMarket.volume24h / 1000).toFixed(0)}k</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Participants</span>
                    <span className="text-white font-bold">{featuredMarket.participantsCount.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">Resolution Oracle</span>
                    <span className="text-white font-bold truncate max-w-[160px] block">{featuredMarket.resolutionSource}</span>
                  </div>
                </div>
              </div>

              {/* Trading Slip Box on Spotlight */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0B0B0E] border border-white/10 space-y-4">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-white/60">Live Implied Odds</span>
                  <span className="text-emerald-400 font-bold">Demo Mode Ready</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onTradeClick(featuredMarket, 'YES')}
                    className="p-4 rounded-xl bg-emerald-950/40 hover:bg-emerald-900/60 border border-emerald-500/40 hover:border-emerald-500/80 text-center transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                      PREDICT YES
                    </span>
                    <span className="text-3xl font-black font-mono text-white group-hover:text-emerald-300">
                      {featuredMarket.yesProbability}%
                    </span>
                    <span className="text-[11px] font-mono text-emerald-400/80 block mt-1">
                      {(featuredMarket.yesProbability / 100).toFixed(2)}¢ / share
                    </span>
                  </button>

                  <button
                    onClick={() => onTradeClick(featuredMarket, 'NO')}
                    className="p-4 rounded-xl bg-red-950/40 hover:bg-red-900/60 border border-[#EF233C]/40 hover:border-[#EF233C]/80 text-center transition-all cursor-pointer group"
                  >
                    <span className="text-xs font-bold text-[#EF233C] uppercase tracking-wider block mb-1">
                      PREDICT NO
                    </span>
                    <span className="text-3xl font-black font-mono text-white group-hover:text-red-300">
                      {featuredMarket.noProbability}%
                    </span>
                    <span className="text-[11px] font-mono text-[#EF233C]/80 block mt-1">
                      {(featuredMarket.noProbability / 100).toFixed(2)}¢ / share
                    </span>
                  </button>
                </div>

                <div className="w-full h-2 bg-black rounded-full overflow-hidden flex">
                  <div
                    style={{ width: `${featuredMarket.yesProbability}%` }}
                    className="bg-emerald-500 h-full shadow-[0_0_10px_#22C55E]"
                  />
                  <div
                    style={{ width: `${featuredMarket.noProbability}%` }}
                    className="bg-[#EF233C] h-full shadow-[0_0_10px_#EF233C]"
                  />
                </div>

                <button
                  onClick={() => navigate(`/market/${featuredMarket.id}`)}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Open Interactive Chart & Discussion</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        </section>
      )}

      {/* TRENDING MARKETS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Trending Prediction Markets</span>
            </h2>
            <p className="text-xs text-white/50 mt-0.5">
              Real-world events with the highest 24h virtual volume and probability velocity.
            </p>
          </div>

          <button
            onClick={() => navigate('/markets')}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition-colors flex items-center gap-1.5"
          >
            <span>View All Markets</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingMarkets.slice(0, 6).map((market) => (
            <MarketCard
              key={market.id}
              market={market}
              onTradeClick={(m, outcome) => onTradeClick(m, outcome)}
              onViewDetails={(id) => navigate(`/market/${id}`)}
            />
          ))}
        </div>
      </section>

      {/* 3-STEP BEGINNER DEMO LEARNING MODE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/20 via-[#101014] to-red-950/20 border border-white/10 p-8">
          <div className="max-w-2xl mb-8">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-400 block mb-1">
              Beginner Learning Mode
            </span>
            <h3 className="text-2xl font-black text-white">
              How Social Prediction Markets Work
            </h3>
            <p className="text-xs text-white/60 mt-1">
              OmniMarketX lets you forecast future events using market probabilities without risking real money.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1 */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center font-bold font-mono">
                01
              </div>
              <h4 className="text-sm font-bold text-white">Prices Reflect Probabilities</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                If YES trades at 71¢, the aggregate market estimate is a 71% likelihood that the event will happen. If correct, each winning share settles at $1.00.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EF233C]/10 text-[#EF233C] flex items-center justify-center font-bold font-mono">
                02
              </div>
              <h4 className="text-sm font-bold text-white">Trade Risk-Free in Demo Mode</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Start with $10,000 in virtual funds. Test hypotheses across Crypto, AI, Sports, and Macro. Sell holdings at any time directly from your portfolio.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center font-bold font-mono">
                03
              </div>
              <h4 className="text-sm font-bold text-white">Share & Learn from Experts</h4>
              <p className="text-xs text-white/60 leading-relaxed">
                Post your trade rationales to the social feed, follow top analysts, and track verified accuracy rankings on the global leaderboard.
              </p>
            </div>

          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.06] flex items-center justify-between flex-wrap gap-4">
            <div className="text-xs text-white/50 font-mono">
              Ready to learn the mechanics of prediction math?
            </div>
            <button
              onClick={() => navigate('/learn')}
              className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <BookOpen className="w-4 h-4" />
              <span>Launch Interactive Tutorial</span>
            </button>
          </div>
        </div>
      </section>

      {/* LIVE COMMUNITY PULSE SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h2 className="text-xl font-bold text-white">Community Predictions & Pulse</h2>
          </div>
          <button
            onClick={() => navigate('/feed')}
            className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
          >
            <span>Open Social Feed</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.slice(0, 2).map((post) => (
            <div key={post.id} className="p-5 rounded-2xl bg-[#0F0F14] border border-white/[0.08] space-y-3">
              <div className="flex items-center gap-2.5">
                <img src={post.author.avatar} alt={post.author.name} className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <span className="text-xs font-bold text-white block">{post.author.name}</span>
                  <span className="text-[10px] text-white/40 font-mono">@{post.author.username} • {post.timestamp}</span>
                </div>
              </div>
              <p className="text-xs text-white/80 line-clamp-2 leading-relaxed">{post.content}</p>
              {post.attachedMarket && (
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.05] text-xs flex items-center justify-between">
                  <span className="text-white/70 font-semibold truncate max-w-[240px]">{post.attachedMarket.title}</span>
                  <span className="font-mono text-emerald-400 font-bold">{post.attachedMarket.yesProbability}% YES</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
