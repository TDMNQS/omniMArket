import React, { useState } from 'react';
import { SocialPost } from '../../types/social';
import { useSocial } from '../../context/SocialContext';
import { 
  Heart, 
  MessageCircle, 
  Repeat, 
  Bookmark, 
  Share2, 
  ShieldCheck, 
  Send,
  Zap,
  CheckCircle2,
  TrendingUp,
  ExternalLink
} from 'lucide-react';

interface PostCardProps {
  post: SocialPost;
  onTradeClick: (marketId: string, outcome: 'YES' | 'NO') => void;
  onViewMarket: (marketId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  onTradeClick,
  onViewMarket
}) => {
  const { toggleLike, toggleRepost, toggleBookmark, addComment, votePoll, followedUserIds, toggleFollowUser } = useSocial();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');

  const isFollowing = followedUserIds.includes(post.author.id);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(post.id, commentText);
    setCommentText('');
  };

  return (
    <div className="rounded-2xl bg-[#0F0F14] border border-white/[0.08] hover:border-white/15 p-5 shadow-xl transition-all">
      
      {/* Post Author Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white/10"
          />
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-sm text-white">{post.author.name}</span>
              {post.author.isVerified && (
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </div>
            <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
              <span>@{post.author.username}</span>
              <span>•</span>
              <span>{post.timestamp}</span>
            </div>
          </div>
        </div>

        {/* Follow / Badge */}
        <div className="flex items-center gap-2">
          {post.author.badge && (
            <span className="hidden sm:inline-block text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 text-emerald-400 border border-emerald-500/20">
              {post.author.badge}
            </span>
          )}

          {post.author.id !== 'usr-current' && (
            <button
              onClick={() => toggleFollowUser(post.author.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                isFollowing
                  ? 'bg-white/10 text-white/70 hover:bg-red-500/20 hover:text-red-400 border border-white/10'
                  : 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_10px_rgba(34,197,94,0.4)]'
              }`}
            >
              {isFollowing ? 'Following' : '+ Follow'}
            </button>
          )}
        </div>
      </div>

      {/* Post Text Content */}
      <p className="text-sm text-white/90 leading-relaxed mb-3 whitespace-pre-line">
        {post.content}
      </p>

      {/* Hashtags */}
      {post.hashtags && post.hashtags.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {post.hashtags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-emerald-400/80 hover:text-emerald-300 cursor-pointer">
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Attached Market Embed Card */}
      {post.attachedMarket && (
        <div className="mb-4 p-4 rounded-xl bg-[#09090C] border border-white/10 hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
              {post.attachedMarket.category}
            </span>
            {post.attachedMarket.userStance && (
              <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded flex items-center gap-1 ${
                post.attachedMarket.userStance === 'YES'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-500/20 text-[#EF233C] border border-[#EF233C]/30'
              }`}>
                <span>STANCE: {post.attachedMarket.userStance}</span>
                {post.attachedMarket.userEntryPrice && (
                  <span>@ ${post.attachedMarket.userEntryPrice.toFixed(2)}</span>
                )}
              </span>
            )}
          </div>

          <h4 
            onClick={() => onViewMarket(post.attachedMarket!.id)}
            className="text-xs font-bold text-white hover:text-emerald-400 transition-colors cursor-pointer mb-2.5 line-clamp-2"
          >
            {post.attachedMarket.title}
          </h4>

          {/* Quick Odds Bar */}
          <div className="flex items-center justify-between gap-3 text-xs font-mono mb-2">
            <span className="font-bold text-emerald-400">
              {post.attachedMarket.yesProbability}% YES
            </span>
            <div className="flex-1 h-1.5 bg-black rounded-full overflow-hidden flex mx-2">
              <div
                style={{ width: `${post.attachedMarket.yesProbability}%` }}
                className="bg-emerald-500 h-full"
              />
              <div
                style={{ width: `${post.attachedMarket.noProbability}%` }}
                className="bg-[#EF233C] h-full"
              />
            </div>
            <span className="font-bold text-[#EF233C]">
              {post.attachedMarket.noProbability}% NO
            </span>
          </div>

          {/* Trade CTA button inside embed */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/[0.05]">
            <button
              onClick={() => onTradeClick(post.attachedMarket!.id, 'YES')}
              className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold font-mono transition-all flex items-center gap-1"
            >
              <Zap className="w-3 h-3" />
              <span>Predict YES</span>
            </button>
            <button
              onClick={() => onTradeClick(post.attachedMarket!.id, 'NO')}
              className="px-2.5 py-1 rounded-lg bg-red-950/40 hover:bg-red-900/50 border border-[#EF233C]/30 text-[#EF233C] text-[11px] font-bold font-mono transition-all flex items-center gap-1"
            >
              <span>Predict NO</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Poll */}
      {post.poll && (
        <div className="mb-4 p-4 rounded-xl bg-[#09090C] border border-white/10 space-y-2">
          <p className="text-xs font-bold text-white mb-2">{post.poll.question}</p>
          <div className="space-y-2">
            {post.poll.options.map((opt) => {
              const isVoted = post.poll?.userVotedId === opt.id;
              const hasVoted = !!post.poll?.userVotedId;

              return (
                <button
                  key={opt.id}
                  disabled={hasVoted}
                  onClick={() => votePoll(post.id, opt.id)}
                  className={`relative w-full p-2.5 rounded-xl border text-left text-xs overflow-hidden transition-all flex items-center justify-between ${
                    isVoted
                      ? 'border-emerald-500 bg-emerald-950/20 text-white'
                      : 'border-white/10 hover:border-white/20 bg-white/[0.02] text-white/80'
                  }`}
                >
                  {hasVoted && (
                    <div
                      style={{ width: `${opt.percentage || 0}%` }}
                      className="absolute inset-y-0 left-0 bg-emerald-500/15 transition-all duration-500"
                    />
                  )}
                  <span className="relative z-10 font-medium flex items-center gap-2">
                    {isVoted && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                    {opt.text}
                  </span>
                  {hasVoted && (
                    <span className="relative z-10 font-mono font-bold text-emerald-400">
                      {opt.percentage}%
                    </span>
                  )}
                </button>
              );
            })}
          </div>
          <div className="text-right text-[10px] font-mono text-white/40 pt-1">
            {post.poll.totalVotes} community votes
          </div>
        </div>
      )}

      {/* Post Action Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-white/[0.06] text-white/50 text-xs font-mono">
        {/* Like */}
        <button
          onClick={() => toggleLike(post.id)}
          className={`flex items-center gap-1.5 hover:text-red-400 transition-colors ${
            post.isLiked ? 'text-red-500 font-bold' : ''
          }`}
        >
          <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-current' : ''}`} />
          <span>{post.likesCount}</span>
        </button>

        {/* Comments Toggle */}
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-1.5 hover:text-emerald-400 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{post.commentsCount}</span>
        </button>

        {/* Repost */}
        <button
          onClick={() => toggleRepost(post.id)}
          className={`flex items-center gap-1.5 hover:text-emerald-400 transition-colors ${
            post.isReposted ? 'text-emerald-400 font-bold' : ''
          }`}
        >
          <Repeat className="w-4 h-4" />
          <span>{post.repostsCount}</span>
        </button>

        {/* Bookmark */}
        <button
          onClick={() => toggleBookmark(post.id)}
          className={`hover:text-amber-400 transition-colors ${
            post.isBookmarked ? 'text-amber-400' : ''
          }`}
          title="Bookmark prediction"
        >
          <Bookmark className={`w-4 h-4 ${post.isBookmarked ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Expanded Comment Thread */}
      {showComments && (
        <div className="mt-4 pt-3 border-t border-white/[0.08] space-y-3">
          
          {/* Add Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Share your prediction rationale or counter-thesis..."
              className="flex-1 bg-[#09090C] border border-white/10 rounded-xl px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 font-sans"
            />
            <button
              type="submit"
              className="px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs flex items-center justify-center transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Comment List */}
          <div className="space-y-2.5 max-h-60 overflow-y-auto">
            {post.comments.length === 0 ? (
              <p className="text-center text-xs text-white/40 py-2">
                No replies yet. Be the first to share your analysis!
              </p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span className="font-bold text-xs text-white/90">{comment.author.name}</span>
                    <span className="text-[10px] font-mono text-white/40">{comment.timestamp}</span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{comment.content}</p>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
