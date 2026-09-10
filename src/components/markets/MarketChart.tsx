import React, { useState } from 'react';
import { ChartPoint } from '../../types/market';

interface MarketChartProps {
  chartHistory: {
    '1D': ChartPoint[];
    '1W': ChartPoint[];
    '1M': ChartPoint[];
    'ALL': ChartPoint[];
  };
}

export const MarketChart: React.FC<MarketChartProps> = ({ chartHistory }) => {
  const [timeframe, setTimeframe] = useState<'1D' | '1W' | '1M' | 'ALL'>('1W');
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const data = chartHistory[timeframe] || chartHistory['1W'];
  if (!data || data.length === 0) {
    return <div className="p-8 text-center text-white/40">No chart data available</div>;
  }

  const activePoint = hoverIndex !== null ? data[hoverIndex] : data[data.length - 1];

  // SVG dimensions
  const width = 680;
  const height = 240;
  const paddingX = 30;
  const paddingY = 25;

  const chartWidth = width - paddingX * 2;
  const chartHeight = height - paddingY * 2;

  // Max volume for bottom volume bars
  const maxVolume = Math.max(...data.map((d) => d.volume), 1000);

  // Generate SVG path points
  const points = data.map((d, index) => {
    const x = paddingX + (index / (data.length - 1 || 1)) * chartWidth;
    const yYes = paddingY + (1 - d.yesPrice) * chartHeight;
    const yNo = paddingY + (1 - d.noPrice) * chartHeight;
    return { x, yYes, yNo, d };
  });

  const yesPathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.yYes}`, '');
  const noPathD = points.reduce((acc, p, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${p.x} ${p.yNo}`, '');

  // Fill gradient area for Yes
  const yesAreaD = `${yesPathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`;

  return (
    <div className="flex flex-col space-y-4">
      {/* Chart Header Info & Timeframe Selectors */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="font-mono text-2xl font-extrabold text-emerald-400">
              {Math.round(activePoint.yesPrice * 100)}% YES
            </span>
            <span className="font-mono text-sm text-[#EF233C] font-semibold">
              {Math.round(activePoint.noPrice * 100)}% NO
            </span>
          </div>
          <span className="text-[11px] font-mono text-white/50">
            Time: <strong className="text-white/80">{activePoint.time}</strong> • Volume: ${(activePoint.volume / 1000).toFixed(0)}k
          </span>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex items-center p-1 rounded-xl bg-white/5 border border-white/10">
          {(['1D', '1W', '1M', 'ALL'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => {
                setTimeframe(tf);
                setHoverIndex(null);
              }}
              className={`px-3 py-1 text-xs font-mono rounded-lg transition-all ${
                timeframe === tf
                  ? 'bg-emerald-500 text-black font-extrabold shadow-[0_0_10px_rgba(34,197,94,0.5)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* SVG Canvas Chart */}
      <div className="relative w-full h-[250px] bg-[#0C0C10] rounded-2xl border border-white/[0.08] p-2 overflow-hidden select-none">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          onMouseLeave={() => setHoverIndex(null)}
        >
          <defs>
            <linearGradient id="chartYesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#22C55E" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="chartRedLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#EF233C" />
              <stop offset="100%" stopColor="#FF5A6B" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={paddingY + chartHeight * 0.5} x2={width - paddingX} y2={paddingY + chartHeight * 0.5} stroke="rgba(255,255,255,0.05)" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="rgba(255,255,255,0.08)" />

          {/* Volume bars */}
          {points.map((p, i) => {
            const barHeight = (p.d.volume / maxVolume) * 35;
            return (
              <rect
                key={`vol-${i}`}
                x={p.x - 3}
                y={height - paddingY - barHeight}
                width={6}
                height={barHeight}
                fill="rgba(255,255,255,0.08)"
                rx={1}
              />
            );
          })}

          {/* Yes Area & Line */}
          <path d={yesAreaD} fill="url(#chartYesGrad)" />
          <path d={yesPathD} fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

          {/* No Line */}
          <path d={noPathD} fill="none" stroke="url(#chartRedLine)" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.65" strokeLinecap="round" />

          {/* Hover Crosshair */}
          {hoverIndex !== null && points[hoverIndex] && (
            <g>
              <line
                x1={points[hoverIndex].x}
                y1={paddingY}
                x2={points[hoverIndex].x}
                y2={height - paddingY}
                stroke="rgba(255,255,255,0.3)"
                strokeDasharray="2 2"
              />
              <circle
                cx={points[hoverIndex].x}
                cy={points[hoverIndex].yYes}
                r="5"
                fill="#22C55E"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </g>
          )}

          {/* Invisible hover capture zones */}
          {points.map((p, i) => {
            const zoneWidth = chartWidth / points.length;
            return (
              <rect
                key={`hover-${i}`}
                x={p.x - zoneWidth / 2}
                y={0}
                width={zoneWidth}
                height={height}
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
                className="cursor-crosshair"
              />
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-3 left-6 flex items-center gap-4 text-[10px] font-mono text-white/50">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-emerald-500"></span>
            <span className="text-emerald-400 font-bold">YES Probability</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-[#EF233C]"></span>
            <span className="text-[#EF233C] font-bold">NO Probability</span>
          </div>
        </div>
      </div>
    </div>
  );
};
