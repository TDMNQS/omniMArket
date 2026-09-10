export interface PostAuthor {
  id: string;
  name: string;
  username: string;
  avatar: string;
  badge?: string; // e.g. "Top Forecaster", "Crypto Macro", "Tech Visionary"
  winRate?: number;
  isVerified?: boolean;
}

export interface PostComment {
  id: string;
  author: PostAuthor;
  content: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
}

export interface AttachedMarket {
  id: string;
  title: string;
  category: string;
  yesProbability: number;
  noProbability: number;
  userStance?: 'YES' | 'NO';
  userEntryPrice?: number;
  userShares?: number;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  percentage?: number;
}

export interface SocialPost {
  id: string;
  author: PostAuthor;
  timestamp: string;
  content: string;
  hashtags: string[];
  attachedMarket?: AttachedMarket;
  poll?: {
    id: string;
    question: string;
    options: PollOption[];
    totalVotes: number;
    userVotedId?: string;
  };
  chartSnippet?: {
    marketTitle: string;
    trend: 'UP' | 'DOWN';
    change: string;
  };
  likesCount: number;
  isLiked?: boolean;
  repostsCount: number;
  isReposted?: boolean;
  bookmarksCount: number;
  isBookmarked?: boolean;
  commentsCount: number;
  comments: PostComment[];
}
