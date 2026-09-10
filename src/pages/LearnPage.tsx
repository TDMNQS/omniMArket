import React, { useState } from 'react';
import { BookOpen, Calculator, ShieldCheck, Zap, HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface LearnPageProps {
  navigate: (route: string) => void;
}

export const LearnPage: React.FC<LearnPageProps> = ({ navigate }) => {
  const [demoPriceCents, setDemoPriceCents] = useState<number>(65);
  const [demoInvestment, setDemoInvestment] = useState<number>(100);

  const priceDollars = demoPriceCents / 100;
  const sharesBought = Math.floor(demoInvestment / priceDollars);
  const totalCost = Number((sharesBought * priceDollars).toFixed(2));
  const payoutIfYes = sharesBought * 1.00;
  const netProfit = Number((payoutIfYes - totalCost).toFixed(2));
  const returnPercentage = totalCost > 0 ? ((netProfit / totalCost) * 100).toFixed(1) : '0';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            BEGINNER LEARNING MODE
          </span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          How Prediction Markets Work
        </h1>
        <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-2xl leading-relaxed">
          Master probability pricing, oracle resolution mechanics, and risk-free demo trading on OmniMarketX.
        </p>
      </div>

      {/* Interactive Probability Calculator Simulator */}
      <div className="p-6 md:p-8 rounded-3xl bg-gradient-to-br from-[#121218] to-[#0A0A0C] border border-white/10 shadow-2xl space-y-6">
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Interactive Probability & Payout Calculator
              </h3>
              <p className="text-xs text-white/50 font-mono">
                See how market prices directly represent crowd probability
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-emerald-400 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            Interactive Sandbox
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Controls */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-white/70">Market Implied Probability (Price per share):</span>
                <span className="text-xl font-black text-emerald-400 font-mono">
                  {demoPriceCents}¢ ({demoPriceCents}% Probability)
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="99"
                value={demoPriceCents}
                onChange={(e) => setDemoPriceCents(parseInt(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer h-2 bg-white/10 rounded-lg"
              />
              <div className="flex justify-between text-[10px] font-mono text-white/40 mt-1">
                <span>1¢ (1% very unlikely)</span>
                <span>50¢ (Coin flip)</span>
                <span>99¢ (99% almost certain)</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <span className="text-white/70">Simulated Virtual Allocation:</span>
                <span className="text-base font-bold text-white font-mono">
                  ${demoInvestment} Virtual USD
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setDemoInvestment(amt)}
                    className={`py-1.5 rounded-xl text-xs font-mono transition-all ${
                      demoInvestment === amt
                        ? 'bg-emerald-500 text-black font-bold'
                        : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time Calculation Result Slip */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-[#09090C] border border-white/10 space-y-3 font-mono text-xs">
            <h4 className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">
              Payout Mechanics Breakdown
            </h4>

            <div className="flex justify-between text-white/60">
              <span>Shares Purchased:</span>
              <span className="text-white font-bold">{sharesBought} shares</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Simulated Entry Cost:</span>
              <span className="text-white font-bold">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-white/60">
              <span>Winning Payout ($1.00/share):</span>
              <span className="text-emerald-400 font-bold">${payoutIfYes.toFixed(2)}</span>
            </div>
            <div className="pt-2 border-t border-white/10 flex justify-between">
              <span className="text-white/80">Simulated Net Profit:</span>
              <span className="text-emerald-400 font-bold text-sm">
                +${netProfit.toFixed(2)} (+{returnPercentage}%)
              </span>
            </div>
            <div className="text-[10px] text-white/40 leading-normal pt-2">
              If the event resolves NO, shares settle at $0.00. That's why high-probability outcomes offer lower multiples, while underdog outcomes offer huge upside!
            </div>
          </div>

        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="p-6 rounded-3xl bg-[#0E0E12] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">1. Binary Outcome Math</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Every prediction market asks a definitive yes-or-no question (e.g. "Will Bitcoin hit $120k?"). Winning shares always redeem for exactly $1.00. Losing shares redeem for $0.00. The price of a share fluctuates between $0.01 and $0.99 based on supply and demand.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0E0E12] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#EF233C]/10 text-[#EF233C] flex items-center justify-center">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">2. Transparent Oracle Resolution</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Every market on OmniMarketX clearly lists its authoritative data source and exact resolution criteria. Markets resolve without human bias by querying verified endpoints like official government releases, sports federations, and decentralized price feeds.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0E0E12] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">3. Direct Portfolio Liquidity</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            You never have to hold a position until the event concludes. If positive news breaks and your 35¢ shares rise to 70¢, you can immediately click the visible **Sell** button beside your holding to lock in your simulated gains.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-[#0E0E12] border border-white/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <HelpCircle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-white">4. Social Alpha & Discussion</h3>
          <p className="text-xs text-white/60 leading-relaxed">
            Markets aren't traded in isolation. Follow verified forecasters, read peer arguments in the social feed, and attach market prediction slips to your own analysis to build your reputation on the leaderboard.
          </p>
        </div>

      </div>

      {/* CTA */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-[#101014] to-emerald-950/30 border border-emerald-500/30 text-center space-y-4">
        <h3 className="text-xl font-black text-white">Ready to Put Theory to the Test?</h3>
        <p className="text-xs text-white/60 max-w-md mx-auto">
          You have $10,000 in virtual funds ready. Browse active markets and place your first demo prediction.
        </p>
        <button
          onClick={() => navigate('/markets')}
          className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs shadow-lg inline-flex items-center gap-2"
        >
          <span>Explore Live Markets</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
