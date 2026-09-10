import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserNotification } from '../types/auth';

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  loginDemoUser: () => void;
  login: (email: string, password?: string) => Promise<boolean>;
  signup: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  notifications: UserNotification[];
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotificationsCount: number;
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  isOnboardingCompleted: boolean;
  completeOnboarding: (categories: string[], experts: string[]) => void;
  showOnboardingModal: boolean;
  setShowOnboardingModal: (show: boolean) => void;
}

const DEFAULT_DEMO_USER: UserProfile = {
  id: 'usr-current',
  name: 'Demo Pro Forecaster',
  username: 'demo_forecaster',
  email: 'trader@omnimarketx.demo',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  bio: 'Simulated prediction market researcher & quant enthusiast. Exploring live event probabilities on OmniMarketX.',
  isDemoUser: true,
  joinedDate: 'September 2026',
  followedExperts: ['usr-elena', 'usr-aris'],
  favoriteCategories: ['Crypto', 'AI', 'Finance'],
  watchlist: ['mkt-btc-120k', 'mkt-agi-frontier'],
  stats: {
    totalTrades: 14,
    winRate: 78,
    rank: 42,
    virtualProfits: 2840.00
  }
};

const INITIAL_NOTIFICATIONS: UserNotification[] = [
  {
    id: 'notif-1',
    title: 'Market Probability Surge',
    message: 'Bitcoin $120k market just surged +3.8% in the last 2 hours based on institutional ETF inflows.',
    timestamp: '10m ago',
    type: 'PRICE_ALERT',
    read: false,
    link: '/market/mkt-btc-120k'
  },
  {
    id: 'notif-2',
    title: 'Demo Trade Executed',
    message: 'Your simulated buy order for 500 YES shares on BTC $120k was filled at 0.65 virtual USD.',
    timestamp: '2h ago',
    type: 'TRADE',
    read: false,
    link: '/portfolio'
  },
  {
    id: 'notif-3',
    title: 'Expert Post Mention',
    message: 'Elena Rostova shared a new analysis on the upcoming macro catalysts.',
    timestamp: '3h ago',
    type: 'SOCIAL_MENTION',
    read: true,
    link: '/feed'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('omx_user');
    return saved ? JSON.parse(saved) : DEFAULT_DEMO_USER;
  });

  const [notifications, setNotifications] = useState<UserNotification[]>(() => {
    const saved = localStorage.getItem('omx_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const saved = localStorage.getItem('omx_theme');
    return (saved as 'dark' | 'light') || 'dark';
  });

  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<boolean>(() => {
    const saved = localStorage.getItem('omx_onboarding_done');
    return saved === 'true';
  });

  const [showOnboardingModal, setShowOnboardingModal] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('omx_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('omx_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('omx_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('omx_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const loginDemoUser = () => {
    setUser(DEFAULT_DEMO_USER);
  };

  const login = async (email: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_DEMO_USER,
      email,
      name: email.split('@')[0] || 'Omni Trader'
    };
    setUser(newUser);
    return true;
  };

  const signup = async (name: string, email: string) => {
    const newUser: UserProfile = {
      ...DEFAULT_DEMO_USER,
      name,
      email,
      username: name.toLowerCase().replace(/\s+/g, '_')
    };
    setUser(newUser);
    setShowOnboardingModal(true);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (user) {
      setUser({ ...user, ...updated });
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const completeOnboarding = (categories: string[], experts: string[]) => {
    if (user) {
      setUser({
        ...user,
        favoriteCategories: categories,
        followedExperts: experts
      });
    }
    setIsOnboardingCompleted(true);
    localStorage.setItem('omx_onboarding_done', 'true');
    setShowOnboardingModal(false);
  };

  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loginDemoUser,
        login,
        signup,
        logout,
        updateProfile,
        notifications,
        markNotificationAsRead,
        markAllNotificationsRead,
        unreadNotificationsCount,
        theme,
        toggleTheme,
        isOnboardingCompleted,
        completeOnboarding,
        showOnboardingModal,
        setShowOnboardingModal
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
