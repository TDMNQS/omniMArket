import React from 'react';
import { useSocial } from '../context/SocialContext';
import { Award, Trophy, ShieldCheck, TrendingUp, Star, Users } from 'lucide-react';

interface LeaderboardPageProps {
  navigate: (route: string) => void;
}

export const LeaderboardPage: React.FC<LeaderboardPageProps> = ({ navigate }) => {
  const { experts, followedUserIds, toggleFollowUser } = useSocial();

  const forecasters = [
    {
      rank: 1,
      name: 'Dr. Aris Thorne',
      handle: '@aris_ai',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      winRate: 91,
      resolvedWins: 142,
      virtualProfits: 48200.00,
      streak: '9 Wins',
      id: 'usr-aris',
      badge: 'Frontier AI Specialist'
    },
    {
      rank: 2,
      name: 'Elena Rostova',
      handle: '@elena_crypto',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      winRate: 88,
      resolvedWins: 128,
      virtualProfits: 39500.00,
      streak: '6 Wins',
      id: 'usr-elena',
      badge: 'Crypto Macro Lead'
    },
    {
      rank: 3,
      name: 'Sarah Chen, CFA',
      handle: '@chen_capital',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      winRate: 84,
      resolvedWins: 109,
      virtualProfits: 31200.00,
      streak: '5 Wins',
      id: 'usr-sarah',
      badge: 'FOMC Analyst'
    },
    {
      rank: 4,
      name: 'Marcus Vance',
      handle: '@vance_macro',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      winRate: 82,
      resolvedWins: 98,
      virtualProfits: 27400.00,
      streak: '4 Wins',
      id: 'usr-vance',
      badge: 'Senior Strategist'
    },
    {
      rank: 5,
      name: 'Alex Rivera',
      handle: '@alex_markets',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
      winRate: 79,
      resolvedWins: 85,
      virtualProfits: 22100.00,
      streak: '3 Wins',
      id: 'usr-alex',
      badge: 'Sports Quant'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/30 flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              RESOLVED ACCURACY RANKINGS
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Forecaster Leaderboard
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Ranked purely on verified prediction resolutions and virtual ROI. No pay-to-win.
          </p>
        </div>

        <div className="text-xs font-mono text-white/60 bg-[#0F0F14] border border-white/10 px-4 py-2 rounded-xl">
          Updated Daily at 00:00 UTC
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {forecasters.slice(0, 3).map((f) => {
          const isFirst = f.rank === 1;
          return (
            <div
              key={f.id}
              className={`p-6 rounded-3xl border relative overflow-hidden flex flex-col justify-between ${
                isFirst
                  ? 'bg-gradient-to-b from-amber-950/30 to-[#0E0E12] border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.15)] order-first md:order-none'
                  : 'bg-[#0E0E12] border-white/10 shadow-xl'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center font-black font-mono text-sm ${
                    f.rank === 1 ? 'bg-amber-400 text-black' : f.rank === 2 ? 'bg-slate-300 text-black' : 'bg-amber-700 text-white'
                  }`}>
                    #{f.rank}
                  </span>
                  <span className="text-[11px] font-mono text-emerald-400 font-bold px-2 py-0.5 rounded bg-emerald-500/10">
                    {f.streak}
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <img src={f.avatar} alt={f.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-white/15" />
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-1">
                      {f.name}
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    </h3>
                    <span className="text-xs text-white/50 font-mono">{f.handle}</span>
                  </div>
                </div>

                <div className="space-y-2 font-mono text-xs pt-3 border-t border-white/[0.08]">
                  <div className="flex justify-between text-white/60">
                    <span>Win Rate:</span>
                    <span className="text-emerald-400 font-bold">{f.winRate}%</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Resolved Wins:</span>
                    <span className="text-white font-bold">{f.resolvedWins}</span>
                  </div>
                  <div className="flex justify-between text-white/60">
                    <span>Virtual Profits:</span>
                    <span className="text-white font-bold">${f.virtualProfits.toLocaleString()} DEMO</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => toggleFollowUser(f.id)}
                className={`mt-5 w-full py-2 rounded-xl text-xs font-bold transition-all ${
                  followedUserIds.includes(f.id)
                    ? 'bg-white/10 text-white/60 hover:bg-red-500/20 hover:text-red-400'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-black'
                }`}
              >
                {followedUserIds.includes(f.id) ? 'Following' : '+ Follow Analyst'}
              </button>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="rounded-2xl bg-[#0E0E12] border border-white/10 overflow-hidden shadow-xl">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-white/10 text-[11px] font-mono text-white/40 bg-white/[0.02]">
              <th className="py-4 px-4">Rank</th>
              <th className="py-4 px-4">Forecaster</th>
              <th className="py-4 px-4">Badge / Domain</th>
              <th className="py-4 px-4">Accuracy Win Rate</th>
              <th className="py-4 px-4">Resolved Wins</th>
              <th className="py-4 px-4">Simulated Profits</th>
              <th className="py-4 px-4 text-right">Community</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.05] font-mono">
            {forecasters.map((f) => {
              const isFollowing = followedUserIds.includes(f.id);
              return (
                <tr key={f.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="py-4 px-4 font-bold text-white text-sm">
                    #{f.rank}
                  </td>
                  <td className="py-4 px-4 font-sans">
                    <div className="flex items-center gap-3">
                      <img src={f.avatar} alt={f.name} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <span className="font-bold text-white block">{f.name}</span>
                        <span className="text-[10px] text-white/40 font-mono">{f.handle}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/70">
                      {f.badge}
                    </span>
                  </td>
                  <td className="py-4 px-4 font-bold text-emerald-400">
                    {f.winRate}%
                  </td>
                  <td className="py-4 px-4 text-white font-semibold">
                    {f.resolvedWins}
                  </td>
                  <td className="py-4 px-4 text-white font-bold">
                    ${f.virtualProfits.toLocaleString()} DEMO
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => toggleFollowUser(f.id)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        isFollowing
                          ? 'bg-white/10 text-white/50 hover:text-red-400'
                          : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-black'
                      }`}
                    >
                      {isFollowing ? 'Following' : 'Follow'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

    </div>
  );
};
