import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { Wallet, TrendingUp, TrendingDown, Target, PieChart, RotateCcw, ShieldCheck } from 'lucide-react';

export const PortfolioSummary: React.FC = () => {
  const {
    virtualBalance,
    totalPortfolioValue,
    totalUnrealizedPnL,
    totalRealizedPnL,
    winRate,
    openPositions,
    resetBalance
  } = useTrading();

  const totalPnL = Number((totalUnrealizedPnL + totalRealizedPnL).toFixed(2));
  const isPositive = totalPnL >= 0;

  // Category allocation breakdown
  const categoryTotals: { [key: string]: number } = {};
  openPositions.forEach((pos) => {
    categoryTotals[pos.category] = (categoryTotals[pos.category] || 0) + pos.currentValue;
  });

  const totalHoldingsValue = Object.values(categoryTotals).reduce((a, b) => a + b, 0);

  return (
    <div className="space-y-6">
      
      {/* Top Banner - Virtual Disclaimer */}
      <div className="p-4 rounded-2xl bg-[#111116] border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <span>Demo Portfolio & Risk-Free Simulator</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                100% VIRTUAL
              </span>
            </h3>
            <p className="text-xs text-white/50">
              Track simulated positions, test real-time predictions, and exercise sell strategies with zero financial risk.
            </p>
          </div>
        </div>

        <button
          onClick={resetBalance}
          className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 hover:text-white text-xs font-mono flex items-center gap-1.5 transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to $10,000</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Virtual Balance */}
        <div className="p-5 rounded-2xl bg-[#0F0F14] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between text-white/50 text-xs mb-2">
            <span>Available Demo Funds</span>
            <Wallet className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="font-mono text-2xl font-extrabold text-white">
            ${virtualBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-white/40 font-mono">
            Unallocated virtual liquidity
          </span>
        </div>

        {/* Portfolio Value */}
        <div className="p-5 rounded-2xl bg-[#0F0F14] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between text-white/50 text-xs mb-2">
            <span>Total Portfolio Value</span>
            <PieChart className="w-4 h-4 text-blue-400" />
          </div>
          <div className="font-mono text-2xl font-extrabold text-white">
            ${totalPortfolioValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <span className="text-[11px] text-emerald-400/90 font-mono">
            Balance + Active Holdings
          </span>
        </div>

        {/* Simulated P/L */}
        <div className="p-5 rounded-2xl bg-[#0F0F14] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between text-white/50 text-xs mb-2">
            <span>Simulated Profit/Loss</span>
            {isPositive ? (
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            ) : (
              <TrendingDown className="w-4 h-4 text-[#EF233C]" />
            )}
          </div>
          <div className={`font-mono text-2xl font-extrabold ${isPositive ? 'text-emerald-400' : 'text-[#EF233C]'}`}>
            {isPositive ? `+$${totalPnL.toFixed(2)}` : `-$${Math.abs(totalPnL).toFixed(2)}`}
          </div>
          <span className="text-[11px] text-white/40 font-mono">
            Unrealized: ${totalUnrealizedPnL.toFixed(2)}
          </span>
        </div>

        {/* Prediction Accuracy Win Rate */}
        <div className="p-5 rounded-2xl bg-[#0F0F14] border border-white/[0.08] shadow-lg">
          <div className="flex items-center justify-between text-white/50 text-xs mb-2">
            <span>Forecasting Win Rate</span>
            <Target className="w-4 h-4 text-purple-400" />
          </div>
          <div className="font-mono text-2xl font-extrabold text-white">
            {winRate}%
          </div>
          <span className="text-[11px] text-purple-400 font-mono">
            Based on resolved predictions
          </span>
        </div>
      </div>

      {/* Category Allocation */}
      {totalHoldingsValue > 0 && (
        <div className="p-5 rounded-2xl bg-[#0F0F14] border border-white/[0.08] shadow-lg">
          <h4 className="text-xs font-bold text-white font-mono uppercase tracking-wider mb-3">
            Category Exposure Allocation
          </h4>
          <div className="w-full h-2 rounded-full overflow-hidden flex bg-white/5 mb-3">
            {Object.entries(categoryTotals).map(([cat, val], idx) => {
              const pct = (val / totalHoldingsValue) * 100;
              const colors = ['bg-emerald-500', 'bg-[#EF233C]', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500'];
              return (
                <div
                  key={cat}
                  style={{ width: `${pct}%` }}
                  className={`${colors[idx % colors.length]} h-full`}
                  title={`${cat}: ${pct.toFixed(1)}%`}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4 text-xs font-mono">
            {Object.entries(categoryTotals).map(([cat, val], idx) => {
              const pct = (val / totalHoldingsValue) * 100;
              const dotColors = ['bg-emerald-500', 'bg-[#EF233C]', 'bg-blue-500', 'bg-amber-500', 'bg-purple-500'];
              return (
                <div key={cat} className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${dotColors[idx % dotColors.length]}`} />
                  <span className="text-white/60">{cat}:</span>
                  <span className="text-white font-bold">${val.toFixed(2)} ({pct.toFixed(0)}%)</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
