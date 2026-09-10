import React from 'react';
import { DemoPosition } from '../../types/trade';
import { useTrading } from '../../context/TradingContext';
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight } from 'lucide-react';

interface OpenPositionsTableProps {
  onViewMarket: (marketId: string) => void;
}

export const OpenPositionsTable: React.FC<OpenPositionsTableProps> = ({ onViewMarket }) => {
  const { openPositions, setActiveSellPosition } = useTrading();

  if (openPositions.length === 0) {
    return (
      <div className="p-12 text-center rounded-2xl bg-[#0E0E12] border border-white/[0.08]">
        <div className="w-12 h-12 rounded-full bg-white/5 text-white/40 mx-auto flex items-center justify-center mb-3">
          <DollarSign className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white mb-1">No Open Simulated Positions</h4>
        <p className="text-xs text-white/50 max-w-sm mx-auto mb-4">
          Explore live markets and place risk-free demo predictions using your virtual balance.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-[#0E0E12] border border-white/[0.08] shadow-xl">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-white/[0.08] text-[11px] font-mono text-white/40 bg-white/[0.02]">
            <th className="py-3.5 px-4">Market</th>
            <th className="py-3.5 px-4">Outcome</th>
            <th className="py-3.5 px-4">Shares</th>
            <th className="py-3.5 px-4">Avg Buy</th>
            <th className="py-3.5 px-4">Current Price</th>
            <th className="py-3.5 px-4">Current Value</th>
            <th className="py-3.5 px-4">Simulated P/L</th>
            <th className="py-3.5 px-4">Demo Fee</th>
            <th className="py-3.5 px-4 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05] font-mono">
          {openPositions.map((pos) => {
            const isProfitable = pos.unrealizedPnL >= 0;

            return (
              <tr key={pos.id} className="hover:bg-white/[0.02] transition-colors group">
                {/* Market Title */}
                <td className="py-4 px-4 font-sans max-w-xs">
                  <div
                    onClick={() => onViewMarket(pos.marketId)}
                    className="cursor-pointer group/title flex items-center gap-1.5"
                  >
                    <span className="font-bold text-white group-hover/title:text-emerald-400 transition-colors line-clamp-1">
                      {pos.marketTitle}
                    </span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover/title:text-emerald-400 shrink-0" />
                  </div>
                  <span className="text-[10px] text-white/40 font-mono">
                    Opened {pos.openedAt}
                  </span>
                </td>

                {/* Outcome Badge */}
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      pos.outcome === 'YES'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-red-500/20 text-[#EF233C] border border-[#EF233C]/30'
                    }`}
                  >
                    {pos.outcome}
                  </span>
                </td>

                {/* Shares */}
                <td className="py-4 px-4 text-white font-semibold">
                  {pos.shares}
                </td>

                {/* Avg Buy Price */}
                <td className="py-4 px-4 text-white/80">
                  ${pos.averagePrice.toFixed(2)}
                </td>

                {/* Current Price */}
                <td className="py-4 px-4 text-emerald-400 font-bold">
                  ${pos.currentPrice.toFixed(2)}
                </td>

                {/* Current Value */}
                <td className="py-4 px-4 text-white font-bold">
                  ${pos.currentValue.toFixed(2)}
                </td>

                {/* Unrealized P/L */}
                <td className="py-4 px-4">
                  <span
                    className={`flex items-center gap-1 font-bold ${
                      isProfitable ? 'text-emerald-400' : 'text-[#EF233C]'
                    }`}
                  >
                    {isProfitable ? (
                      <TrendingUp className="w-3.5 h-3.5" />
                    ) : (
                      <TrendingDown className="w-3.5 h-3.5" />
                    )}
                    {isProfitable ? `+$${pos.unrealizedPnL.toFixed(2)}` : `-$${Math.abs(pos.unrealizedPnL).toFixed(2)}`}
                    <span className="text-[10px] opacity-80">
                      ({isProfitable ? `+${pos.unrealizedPnLPercent}%` : `${pos.unrealizedPnLPercent}%`})
                    </span>
                  </span>
                </td>

                {/* Demo Fee */}
                <td className="py-4 px-4 text-emerald-400/80 text-[11px]">
                  $0.00
                </td>

                {/* DIRECT VISIBLE SELL BUTTON BESIDE HOLDING */}
                <td className="py-4 px-4 text-right">
                  <button
                    onClick={() => setActiveSellPosition(pos)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#EF233C] hover:bg-[#d91d34] text-white font-bold text-xs shadow-[0_0_12px_-2px_rgba(239,35,60,0.5)] transition-all cursor-pointer active:scale-95 inline-flex items-center gap-1"
                    title={`Sell ${pos.shares} shares of ${pos.outcome}`}
                  >
                    <span>Sell</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
