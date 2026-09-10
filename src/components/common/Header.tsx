import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTrading } from '../../context/TradingContext';
import { useSocial } from '../../context/SocialContext';
import { 
  Search, 
  Bell, 
  Sun, 
  Moon, 
  PlusCircle, 
  RotateCcw, 
  Sparkles, 
  Menu, 
  X,
  Wallet,
  User,
  ShieldCheck,
  LogOut
} from 'lucide-react';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
  onOpenSearch: () => void;
  onOpenNotifications: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRoute,
  navigate,
  onOpenSearch,
  onOpenNotifications
}) => {
  const { user, isAuthenticated, logout, theme, toggleTheme, unreadNotificationsCount } = useAuth();
  const { virtualBalance, resetBalance } = useTrading();
  const { setIsCreatePostModalOpen } = useSocial();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Live Markets', path: '/markets' },
    { label: 'Social Feed', path: '/feed' },
    { label: 'Portfolio', path: '/portfolio' },
    { label: 'Leaderboard', path: '/leaderboard' },
    { label: 'Learn', path: '/learn' },
  ];

  const handleNav = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setProfileDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0A0A0C]/90 backdrop-blur-xl border-b border-white/[0.08] transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-[#EF233C] to-[#22C55E] p-[1.5px] transition-transform duration-300 group-hover:scale-105">
              <div className="w-full h-full bg-[#0E0E12] rounded-[10px] flex items-center justify-center overflow-hidden">
                <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#EF233C] via-white to-[#22C55E] text-base tracking-tighter">
                  OMX
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold tracking-tight text-lg text-white group-hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                OmniMarketX
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  3D
                </span>
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = currentRoute === link.path || (link.path !== '/' && currentRoute.startsWith(link.path));
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-white/10 text-white shadow-inner font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/[0.08] text-white/60 hover:text-white text-xs transition-all"
              title="Search markets, tags, experts (⌘K)"
            >
              <Search className="w-3.5 h-3.5 text-white/70" />
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden md:inline-block px-1 py-0.5 text-[10px] bg-white/10 rounded text-white/50 font-mono">
                ⌘K
              </kbd>
            </button>

            {/* Virtual Balance Pill (Always clearly Demo) */}
            <div className="flex items-center">
              <div 
                onClick={() => handleNav('/portfolio')}
                className="group flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-950/40 via-[#121214] to-emerald-950/30 border border-emerald-500/30 hover:border-emerald-500/60 transition-all cursor-pointer shadow-[0_0_12px_-3px_rgba(34,197,94,0.25)]"
                title="Virtual demo trading balance (Click to view portfolio)"
              >
                <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                <div className="flex flex-col text-left leading-tight">
                  <span className="text-[9px] uppercase font-mono font-bold tracking-wider text-emerald-400">
                    DEMO FUNDS
                  </span>
                  <span className="text-xs font-mono font-bold text-white group-hover:text-emerald-300 transition-colors">
                    ${virtualBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </div>

              {/* Quick Reset Balance Button */}
              <button
                onClick={() => setShowResetConfirm(true)}
                className="ml-1 p-1.5 rounded-lg text-white/40 hover:text-emerald-400 hover:bg-white/5 transition-all"
                title="Top-up / Reset Demo Balance to $10,000"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Post to Feed Trigger */}
            <button
              onClick={() => setIsCreatePostModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#EF233C] hover:bg-[#d91d34] text-white text-xs font-semibold shadow-[0_0_15px_-3px_rgba(239,35,60,0.5)] transition-all active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Post to Feed</span>
            </button>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadNotificationsCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#EF233C] animate-pulse"></span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-colors"
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* User Profile or Auth */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 p-1 rounded-full border border-white/10 hover:border-emerald-500/50 transition-all focus:outline-none"
                >
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-emerald-500/40"
                  />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#121216] border border-white/10 shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-2 border-b border-white/10 mb-1">
                      <p className="text-xs font-semibold text-white truncate">{user.name}</p>
                      <p className="text-[11px] text-white/50 font-mono truncate">@{user.username}</p>
                      <div className="mt-1 flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Demo Mode Active</span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleNav('/portfolio')}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <Wallet className="w-3.5 h-3.5 text-emerald-400" />
                      <span>My Portfolio & Positions</span>
                    </button>
                    <button
                      onClick={() => handleNav('/feed')}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[#EF233C]" />
                      <span>Social Prediction Feed</span>
                    </button>
                    <button
                      onClick={() => handleNav('/leaderboard')}
                      className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-white/80 hover:text-white hover:bg-white/5 flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-blue-400" />
                      <span>Global Leaderboard</span>
                    </button>
                    <div className="border-t border-white/10 mt-1 pt-1">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => handleNav('/login')}
                className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium border border-white/10 transition-all"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0D0D10] border-b border-white/10 px-4 pt-2 pb-6 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => handleNav(link.path)}
              className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-white/80 hover:text-white hover:bg-white/5"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-white/10">
            <button
              onClick={() => {
                setIsCreatePostModalOpen(true);
                setMobileMenuOpen(false);
              }}
              className="w-full py-2 px-3 rounded-lg bg-[#EF233C] text-white text-sm font-semibold flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post to Feed</span>
            </button>
          </div>
        </div>
      )}

      {/* Reset Balance Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-[#121216] border border-white/15 rounded-2xl p-6 max-w-sm w-full shadow-2xl text-center">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Reset Demo Balance?</h3>
            <p className="text-xs text-white/60 mb-6">
              This will restore your simulated virtual balance to <strong className="text-emerald-400">$10,000.00</strong> and clear active demo positions. No real money is affected.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetBalance();
                  setShowResetConfirm(false);
                }}
                className="flex-1 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold"
              >
                Reset to $10,000
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
