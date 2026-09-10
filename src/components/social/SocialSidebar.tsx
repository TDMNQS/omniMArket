import React from 'react';
import { useSocial } from '../../context/SocialContext';
import { TrendingUp, ShieldCheck, Award, Info, Sparkles } from 'lucide-react';

export const SocialSidebar: React.FC = () => {
  const { experts, trendingTags, followedUserIds, toggleFollowUser } = useSocial();

  return (
    <div className="space-y-6">
      
      {/* Top Experts to Follow */}
      <div className="rounded-2xl bg-[#0F0F14] border border-white/[0.08] p-5 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Top Market Analysts</span>
          </h4>
          <span className="text-[10px] text-white/40 font-mono">Ranked</span>
        </div>

        <div className="space-y-3.5">
          {experts.slice(0, 4).map((expert) => {
            const isFollowing = followedUserIds.includes(expert.id);

            return (
              <div key={expert.id} className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <img
                    src={expert.avatar}
                    alt={expert.name}
                    className="w-8 h-8 rounded-full object-cover ring-1 ring-white/10"
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-bold text-white truncate">{expert.name}</span>
                      {expert.isVerified && <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />}
                    </div>
                    <span className="text-[10px] text-white/40 font-mono block truncate">
                      {expert.badge}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleFollowUser(expert.id)}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all shrink-0 cursor-pointer ${
                    isFollowing
                      ? 'bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_8px_rgba(34,197,94,0.3)]'
                  }`}
                >
                  {isFollowing ? 'Following' : '+ Follow'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Trending Hashtags */}
      <div className="rounded-2xl bg-[#0F0F14] border border-white/[0.08] p-5 shadow-xl">
        <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-3 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-[#EF233C]" />
          <span>Trending Catalysts</span>
        </h4>

        <div className="space-y-2.5">
          {trendingTags.map((item) => (
            <div
              key={item.tag}
              className="flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04] transition-colors cursor-pointer group"
            >
              <div>
                <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-400 transition-colors">
                  {item.tag}
                </span>
                <span className="text-[10px] text-white/40 block font-mono">Prediction Market</span>
              </div>
              <span className="text-[11px] font-mono text-white/40 group-hover:text-white/70">
                {item.postsCount} posts
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Community Transparency Box */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-[#121218] to-[#0A0A0C] border border-white/10 text-xs text-white/60 space-y-2">
        <div className="flex items-center gap-2 text-white font-bold">
          <Info className="w-4 h-4 text-blue-400" />
          <span>Community Forecaster Rules</span>
        </div>
        <p className="text-[11px] leading-relaxed text-white/50">
          Rankings on OmniMarketX are computed strictly from resolved prediction accuracy and virtual return multipliers. Never trade with real funds.
        </p>
      </div>

    </div>
  );
};
