import React, { useState } from 'react';
import { Market } from '../../types/market';
import { Outcome } from '../../types/trade';
import { useTrading } from '../../context/TradingContext';
import { useSocial } from '../../context/SocialContext';
import { X, ShieldAlert, CheckCircle2, Share2, Wallet, Zap, AlertTriangle } from 'lucide-react';

interface TradeModalProps {
  market: Market | null;
  initialOutcome: Outcome;
  isOpen: boolean;
  onClose: () => void;
}

export const TradeModal: React.FC<TradeModalProps> = ({
  market,
  initialOutcome,
  isOpen,
  onClose
}) => {
  const { virtualBalance, executeDemoBuy, resetBalance } = useTrading();
  const { setIsCreatePostModalOpen, setPreselectedMarketForPost } = useSocial();

  const [outcome, setOutcome] = useState<Outcome>(initialOutcome);
  const [shares, setShares] = useState<number>(100);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [tradeSuccessReceipt, setTradeSuccessReceipt] = useState<any | null>(null);

  if (!isOpen || !market) return null;

  const currentProb = outcome === 'YES' ? market.yesProbability : market.noProbability;
  const pricePerShare = Number((currentProb / 100).toFixed(2));
  const totalCost = Number((shares * pricePerShare).toFixed(2));
  const demoFee = 0.00; // Simulated demo fee
  const updatedBalance = Number((virtualBalance - totalCost).toFixed(2));
  const potentialPayout = shares * 1.00; // Resolves to $1 per winning share
  const potentialProfit = Number((potentialPayout - totalCost).toFixed(2));
  const returnMultiple = totalCost > 0 ? ((potentialPayout / totalCost) * 100).toFixed(0) : '0';

  const handleSharesChange = (val: number) => {
    setErrorMsg(null);
    setShares(Math.max(1, Math.min(10000, val)));
  };

  const handleQuickPercent = (pct: number) => {
    setErrorMsg(null);
    if (pricePerShare <= 0) return;
    const maxAffordable = Math.floor(virtualBalance / pricePerShare);
    const targetShares = Math.max(1, Math.floor(maxAffordable * (pct / 100)));
    setShares(targetShares);
  };

  const handleConfirmTrade = () => {
    if (totalCost > virtualBalance) {
      setErrorMsg('Insufficient virtual demo funds. Reset your demo balance to continue.');
      return;
    }

    const res = executeDemoBuy(
      market.id,
      market.title,
      market.category,
      outcome,
      shares,
      pricePerShare
    );

    if (res.success && res.transaction) {
      setTradeSuccessReceipt(res.transaction);
    } else {
      setErrorMsg(res.message);
    }
  };

  const handleShareToFeed = () => {
    setPreselectedMarketForPost({
      id: market.id,
      title: market.title,
      category: market.category,
      yesProbability: market.yesProbability,
      noProbability: market.noProbability,
      userStance: outcome,
      userEntryPrice: pricePerShare,
      userShares: shares
    });
    setIsCreatePostModalOpen(true);
    handleClose();
  };

  const handleClose = () => {
    setTradeSuccessReceipt(null);
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
        
        {/* Top Banner - MANDATORY DEMO NOTICE */}
        <div className="bg-gradient-to-r from-red-950/60 via-[#161214] to-red-950/60 border-b border-[#EF233C]/30 px-5 py-2 flex items-center justify-between text-[11px] font-mono">
          <div className="flex items-center gap-1.5 text-[#EF233C] font-bold">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>DEMO MODE — VIRTUAL FUNDS ONLY</span>
          </div>
          <span className="text-white/50 text-[10px]">No Real Money</span>
        </div>

        {/* Modal Header */}
        <div className="p-5 border-b border-white/[0.08] flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-white/10 text-white/70">
                {market.category}
              </span>
              <span className="text-[11px] text-emerald-400 font-mono">
                {market.lastUpdated}
              </span>
            </div>
            <h3 className="text-sm font-bold text-white leading-snug line-clamp-2">
              {market.title}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg text-white/40 hover:text-white hover:bg-white/5 shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          
          {tradeSuccessReceipt ? (
            /* Trade Receipt Screen */
            <div className="text-center py-4 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 mx-auto flex items-center justify-center ring-1 ring-emerald-500/30">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h4 className="text-base font-bold text-white mb-1">
                  Simulated Demo Order Filled!
                </h4>
                <p className="text-[11px] font-mono text-emerald-400">
                  Simulated Demo Result — Not Real Money
                </p>
              </div>

              {/* Receipt Card */}
              <div className="bg-[#0C0C10] border border-white/10 rounded-2xl p-4 text-left font-mono text-xs space-y-2">
                <div className="flex justify-between text-white/60">
                  <span>Order Type:</span>
                  <span className="text-white font-semibold">Demo Market Buy</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Outcome Stance:</span>
                  <span className={`font-bold ${outcome === 'YES' ? 'text-emerald-400' : 'text-[#EF233C]'}`}>
                    {outcome} ({currentProb}%)
                  </span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Shares Filled:</span>
                  <span className="text-white">{shares} shares</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Average Price:</span>
                  <span className="text-white">${pricePerShare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Simulated Cost:</span>
                  <span className="text-white font-bold">${totalCost.toFixed(2)} DEMO</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Simulated Demo Fee:</span>
                  <span className="text-emerald-400">$0.00</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between">
                  <span className="text-white/80">Remaining Demo Balance:</span>
                  <span className="text-emerald-400 font-bold">${updatedBalance.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={handleShareToFeed}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#EF233C] to-[#d91d34] text-white text-xs font-bold shadow-[0_0_20px_-3px_rgba(239,35,60,0.5)] flex items-center justify-center gap-2 hover:opacity-95 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Share this prediction with the community</span>
                </button>
                
                <button
                  onClick={handleClose}
                  className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 text-xs font-medium"
                >
                  Done & View Holdings
                </button>
              </div>
            </div>
          ) : (
            /* Trade Input Screen */
            <>
              {/* YES / NO Outcome Selection Tabs */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setOutcome('YES')}
                  className={`py-3 px-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    outcome === 'YES'
                      ? 'bg-emerald-950/40 border-emerald-500 text-white shadow-[0_0_15px_-3px_rgba(34,197,94,0.4)]'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold text-emerald-400 uppercase">YES</span>
                  <span className="text-lg font-extrabold font-mono text-white">
                    {market.yesProbability}% (${(market.yesProbability / 100).toFixed(2)})
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setOutcome('NO')}
                  className={`py-3 px-4 rounded-xl border flex flex-col items-center justify-center transition-all ${
                    outcome === 'NO'
                      ? 'bg-red-950/40 border-[#EF233C] text-white shadow-[0_0_15px_-3px_rgba(239,35,60,0.4)]'
                      : 'bg-white/5 border-white/10 text-white/60 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold text-[#EF233C] uppercase">NO</span>
                  <span className="text-lg font-extrabold font-mono text-white">
                    {market.noProbability}% (${(market.noProbability / 100).toFixed(2)})
                  </span>
                </button>
              </div>

              {/* Shares Input */}
              <div>
                <div className="flex justify-between items-center text-xs mb-1.5 font-medium">
                  <span className="text-white/80">Simulated Shares</span>
                  <span className="text-white/50 font-mono">
                    Virtual Balance: <strong className="text-emerald-400">${virtualBalance.toFixed(2)}</strong>
                  </span>
                </div>

                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="10000"
                    value={shares}
                    onChange={(e) => handleSharesChange(parseInt(e.target.value) || 0)}
                    className="w-full bg-[#0C0C10] border border-white/10 rounded-xl px-4 py-2.5 text-white font-mono text-sm focus:outline-none focus:border-emerald-500/70"
                  />
                  <span className="absolute right-3 top-2.5 text-xs text-white/40 font-mono">
                    Shares
                  </span>
                </div>

                {/* Quick Share Buttons */}
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {[25, 50, 75, 100].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handleQuickPercent(pct)}
                      className="py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-white/70 hover:text-white transition-colors"
                    >
                      {pct === 100 ? 'MAX' : `${pct}%`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trade Breakdown Summary */}
              <div className="bg-[#0A0A0E] border border-white/[0.08] rounded-xl p-3 text-xs font-mono space-y-2">
                <div className="flex justify-between text-white/60">
                  <span>Price per Share:</span>
                  <span className="text-white font-bold">${pricePerShare.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Simulated Trade Cost:</span>
                  <span className="text-white font-bold">${totalCost.toFixed(2)} DEMO</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Simulated Demo Fee:</span>
                  <span className="text-emerald-400">$0.00 (Free in Demo)</span>
                </div>
                <div className="flex justify-between text-white/60">
                  <span>Potential Win Payout ($1/share):</span>
                  <span className="text-emerald-400 font-bold">${potentialPayout.toFixed(2)} (+{returnMultiple}%)</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-[11px]">
                  <span className="text-white/60">Updated Virtual Balance:</span>
                  <span className={`font-bold ${updatedBalance >= 0 ? 'text-white' : 'text-red-400'}`}>
                    ${updatedBalance.toFixed(2)}
                  </span>
                </div>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-red-950/40 border border-[#EF233C]/40 text-red-300 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-[#EF233C] shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleConfirmTrade}
                disabled={totalCost <= 0 || totalCost > virtualBalance}
                className={`w-full py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  outcome === 'YES'
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-[0_0_20px_-3px_rgba(34,197,94,0.5)]'
                    : 'bg-[#EF233C] hover:bg-[#d91d34] text-white shadow-[0_0_20px_-3px_rgba(239,35,60,0.5)]'
                } disabled:opacity-40 disabled:cursor-not-allowed`}
              >
                <Zap className="w-4 h-4" />
                <span>Confirm Demo Trade ({outcome} for ${totalCost.toFixed(2)})</span>
              </button>

              <p className="text-center text-[10px] text-white/40 font-mono">
                Trading with virtual currency only. No actual financial risk.
              </p>
            </>
          )}

        </div>
      </div>
    </div>
  );
};
