import React, { useState, useEffect, useRef } from 'react';
import { useMarket } from '../../context/MarketContext';
import { useSocial } from '../../context/SocialContext';
import { Search, X, TrendingUp, ShieldCheck, ArrowRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (route: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  navigate
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { markets } = useMarket();
  const { experts, trendingTags } = useSocial();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  // Keyboard shortcut ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const matchedMarkets = query.trim()
    ? markets.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5)
    : [];

  const matchedExperts = query.trim()
    ? experts.filter((e) =>
        e.name.toLowerCase().includes(query.toLowerCase()) ||
        e.username.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 3)
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#111116] border border-white/15 rounded-2xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Search Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-white/50" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search live event markets, experts, tags (e.g. Bitcoin, AI, FOMC)..."
            className="w-full bg-transparent border-none text-white placeholder-white/40 text-sm focus:outline-none focus:ring-0"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] bg-white/10 text-white/50 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Search Results / Suggestions */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          
          {query.trim() === '' ? (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-2">
                  Trending Prediction Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendingTags.map((item) => (
                    <button
                      key={item.tag}
                      onClick={() => {
                        navigate('/markets');
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 text-xs text-white/70 hover:text-white transition-all flex items-center gap-1.5"
                    >
                      <TrendingUp className="w-3 h-3 text-[#EF233C]" />
                      <span>{item.tag}</span>
                      <span className="text-[10px] text-white/40 font-mono">({item.postsCount})</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-2">
                  Top Featured Markets
                </p>
                <div className="space-y-1.5">
                  {markets.slice(0, 3).map((m) => (
                    <div
                      key={m.id}
                      onClick={() => {
                        navigate(`/market/${m.id}`);
                        onClose();
                      }}
                      className="p-2.5 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-xs px-2 py-0.5 rounded bg-white/10 text-white/70 font-mono">
                          {m.category}
                        </span>
                        <span className="text-xs text-white font-medium truncate">{m.title}</span>
                      </div>
                      <span className="font-mono text-xs font-bold text-emerald-400 shrink-0">
                        {m.yesProbability}% YES
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Markets Found */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-2">
                  Markets ({matchedMarkets.length})
                </p>
                {matchedMarkets.length === 0 ? (
                  <p className="text-xs text-white/40 py-2">No markets match "{query}"</p>
                ) : (
                  <div className="space-y-1.5">
                    {matchedMarkets.map((m) => (
                      <div
                        key={m.id}
                        onClick={() => {
                          navigate(`/market/${m.id}`);
                          onClose();
                        }}
                        className="p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.08] border border-white/5 hover:border-emerald-500/30 transition-all cursor-pointer flex items-center justify-between gap-3"
                      >
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-white/10 text-white/70">
                              {m.category}
                            </span>
                            <span className="text-[11px] text-emerald-400 font-mono">
                              LIVE • Updated {m.lastUpdated}
                            </span>
                          </div>
                          <p className="text-xs text-white font-semibold truncate">{m.title}</p>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <span className="text-xs font-mono font-bold text-emerald-400 block">
                              {m.yesProbability}% YES
                            </span>
                            <span className="text-[10px] font-mono text-white/40">
                              ${(m.volume24h / 1000).toFixed(0)}k vol
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-white/40" />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Experts Found */}
              {matchedExperts.length > 0 && (
                <div>
                  <p className="text-[11px] font-mono uppercase tracking-wider text-white/40 mb-2">
                    Experts ({matchedExperts.length})
                  </p>
                  <div className="space-y-1.5">
                    {matchedExperts.map((exp) => (
                      <div
                        key={exp.id}
                        onClick={() => {
                          navigate('/feed');
                          onClose();
                        }}
                        className="p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 transition-all cursor-pointer flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={exp.avatar}
                            alt={exp.name}
                            className="w-7 h-7 rounded-full object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-semibold text-white">{exp.name}</span>
                              {exp.isVerified && <ShieldCheck className="w-3 h-3 text-emerald-400" />}
                            </div>
                            <span className="text-[10px] text-white/50 font-mono">@{exp.username}</span>
                          </div>
                        </div>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-mono">
                          {exp.badge}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
