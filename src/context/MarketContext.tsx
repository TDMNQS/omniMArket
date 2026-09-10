import React, { createContext, useContext, useState, useEffect } from 'react';
import { Market, MarketCategory, MarketStatus } from '../types/market';
import { INITIAL_MARKETS } from '../data/mockMarkets';

interface MarketContextType {
  markets: Market[];
  selectedCategory: MarketCategory;
  setSelectedCategory: (category: MarketCategory) => void;
  selectedStatus: MarketStatus | 'All';
  setSelectedStatus: (status: MarketStatus | 'All') => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortBy: 'trending' | 'volume' | 'closingSoon' | 'highestOdds' | 'newest';
  setSortBy: (sort: 'trending' | 'volume' | 'closingSoon' | 'highestOdds' | 'newest') => void;
  getMarketById: (id: string) => Market | undefined;
  watchlist: string[];
  toggleWatchlist: (marketId: string) => void;
  filteredMarkets: Market[];
  trendingMarkets: Market[];
  closingSoonMarkets: Market[];
  featuredMarket: Market | undefined;
  lastGlobalUpdate: string;
}

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [markets, setMarkets] = useState<Market[]>(() => {
    const saved = localStorage.getItem('omx_markets');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved markets', e);
      }
    }
    return INITIAL_MARKETS;
  });

  const [selectedCategory, setSelectedCategory] = useState<MarketCategory>('All');
  const [selectedStatus, setSelectedStatus] = useState<MarketStatus | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'trending' | 'volume' | 'closingSoon' | 'highestOdds' | 'newest'>('trending');
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('omx_watchlist');
    return saved ? JSON.parse(saved) : ['mkt-btc-120k', 'mkt-agi-frontier'];
  });
  const [lastGlobalUpdate, setLastGlobalUpdate] = useState<string>('Just now');

  // Persist markets
  useEffect(() => {
    localStorage.setItem('omx_markets', JSON.stringify(markets));
  }, [markets]);

  // Persist watchlist
  useEffect(() => {
    localStorage.setItem('omx_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  // Real-time market tick simulator (Subtle random walk on active markets)
  useEffect(() => {
    const interval = setInterval(() => {
      setMarkets((prevMarkets) => {
        const activeMarkets = prevMarkets.filter((m) => m.status === 'Active' || m.status === 'Closing Soon');
        if (activeMarkets.length === 0) return prevMarkets;

        // Pick one random market to jitter
        const randomIndex = Math.floor(Math.random() * activeMarkets.length);
        const targetMarket = activeMarkets[randomIndex];

        // Slight delta (-2% to +2%)
        const delta = Math.floor(Math.random() * 3) - 1; // -1, 0, 1
        if (delta === 0) return prevMarkets;

        const newYes = Math.min(98, Math.max(2, targetMarket.yesProbability + delta));
        const newNo = 100 - newYes;
        const volumeBump = Math.floor(Math.random() * 15000) + 2000;

        return prevMarkets.map((m) => {
          if (m.id === targetMarket.id) {
            return {
              ...m,
              yesProbability: newYes,
              noProbability: newNo,
              change24h: Number((m.change24h + delta * 0.4).toFixed(1)),
              volume24h: m.volume24h + volumeBump,
              totalVolume: m.totalVolume + volumeBump,
              participantsCount: m.participantsCount + (Math.random() > 0.6 ? 1 : 0),
              lastUpdated: 'Just now'
            };
          }
          return m;
        });
      });

      setLastGlobalUpdate('A few seconds ago');
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const toggleWatchlist = (marketId: string) => {
    setWatchlist((prev) =>
      prev.includes(marketId) ? prev.filter((id) => id !== marketId) : [...prev, marketId]
    );
  };

  const getMarketById = (id: string) => {
    return markets.find((m) => m.id === id);
  };

  // Filter and Sort markets
  const filteredMarkets = markets.filter((market) => {
    if (selectedCategory !== 'All' && market.category !== selectedCategory) {
      return false;
    }
    if (selectedStatus !== 'All' && market.status !== selectedStatus) {
      return false;
    }
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchTitle = market.title.toLowerCase().includes(q);
      const matchDesc = market.description.toLowerCase().includes(q);
      const matchCat = market.category.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchCat;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'trending') return (b.trending ? 1 : 0) - (a.trending ? 1 : 0) || b.volume24h - a.volume24h;
    if (sortBy === 'volume') return b.totalVolume - a.totalVolume;
    if (sortBy === 'closingSoon') return a.closingDate.localeCompare(b.closingDate);
    if (sortBy === 'highestOdds') return b.yesProbability - a.yesProbability;
    if (sortBy === 'newest') return b.participantsCount - a.participantsCount;
    return 0;
  });

  const trendingMarkets = markets.filter((m) => m.trending || m.volume24h > 1000000);
  const closingSoonMarkets = markets.filter((m) => m.status === 'Closing Soon');
  const featuredMarket = markets.find((m) => m.featured) || markets[0];

  return (
    <MarketContext.Provider
      value={{
        markets,
        selectedCategory,
        setSelectedCategory,
        selectedStatus,
        setSelectedStatus,
        searchQuery,
        setSearchQuery,
        sortBy,
        setSortBy,
        getMarketById,
        watchlist,
        toggleWatchlist,
        filteredMarkets,
        trendingMarkets,
        closingSoonMarkets,
        featuredMarket,
        lastGlobalUpdate
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = () => {
  const context = useContext(MarketContext);
  if (!context) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};
