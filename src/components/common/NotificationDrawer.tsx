import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { X, CheckCheck, Bell, TrendingUp, AlertCircle, MessageSquare } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  navigate: (route: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  navigate
}) => {
  const { notifications, markNotificationAsRead, markAllNotificationsRead } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-[#101014] border-l border-white/10 shadow-2xl p-6 flex flex-col z-10 animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">Notifications</h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-white/50 hover:text-white hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-white/40 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map((notif) => {
              const getIcon = () => {
                switch (notif.type) {
                  case 'PRICE_ALERT':
                    return <TrendingUp className="w-4 h-4 text-emerald-400" />;
                  case 'TRADE':
                    return <AlertCircle className="w-4 h-4 text-[#EF233C]" />;
                  case 'SOCIAL_MENTION':
                    return <MessageSquare className="w-4 h-4 text-blue-400" />;
                  default:
                    return <Bell className="w-4 h-4 text-amber-400" />;
                }
              };

              return (
                <div
                  key={notif.id}
                  onClick={() => {
                    markNotificationAsRead(notif.id);
                    if (notif.link) {
                      navigate(notif.link);
                      onClose();
                    }
                  }}
                  className={`p-3 rounded-xl border transition-all cursor-pointer ${
                    notif.read
                      ? 'bg-white/[0.02] border-white/[0.05] text-white/60'
                      : 'bg-white/[0.06] border-emerald-500/30 text-white shadow-lg'
                  } hover:border-white/20`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-0.5 p-1 rounded-lg bg-white/5 shrink-0">
                      {getIcon()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <span className="font-semibold text-xs text-white truncate">
                          {notif.title}
                        </span>
                        <span className="text-[10px] text-white/40 font-mono shrink-0">
                          {notif.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-white/70 line-clamp-2 leading-relaxed">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
