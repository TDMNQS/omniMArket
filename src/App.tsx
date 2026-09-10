import React, { useState, useEffect } from 'react';
import { MarketProvider, useMarket } from './context/MarketContext';
import { TradingProvider, useTrading } from './context/TradingContext';
import { SocialProvider, useSocial } from './context/SocialContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Common Components
import { Header } from './components/common/Header';
import { TickerBar } from './components/common/TickerBar';
import { Footer } from './components/common/Footer';
import { SearchModal } from './components/common/SearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';

// Modals
import { TradeModal } from './components/markets/TradeModal';
import { SellModal } from './components/portfolio/SellModal';
import { CreatePostModal } from './components/social/CreatePostModal';
import { OnboardingModal } from './components/auth/OnboardingModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MarketsPage } from './pages/MarketsPage';
import { MarketDetailPage } from './pages/MarketDetailPage';
import { SocialFeedPage } from './pages/SocialFeedPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { LearnPage } from './pages/LearnPage';
import { FAQPage } from './pages/FAQPage';
import { LoginPage } from './components/auth/LoginPage';
import { SignupPage } from './components/auth/SignupPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';

// Mobile Bottom Nav Icons
import { Home, LineChart, MessageSquare, Briefcase, Trophy, User } from 'lucide-react';
import { Market } from './types/market';
import { Outcome } from './types/trade';

const AppContent: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifDrawerOpen, setIsNotifDrawerOpen] = useState(false);

  // Trade Modal State
  const [activeTradeMarket, setActiveTradeMarket] = useState<Market | null>(null);
  const [activeTradeOutcome, setActiveTradeOutcome] = useState<Outcome>('YES');
  const [isTradeModalOpen, setIsTradeModalOpen] = useState(false);

  const { activeSellPosition, setActiveSellPosition } = useTrading();

  // Handle browser history back/forward
  useEffect(() => {
    const onPopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (path: string) => {
    window.history.pushState({}, '', path);
    setCurrentRoute(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTradeModal = (market: Market, outcome: Outcome) => {
    setActiveTradeMarket(market);
    setActiveTradeOutcome(outcome);
    setIsTradeModalOpen(true);
  };

  // Extract market ID if route is /market/:id
  const marketMatch = currentRoute.match(/^\/market\/(.+)$/);
  const marketDetailId = marketMatch ? marketMatch[1] : null;

  const isAuthPage = currentRoute === '/login' || currentRoute === '/signup' || currentRoute === '/forgot-password';

  return (
    <div className="min-h-screen flex flex-col bg-[#050505] text-[#F5F5F5]">
      
      {/* Top Ticker (unless on standalone auth pages) */}
      {!isAuthPage && <TickerBar />}

      {/* Main Header */}
      {!isAuthPage && (
        <Header
          currentRoute={currentRoute}
          navigate={navigate}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotifDrawerOpen(true)}
        />
      )}

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentRoute === '/' && (
          <HomePage
            navigate={navigate}
            onTradeClick={handleOpenTradeModal}
          />
        )}

        {currentRoute === '/markets' && (
          <MarketsPage
            navigate={navigate}
            onTradeClick={handleOpenTradeModal}
          />
        )}

        {marketDetailId && (
          <MarketDetailPage
            marketId={marketDetailId}
            navigate={navigate}
            onTradeClick={handleOpenTradeModal}
          />
        )}

        {currentRoute === '/feed' && (
          <SocialFeedPage
            navigate={navigate}
            onTradeClick={handleOpenTradeModal}
          />
        )}

        {currentRoute === '/portfolio' && (
          <PortfolioPage
            navigate={navigate}
            onTradeClick={handleOpenTradeModal}
          />
        )}

        {currentRoute === '/leaderboard' && (
          <LeaderboardPage navigate={navigate} />
        )}

        {currentRoute === '/learn' && (
          <LearnPage navigate={navigate} />
        )}

        {currentRoute === '/faq' && (
          <FAQPage />
        )}

        {currentRoute === '/login' && (
          <LoginPage navigate={navigate} />
        )}

        {currentRoute === '/signup' && (
          <SignupPage navigate={navigate} />
        )}

        {currentRoute === '/forgot-password' && (
          <ForgotPasswordPage navigate={navigate} />
        )}
      </main>

      {/* Footer (unless on auth pages) */}
      {!isAuthPage && <Footer navigate={navigate} />}

      {/* Mobile Bottom Navigation Bar */}
      {!isAuthPage && (
        <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0C0C0F]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-around text-[10px] font-mono">
          <button
            onClick={() => navigate('/')}
            className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
              currentRoute === '/' ? 'text-emerald-400 font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          <button
            onClick={() => navigate('/markets')}
            className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
              currentRoute.startsWith('/market') ? 'text-emerald-400 font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <LineChart className="w-4 h-4" />
            <span>Markets</span>
          </button>

          <button
            onClick={() => navigate('/feed')}
            className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
              currentRoute === '/feed' ? 'text-emerald-400 font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Feed</span>
          </button>

          <button
            onClick={() => navigate('/portfolio')}
            className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
              currentRoute === '/portfolio' ? 'text-emerald-400 font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Portfolio</span>
          </button>

          <button
            onClick={() => navigate('/leaderboard')}
            className={`flex flex-col items-center gap-1 p-1.5 transition-colors ${
              currentRoute === '/leaderboard' ? 'text-emerald-400 font-bold' : 'text-white/50 hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4" />
            <span>Rankings</span>
          </button>
        </div>
      )}

      {/* Global Modals & Drawers */}
      <TradeModal
        market={activeTradeMarket}
        initialOutcome={activeTradeOutcome}
        isOpen={isTradeModalOpen}
        onClose={() => {
          setIsTradeModalOpen(false);
          setActiveTradeMarket(null);
        }}
      />

      <SellModal
        position={activeSellPosition}
        isOpen={!!activeSellPosition}
        onClose={() => setActiveSellPosition(null)}
      />

      <CreatePostModal />
      <OnboardingModal />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        navigate={navigate}
      />

      <NotificationDrawer
        isOpen={isNotifDrawerOpen}
        onClose={() => setIsNotifDrawerOpen(false)}
        navigate={navigate}
      />
    </div>
  );
};

export function App() {
  return (
    <MarketProvider>
      <TradingProvider>
        <SocialProvider>
          <AuthProvider>
            <AppContent />
          </AuthProvider>
        </SocialProvider>
      </TradingProvider>
    </MarketProvider>
  );
}

export default App;
