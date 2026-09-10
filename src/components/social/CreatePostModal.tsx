import React, { useState, useEffect } from 'react';
import { useSocial } from '../../context/SocialContext';
import { useMarket } from '../../context/MarketContext';
import { AttachedMarket } from '../../types/social';
import { X, Send, Paperclip, Hash, Sparkles, Zap, ShieldCheck } from 'lucide-react';

export const CreatePostModal: React.FC = () => {
  const {
    isCreatePostModalOpen,
    setIsCreatePostModalOpen,
    createPost,
    preselectedMarketForPost,
    setPreselectedMarketForPost
  } = useSocial();

  const { markets } = useMarket();

  const [content, setContent] = useState('');
  const [selectedMarketId, setSelectedMarketId] = useState<string>('');
  const [stance, setStance] = useState<'YES' | 'NO'>('YES');
  const [hashtags, setHashtags] = useState<string[]>(['#OmniMarketX']);

  useEffect(() => {
    if (preselectedMarketForPost) {
      setSelectedMarketId(preselectedMarketForPost.id);
      if (preselectedMarketForPost.userStance) {
        setStance(preselectedMarketForPost.userStance);
      }
      if (!content) {
        setContent(`Placed a simulated demo prediction on "${preselectedMarketForPost.title}"! Backing ${preselectedMarketForPost.userStance || 'YES'} based on current market catalysts.`);
      }
    }
  }, [preselectedMarketForPost]);

  if (!isCreatePostModalOpen) return null;

  const handleClose = () => {
    setIsCreatePostModalOpen(false);
    setPreselectedMarketForPost(null);
    setContent('');
    setSelectedMarketId('');
  };

  const handleAddHashtag = (tag: string) => {
    if (!hashtags.includes(tag)) {
      setHashtags([...hashtags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    let attached: AttachedMarket | undefined = undefined;
    if (selectedMarketId) {
      const m = markets.find((item) => item.id === selectedMarketId);
      if (m) {
        attached = {
          id: m.id,
          title: m.title,
          category: m.category,
          yesProbability: m.yesProbability,
          noProbability: m.noProbability,
          userStance: stance,
          userEntryPrice: stance === 'YES' ? Number((m.yesProbability / 100).toFixed(2)) : Number((m.noProbability / 100).toFixed(2))
        };
      }
    }

    createPost(content.trim(), hashtags, attached);
    handleClose();
  };

  const selectedMarket = markets.find((m) => m.id === selectedMarketId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-[#111116] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-[#EF233C]/10 text-[#EF233C]">
              <Sparkles className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Share Prediction to Community</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/5"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          
          {/* Post Content Input */}
          <div>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What is your prediction rationale? Cite live events, key catalysts, or probability mispricings..."
              className="w-full bg-[#0C0C10] border border-white/10 rounded-2xl p-3.5 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 resize-none leading-relaxed"
            />
            <div className="flex justify-between items-center text-[11px] text-white/40 mt-1 font-mono">
              <span>Supports markdown and community tags</span>
              <span>{content.length}/500</span>
            </div>
          </div>

          {/* Attach Market Picker */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
              <Paperclip className="w-3.5 h-3.5 text-emerald-400" />
              <span>Attach Live Market (Optional)</span>
            </label>

            <select
              value={selectedMarketId}
              onChange={(e) => setSelectedMarketId(e.target.value)}
              className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-emerald-500/50"
            >
              <option value="">-- None (Standard Discussion Post) --</option>
              {markets.map((m) => (
                <option key={m.id} value={m.id}>
                  [{m.category}] {m.title} ({m.yesProbability}% YES)
                </option>
              ))}
            </select>

            {/* Selected Market Stance Selector */}
            {selectedMarket && (
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                <span className="text-xs text-white/70 font-medium truncate">
                  Your Stance on this Market:
                </span>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setStance('YES')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                      stance === 'YES'
                        ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    YES ({selectedMarket.yesProbability}%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setStance('NO')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold font-mono transition-all ${
                      stance === 'NO'
                        ? 'bg-[#EF233C] text-white shadow-[0_0_10px_rgba(239,35,60,0.5)]'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    NO ({selectedMarket.noProbability}%)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Quick Hashtags */}
          <div>
            <div className="flex items-center gap-1.5 text-xs text-white/60 mb-1.5">
              <Hash className="w-3.5 h-3.5 text-blue-400" />
              <span>Add Quick Tags:</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {['#Bitcoin120k', '#ARCAGI', '#FedRateCut', '#SpaceX', '#DemoTrading'].map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => handleAddHashtag(tag)}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    hashtags.includes(tag)
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                      : 'bg-white/5 text-white/50 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-[10px] text-white/40 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              Community Guidelines Apply
            </span>

            <button
              type="submit"
              disabled={!content.trim()}
              className="px-5 py-2.5 rounded-xl bg-[#EF233C] hover:bg-[#d91d34] text-white text-xs font-bold shadow-[0_0_15px_-3px_rgba(239,35,60,0.5)] flex items-center gap-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Post to Feed</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
