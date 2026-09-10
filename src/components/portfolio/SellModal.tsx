import React, { useState } from 'react';
import { DemoPosition } from '../../types/trade';
import { useTrading } from '../../context/TradingContext';
import { useSocial } from '../../context/SocialContext';
import { X, ShieldAlert, CheckCircle2, Share2, TrendingUp, AlertTriangle } from 'lucide-react';

interface SellModalProps {
  position: DemoPosition | null;
  isOpen: boolean;
  onClose: () => void;
}

export const SellModal: React.FC<SellModalProps> = ({
  position,
  isOpen,
  onClose
}) => {
  const { virtualBalance, executeDemoSell } = useTrading();
  const { setIsCreatePostModalOpen, setPreselectedMarketForPost } = useSocial();

  const [sharesToSell, setSharesToSell] = useState<number>(() => position ? position.shares : 0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sellReceipt, setSellReceipt] = useState<any | null>(null);

  if (!isOpen || !position) return null;

  const currentPrice = position.currentPrice;
  const estimatedProceeds = Number((sharesToSell * currentPrice).toFixed(2));
  const demoFee = 0.00;
  const updatedVirtualBalance = Number((virtualBalance + estimatedProceeds).toFixed(2));
  const costBasis = Number((sharesToSell * position.averagePrice).toFixed(2));
  const estimatedPnL = Number((estimatedProceeds - costBasis).toFixed(2));
  const estimatedPnLPct = costBasis > 0 ? ((estimatedPnL / costBasis) * 100).toFixed(1) : '0';

  const handleSharesChange = (val: number) => {
    setErrorMsg(null);
    setSharesToSell(Math.max(1, Math.min(position.shares, val)));
  };

  const handleQuickPercent = (pct: number) => {
    setErrorMsg(null);
    const shares = Math.max(1, Math.floor(position.shares * (pct / 100)));
    setSharesToSell(shares);
  };

  const handleConfirmSell = () => {
    if (sharesToSell <= 0 || sharesToSell > position.shares) {
      setErrorMsg('Invalid quantity of shares to sell.');
      return;
    }

    const res = executeDemoSell(position.id, sharesToSell, currentPrice);
    if (res.success && res.transaction) {
      setSellReceipt({
        transaction: res.transaction,
        proceeds: res.proceeds,
        realizedPnL: res.realizedPnL,
        sharesSold: sharesToSell,
        outcome: position.outcome,
        marketTitle: position.marketTitle,
        updatedBalance: updatedVirtualBalance
      });
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleShareSellToFeed = () => {
    setPreselectedMarketForPost({
      id: position.marketId,
      title: position.marketTitle,
      category: position.category,
      yesProbability: Math.round(position.currentPrice * 100),
      noProbability: 100 - Math.round(position.currentPrice * 100),
      userStance: position.outcome,
      userEntryPrice: currentPrice,
      userShares: sharesToSell
    });
    setIsCreatePostModalOpen(true);
    handleClose();
  };

  const handleClose = () => {
    setSellReceipt(null);
    setErrorMsg(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={handleClose}
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg bg-[#111116] border border-white/15 rounded-3xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-150">
        
        {/* Mandatory Demo Label */}
        <div className="bg-gradient-to-r from-red-950/60 via-[#161214] to-red-950/60 border-b border-[#EF233C]/30 px-5 py-2 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-[#EF233C] font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>DEMO MODE — VIRTUAL FUNDS ONLY</span>
          </div>
          <span className="text-white/50 text-[10px]">Instant Holding Exit</span>
        </div>

        {/* Modal Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-bold ${
                position.outcome === 'YES' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-[#EF233C]'
              }`}>
                SELL {position.outcome} POSITION
              </span>
              <span className="text-xs font-mono text-white/50">
                Owned: {position.shares} shares
              </span>
            </div>
            <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
              {position.marketTitle}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/5 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-4">
          {sellReceipt ? (
            /* Sell Receipt */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center ring-1 ring-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  Position Sold Successfully!
                </h4>
                <p className="text-[11px] font-mono text-emerald-400">
                  Simulated Demo Result — Not Real Money
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-[#0C0C10] border border-white/10 rounded-2xl p-4 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between text-white/60">
                  <span>Sold Shares:</span>
                  <span className="text-white font-semibold">{sellReceipt.sharesSold} {sellReceipt.outcome}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Execution Price:</span>
                  <span className="text-white">${currentPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Estimated Proceeds:</span>
                  <span className="text-emerald-400 font-bold">${sellReceipt.proceeds.toFixed(2)} DEMO</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Realized P/L:</span>
                  <span className={`font-bold ${sellReceipt.realizedPnL >= 0 ? 'text-emerald-400' : 'text-[#EF233C]'}`}>
                    {sellReceipt.realizedPnL >= 0 ? `+$${sellReceipt.realizedPnL.toFixed(2)}` : `-$${Math.abs(sellReceipt.realizedPnL).toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Demo Transaction Fee:</span>
                  <span className="text-emerald-400">$0.00</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="text-white/80">Updated Demo Balance:</span>
                  <span className="text-emerald-400 font-bold">${sellReceipt.updatedBalance.toFixed(2)}</span>
                </div>
              </div>

              {/* Share to feed action */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleShareSellToFeed}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#EF233C] to-[#d91d34] text-white text-xs font-bold shadow-[0_0_20px_-3px_rgba(239,35,60,0.5)] flex items-center justify-center gap-2 hover:opacity-95 cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share Closed Position to Community Feed</span>
                </button>
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-medium"
                >
                  Return to Portfolio
                </button>
              </div>
            </div>
          ) : (
            /* Sell Inputs */
            <>
              {/* Position Glance */}
              <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.03] border border-white/[0.08] text-center font-mono">
                <div>
                  <span className="text-[10px] text-white/40 block">Avg Buy Price</span>
                  <span className="text-xs font-bold text-white">${position.averagePrice.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">Current Price</span>
                  <span className="text-xs font-bold text-emerald-400">${currentPrice.toFixed(2)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-white/40 block">Unrealized P/L</span>
                  <span className={`text-xs font-bold ${position.unrealizedPnL >= 0 ? 'text-emerald-400' : 'text-[#EF233C]'}`}>
                    {position.unrealizedPnL >= 0 ? `+${position.unrealizedPnLPercent}%` : `${position.unrealizedPnLPercent}%`}
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-white/80 font-medium">Quantity to Sell</span>
                  <span className="text-white/50 font-mono">
                    Max Available: <strong className="text-white">{position.shares} shares</strong>
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max={position.shares}
                    value={sharesToSell}
                    onChange={(e) => handleSharesChange(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/70"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-white/40 font-mono">
                    Shares
                  </span>
                </div>

                {/* Quick percentage buttons */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handleQuickPercent(pct)}
                      className="py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-white/70 hover:text-white transition-colors"
                    >
                      {pct === 100 ? 'SELL ALL' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sell Proceeds Breakdown */}
              <div className="bg-[#0A0A0E] border border-white/[0.08] rounded-xl p-3 text-xs font-mono space-y-2">
                <div className="flex justify-between text-white/60">
                  <span>Current Market Price:</span>
                  <span className="text-white font-bold">${currentPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Estimated Proceeds:</span>
                  <span className="text-emerald-400 font-bold">${estimatedProceeds.toFixed(2)} DEMO</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Estimated P/L on Sale:</span>
                  <span className={`font-bold ${estimatedPnL >= 0 ? 'text-emerald-400' : 'text-[#EF233C]'}`}>
                    {estimatedPnL >= 0 ? `+$${estimatedPnL.toFixed(2)} (+${estimatedPnLPct}%)` : `-$${Math.abs(estimatedPnL).toFixed(2)} (${estimatedPnLPct}%)`}
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Demo Fee:</span>
                  <span className="text-emerald-400">$0.00</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-[11px]">
                  <span className="text-white/60">Updated Virtual Balance:</span>
                  <span className="text-emerald-400 font-bold">${updatedVirtualBalance.toFixed(2)}</span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-950/40 border border-[#EF233C]/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#EF233C] shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Confirm Sell Button */}
              <button
                type="button"
                onClick={handleConfirmSell}
                disabled={sharesToSell <= 0 || sharesToSell > position.shares}
                className="w-full py-3 rounded-xl bg-[#EF233C] hover:bg-[#d91d34] text-white font-bold text-xs shadow-[0_0_20px_-3px_rgba(239,35,60,0.5)] transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Confirm Sell ({sharesToSell} Shares for ${estimatedProceeds.toFixed(2)})
              </button>

              <p className="text-center text-[10px] text-white/40 font-mono">
                Direct portfolio sell. No need to look up original market order book.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
