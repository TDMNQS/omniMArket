import React, { createContext, useContext, useState, useEffect } from 'react';
import { SocialPost, PostAuthor, AttachedMarket } from '../types/social';
import { INITIAL_POSTS, TOP_EXPERTS, TRENDING_TAGS } from '../data/mockSocial';

interface SocialContextType {
  posts: SocialPost[];
  feedTab: 'forYou' | 'following' | 'trending';
  setFeedTab: (tab: 'forYou' | 'following' | 'trending') => void;
  createPost: (content: string, hashtags: string[], attachedMarket?: AttachedMarket) => void;
  toggleLike: (postId: string) => void;
  toggleRepost: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  addComment: (postId: string, commentText: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  followedUserIds: string[];
  toggleFollowUser: (userId: string) => void;
  isCreatePostModalOpen: boolean;
  setIsCreatePostModalOpen: (open: boolean) => void;
  preselectedMarketForPost: AttachedMarket | null;
  setPreselectedMarketForPost: (market: AttachedMarket | null) => void;
  experts: PostAuthor[];
  trendingTags: typeof TRENDING_TAGS;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [posts, setPosts] = useState<SocialPost[]>(() => {
    const saved = localStorage.getItem('omx_social_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [feedTab, setFeedTab] = useState<'forYou' | 'following' | 'trending'>('forYou');
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState<boolean>(false);
  const [preselectedMarketForPost, setPreselectedMarketForPost] = useState<AttachedMarket | null>(null);

  const [followedUserIds, setFollowedUserIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('omx_followed_users');
    return saved ? JSON.parse(saved) : ['usr-elena', 'usr-aris'];
  });

  useEffect(() => {
    localStorage.setItem('omx_social_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('omx_followed_users', JSON.stringify(followedUserIds));
  }, [followedUserIds]);

  const toggleFollowUser = (userId: string) => {
    setFollowedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const createPost = (content: string, hashtags: string[], attachedMarket?: AttachedMarket) => {
    const newPost: SocialPost = {
      id: `post-${Date.now()}`,
      author: {
        id: 'usr-current',
        name: 'Demo Trader (You)',
        username: 'demo_forecaster',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        badge: 'Active Forecaster',
        winRate: 80,
        isVerified: true
      },
      timestamp: 'Just now',
      content,
      hashtags,
      attachedMarket,
      likesCount: 1,
      isLiked: true,
      repostsCount: 0,
      isReposted: false,
      bookmarksCount: 0,
      isBookmarked: false,
      commentsCount: 0,
      comments: []
    };

    setPosts([newPost, ...posts]);
    setIsCreatePostModalOpen(false);
    setPreselectedMarketForPost(null);
  };

  const toggleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isLiked = !p.isLiked;
          return {
            ...p,
            isLiked,
            likesCount: isLiked ? p.likesCount + 1 : p.likesCount - 1
          };
        }
        return p;
      })
    );
  };

  const toggleRepost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isReposted = !p.isReposted;
          return {
            ...p,
            isReposted,
            repostsCount: isReposted ? p.repostsCount + 1 : p.repostsCount - 1
          };
        }
        return p;
      })
    );
  };

  const toggleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const isBookmarked = !p.isBookmarked;
          return {
            ...p,
            isBookmarked,
            bookmarksCount: isBookmarked ? p.bookmarksCount + 1 : p.bookmarksCount - 1
          };
        }
        return p;
      })
    );
  };

  const addComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;

    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const newComment = {
            id: `cmt-${Date.now()}`,
            author: {
              id: 'usr-current',
              name: 'Demo Trader (You)',
              username: 'demo_forecaster',
              avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
              badge: 'Active Forecaster'
            },
            content: commentText.trim(),
            timestamp: 'Just now',
            likes: 0
          };

          return {
            ...p,
            commentsCount: p.commentsCount + 1,
            comments: [...p.comments, newComment]
          };
        }
        return p;
      })
    );
  };

  const votePoll = (postId: string, optionId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId && p.poll && !p.poll.userVotedId) {
          const updatedOptions = p.poll.options.map((opt) =>
            opt.id === optionId ? { ...opt, votes: opt.votes + 1 } : opt
          );
          const totalVotes = p.poll.totalVotes + 1;
          const optionsWithPct = updatedOptions.map((opt) => ({
            ...opt,
            percentage: Math.round((opt.votes / totalVotes) * 100)
          }));

          return {
            ...p,
            poll: {
              ...p.poll,
              options: optionsWithPct,
              totalVotes,
              userVotedId: optionId
            }
          };
        }
        return p;
      })
    );
  };

  return (
    <SocialContext.Provider
      value={{
        posts,
        feedTab,
        setFeedTab,
        createPost,
        toggleLike,
        toggleRepost,
        toggleBookmark,
        addComment,
        votePoll,
        followedUserIds,
        toggleFollowUser,
        isCreatePostModalOpen,
        setIsCreatePostModalOpen,
        preselectedMarketForPost,
        setPreselectedMarketForPost,
        experts: TOP_EXPERTS,
        trendingTags: TRENDING_TAGS
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
