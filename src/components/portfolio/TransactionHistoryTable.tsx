import React from 'react';
import { useTrading } from '../../context/TradingContext';

export const TransactionHistoryTable: React.FC = () => {
  const { transactions } = useTrading();

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center rounded-2xl bg-[#0E0E12] border border-white/[0.08] text-white/40 text-xs">
        No transaction logs found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl bg-[#0E0E12] border border-white/[0.08] shadow-xl">
      <table className="w-full text-left border-collapse text-xs">
        <thead>
          <tr className="border-b border-white/[0.08] text-[11px] font-mono text-white/40 bg-white/[0.02]">
            <th className="py-3.5 px-4">Time</th>
            <th className="py-3.5 px-4">Type</th>
            <th className="py-3.5 px-4">Market</th>
            <th className="py-3.5 px-4">Outcome</th>
            <th className="py-3.5 px-4">Shares</th>
            <th className="py-3.5 px-4">Price</th>
            <th className="py-3.5 px-4">Total Amount</th>
            <th className="py-3.5 px-4 text-right">Fee (Demo)</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/[0.05] font-mono">
          {transactions.map((tx) => (
            <tr key={tx.id} className="hover:bg-white/[0.02] transition-colors">
              <td className="py-3.5 px-4 text-white/40 text-[11px]">{tx.timestamp}</td>
              <td className="py-3.5 px-4">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  tx.type === 'DEMO_BUY' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#EF233C]/20 text-[#EF233C]'
                }`}>
                  {tx.type}
                </span>
              </td>
              <td className="py-3.5 px-4 font-sans font-medium text-white max-w-xs truncate">
                {tx.marketTitle}
              </td>
              <td className="py-3.5 px-4">
                <span className={`font-bold ${tx.outcome === 'YES' ? 'text-emerald-400' : 'text-[#EF233C]'}`}>
                  {tx.outcome}
                </span>
              </td>
              <td className="py-3.5 px-4 text-white/80">{tx.shares}</td>
              <td className="py-3.5 px-4 text-white/70">${tx.pricePerShare.toFixed(2)}</td>
              <td className="py-3.5 px-4 font-bold text-white">${tx.totalAmount.toFixed(2)} DEMO</td>
              <td className="py-3.5 px-4 text-right text-emerald-400">$0.00</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
