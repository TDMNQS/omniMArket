export interface UserNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'TRADE' | 'MARKET_RESOLVED' | 'PRICE_ALERT' | 'SOCIAL_MENTION';
  read: boolean;
  link?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  isDemoUser: boolean;
  joinedDate: string;
  followedExperts: string[]; // user IDs or handles
  favoriteCategories: string[];
  watchlist: string[]; // market IDs
  stats: {
    totalTrades: number;
    winRate: number; // percentage
    rank: number;
    virtualProfits: number;
  };
}
