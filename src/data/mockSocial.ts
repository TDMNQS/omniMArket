import { SocialPost, PostAuthor } from '../types/social';

export const TOP_EXPERTS: PostAuthor[] = [
  {
    id: 'usr-elena',
    name: 'Elena Rostova',
    username: 'elena_crypto',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    badge: 'Top Forecaster (88% Win Rate)',
    winRate: 88,
    isVerified: true
  },
  {
    id: 'usr-vance',
    name: 'Marcus Vance',
    username: 'vance_macro',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: 'Senior Macro Strategist',
    winRate: 82,
    isVerified: true
  },
  {
    id: 'usr-aris',
    name: 'Dr. Aris Thorne',
    username: 'aris_ai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    badge: 'Frontier AI Researcher',
    winRate: 91,
    isVerified: true
  },
  {
    id: 'usr-sarah',
    name: 'Sarah Chen, CFA',
    username: 'chen_capital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'Fixed Income Analyst',
    winRate: 84,
    isVerified: true
  },
  {
    id: 'usr-alex',
    name: 'Alex Rivera',
    username: 'alex_markets',
    avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80',
    badge: 'Sports Quant Specialist',
    winRate: 79,
    isVerified: false
  }
];

export const INITIAL_POSTS: SocialPost[] = [
  {
    id: 'post-1',
    author: TOP_EXPERTS[0], // Elena Rostova
    timestamp: '25m ago',
    content: 'Just increased my simulated position on the $120k Bitcoin market! The institutional exchange order book depth shows an aggressive bids stack under $90k with no major resistance until $115k. Risk/reward on demo funds is exceptionally asymmetric.',
    hashtags: ['#Bitcoin120k', '#CryptoMarkets', '#OmniMarketX'],
    attachedMarket: {
      id: 'mkt-btc-120k',
      title: 'Will Bitcoin reach $120,000 before December 31, 2026?',
      category: 'Crypto',
      yesProbability: 71,
      noProbability: 29,
      userStance: 'YES',
      userEntryPrice: 0.68,
      userShares: 500
    },
    likesCount: 142,
    isLiked: false,
    repostsCount: 38,
    isReposted: false,
    bookmarksCount: 29,
    isBookmarked: false,
    commentsCount: 19,
    comments: [
      {
        id: 'c-1',
        author: TOP_EXPERTS[1],
        content: 'Spot liquidity is strong, but watch out for the upcoming FOMC rate revisions. If yields spike, crypto could experience a healthy pullback first.',
        timestamp: '15m ago',
        likes: 14
      },
      {
        id: 'c-2',
        author: {
          id: 'usr-random1',
          name: 'David Kim',
          username: 'dkim_trades',
          avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
          badge: 'Member'
        },
        content: 'Following your trade in Demo Mode with 200 shares! Loving the risk-free simulated learning on OmniMarketX.',
        timestamp: '8m ago',
        likes: 6
      }
    ]
  },
  {
    id: 'post-2',
    author: TOP_EXPERTS[2], // Dr. Aris Thorne
    timestamp: '1h ago',
    content: 'Breaking down ARC-AGI-2: The latest inference-time compute scaling benchmarks prove that neural reasoning systems are solving novel geometric transformations without having seen them during pretraining. 85% before 2027 is now the baseline scenario.',
    hashtags: ['#ARCAGI', '#FrontierAI', '#ReasoningModels'],
    attachedMarket: {
      id: 'mkt-agi-frontier',
      title: 'Will an open-weight AI model score >85% on the ARC-AGI-2 benchmark in 2026?',
      category: 'AI',
      yesProbability: 64,
      noProbability: 36,
      userStance: 'YES',
      userEntryPrice: 0.61,
      userShares: 750
    },
    likesCount: 289,
    isLiked: false,
    repostsCount: 74,
    isReposted: false,
    bookmarksCount: 92,
    isBookmarked: false,
    commentsCount: 34,
    comments: [
      {
        id: 'c-3',
        author: TOP_EXPERTS[3],
        content: 'The compute economics required for that level of test-time search will be the real bottleneck for open-weights.',
        timestamp: '42m ago',
        likes: 21
      }
    ]
  },
  {
    id: 'post-3',
    author: TOP_EXPERTS[3], // Sarah Chen
    timestamp: '2h ago',
    content: 'POLL: How many rate cuts do you expect from the Federal Reserve before the end of Q1 2027? Vote below and let us know your thesis in the replies.',
    hashtags: ['#FedRateCut', '#MacroEconomics', '#FOMC'],
    poll: {
      id: 'poll-fed-cuts',
      question: 'Expected total Fed rate cuts by Q1 2027?',
      options: [
        { id: 'opt-1', text: '1 cut (25 bps)', votes: 124, percentage: 18 },
        { id: 'opt-2', text: '2-3 cuts (50-75 bps)', votes: 340, percentage: 51 },
        { id: 'opt-3', text: '4+ cuts (>100 bps)', votes: 156, percentage: 23 },
        { id: 'opt-4', text: 'No cuts / Hikes', votes: 54, percentage: 8 }
      ],
      totalVotes: 674
    },
    likesCount: 98,
    isLiked: false,
    repostsCount: 19,
    isReposted: false,
    bookmarksCount: 15,
    isBookmarked: false,
    commentsCount: 27,
    comments: []
  },
  {
    id: 'post-4',
    author: {
      id: 'usr-demo-star',
      name: 'OmniMarketX Official',
      username: 'OmniMarketX',
      avatar: '/logo.svg',
      badge: 'Official Platform',
      isVerified: true
    },
    timestamp: '3h ago',
    content: 'Welcome to the redesigned OmniMarketX! Experience real-time live event markets, follow verified forecasters, test strategies in Demo Mode with $10,000 virtual funds, and participate in prediction discussions. Remember: all trading is strictly simulated!',
    hashtags: ['#OmniMarketX', '#PredictionMarkets', '#DemoTrading', '#Web3'],
    likesCount: 512,
    isLiked: true,
    repostsCount: 128,
    isReposted: false,
    bookmarksCount: 88,
    isBookmarked: true,
    commentsCount: 45,
    comments: []
  }
];

export const TRENDING_TAGS = [
  { tag: '#Bitcoin120k', postsCount: '1.8k' },
  { tag: '#ARCAGI', postsCount: '1.2k' },
  { tag: '#FedRateCut', postsCount: '940' },
  { tag: '#SpaceXStarship', postsCount: '810' },
  { tag: '#ChampionsLeague', postsCount: '650' },
  { tag: '#Avatar3', postsCount: '420' }
];
