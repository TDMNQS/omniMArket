import React from 'react';
import { useTrading } from '../../context/TradingContext';
import { CheckCircle2, TrendingUp, TrendingDown } from 'lucide-react';

export const ClosedPositionsTable: React.FC = () => {
  const { closedPositions } = useTrading();

  if (closedPositions.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-[#0E0E12] border border-white/[0.08] text-white/40 text-xs">
        No settled or sold positions yet.
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
            <th className="py-3.5 px-4">Buy Price</th>
            <th className="py-3.5 px-4">Sell/Resolved Price</th>
            <th className="py-3.5 px-4">Realized Proceeds</th>
            <th className="py-3.5 px-4">Realized P/L</th>
            <th className="py-3.5 px-4 text-right">Closed At</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05] font-mono">
          {closedPositions.map((c) => {
            const isProfit = c.realizedPnL >= 0;
            return (
              <tr key={c.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="py-3.5 px-4 font-sans font-bold text-white max-w-xs truncate">
                  {c.marketTitle}
                </td>
                <td className="py-3.5 px-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    c.outcome === 'YES' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-[#EF233C]'
                  }`}>
                    {c.outcome}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-white/80">{c.shares}</td>
                <td className="py-3.5 px-4 text-white/60">${c.buyPrice.toFixed(2)}</td>
                <td className="py-3.5 px-4 text-white font-bold">${c.sellPrice.toFixed(2)}</td>
                <td className="py-3.5 px-4 text-emerald-400 font-bold">${c.realizedProceeds.toFixed(2)}</td>
                <td className="py-3.5 px-4">
                  <span className={`flex items-center gap-1 font-bold ${isProfit ? 'text-emerald-400' : 'text-[#EF233C]'}`}>
                    {isProfit ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {isProfit ? `+$${c.realizedPnL.toFixed(2)}` : `-$${Math.abs(c.realizedPnL).toFixed(2)}`}
                    <span className="text-[10px] opacity-80">({c.realizedPnLPercent}%)</span>
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right text-white/40 text-[11px]">{c.closedAt}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
