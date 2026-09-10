import React from 'react';
import { useSocial } from '../context/SocialContext';
import { useMarket } from '../context/MarketContext';
import { PostCard } from '../components/social/PostCard';
import { SocialSidebar } from '../components/social/SocialSidebar';
import { PlusCircle, Sparkles, TrendingUp, Users, ShieldAlert } from 'lucide-react';

interface SocialFeedPageProps {
  navigate: (route: string) => void;
  onTradeClick: (market: any, outcome: 'YES' | 'NO') => void;
}

export const SocialFeedPage: React.FC<SocialFeedPageProps> = ({ navigate, onTradeClick }) => {
  const { posts, feedTab, setFeedTab, setIsCreatePostModalOpen, followedUserIds } = useSocial();
  const { markets } = useMarket();

  // Filter posts based on active tab
  const displayedPosts = posts.filter((post) => {
    if (feedTab === 'following') {
      return followedUserIds.includes(post.author.id) || post.author.id === 'usr-current';
    }
    if (feedTab === 'trending') {
      return post.likesCount > 50 || post.repostsCount > 20;
    }
    return true; // For You
  });

  const handleTradeFromPost = (marketId: string, outcome: 'YES' | 'NO') => {
    const target = markets.find((m) => m.id === marketId);
    if (target) {
      onTradeClick(target, outcome);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-2">
            <span>Social Prediction Feed</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 font-mono border border-emerald-500/30">
              Community Live
            </span>
          </h1>
          <p className="text-xs text-white/50 mt-1">
            Follow verified forecasters, analyze trade rationales, and join live prediction debates.
          </p>
        </div>

        <button
          onClick={() => setIsCreatePostModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-[#EF233C] hover:bg-[#d91d34] text-white font-extrabold text-xs shadow-[0_0_20px_-3px_rgba(239,35,60,0.5)] flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Post to Feed</span>
        </button>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Main Vertical Feed (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Feed Tabs: For You, Following, Trending */}
          <div className="flex items-center gap-2 p-1 rounded-2xl bg-[#0F0F14] border border-white/10 font-mono text-xs">
            <button
              onClick={() => setFeedTab('forYou')}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                feedTab === 'forYou'
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              For You
            </button>
            <button
              onClick={() => setFeedTab('following')}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                feedTab === 'following'
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Following ({followedUserIds.length})
            </button>
            <button
              onClick={() => setFeedTab('trending')}
              className={`flex-1 py-2.5 rounded-xl font-bold transition-all ${
                feedTab === 'trending'
                  ? 'bg-white/10 text-white shadow-inner'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              Trending Takes
            </button>
          </div>

          {/* Quick Post Box Trigger */}
          <div
            onClick={() => setIsCreatePostModalOpen(true)}
            className="p-4 rounded-2xl bg-[#0F0F14] border border-white/[0.08] hover:border-white/20 transition-all cursor-pointer flex items-center gap-3 shadow-lg"
          >
            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/50 shrink-0">
              <Sparkles className="w-4 h-4 text-[#EF233C]" />
            </div>
            <span className="text-xs text-white/40 flex-1">
              Have a prediction thesis? Post your rationale with an attached market card...
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-white/5 text-white/70 text-xs font-mono">
              Share
            </span>
          </div>

          {/* Posts List */}
          <div className="space-y-4">
            {displayedPosts.length === 0 ? (
              <div className="p-12 text-center rounded-2xl bg-[#0F0F14] border border-white/10 space-y-3">
                <p className="text-sm font-bold text-white">No posts found in this tab</p>
                <p className="text-xs text-white/50">Follow more experts or switch back to the 'For You' stream.</p>
              </div>
            ) : (
              displayedPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onTradeClick={handleTradeFromPost}
                  onViewMarket={(id) => navigate(`/market/${id}`)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right Sidebar (4 cols) */}
        <div className="lg:col-span-4">
          <div className="sticky top-24">
            <SocialSidebar />
          </div>
        </div>

      </div>

    </div>
  );
};
