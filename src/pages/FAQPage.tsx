import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ShieldAlert, Search, ExternalLink } from 'lucide-react';

export const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItem, setOpenItem] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is trading on OmniMarketX done with real money?',
      a: 'No. All trading on OmniMarketX is strictly in DEMO MODE using simulated virtual funds. Users start with $10,000 in virtual credits to research live event markets, test prediction models, and participate in social discussions. No real fiat, cryptocurrency deposits, or financial payouts are supported.'
    },
    {
      q: 'How are live market probabilities and prices determined?',
      a: 'Each market shares trade between $0.01 and $0.99. The current price directly reflects the crowd consensus probability. For example, a 71¢ YES share indicates a 71% estimated probability of occurrence. Prices shift in real-time as participants buy or sell outcomes.'
    },
    {
      q: 'How do I sell my demo positions before the market closes?',
      a: 'Go to your Portfolio page. Every single holding has a clearly visible "Sell" button directly beside it. Click Sell, choose how many shares you want to liquidate (25%, 50%, 75%, or 100%), review the estimated virtual proceeds, and confirm. You never need to hunt down the original market order book again.'
    },
    {
      q: 'Where does the live market data come from?',
      a: 'OmniMarketX aggregates live oracle data from transparent APIs and public institutions, such as CoinGecko and Coinbase Pro for crypto, UEFA and official leagues for sports, the Federal Reserve for macro finance, NASA for space, and official corporate 10-K/10-Q filings for corporate events. When external feeds are disconnected, our fallback simulation engine preserves uninterrupted testing without fabricating real transactions.'
    },
    {
      q: 'How do markets resolve?',
      a: 'Every market page features an explicit Resolution Criteria tab detailing the exact rules, cutoff timestamp, and primary source of truth. Once the official oracle confirms the outcome, winning shares resolve to $1.00 each and losing shares settle to $0.00.'
    },
    {
      q: 'Can I reset my demo balance if I run out of funds?',
      a: 'Yes! Simply click the reset button next to your demo balance in the header or in your portfolio summary. Your virtual balance will immediately reset to $10,000.00.'
    },
    {
      q: 'How does the in-app social prediction feed work?',
      a: 'The social feed allows you to post predictions, follow verified market analysts, and attach market prediction cards to your posts with your YES or NO stance. After completing any demo buy or sell, you can immediately share your slip to the community.'
    }
  ];

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
          <HelpCircle className="w-4 h-4" />
          <span>HELP CENTER & TRANSPARENCY</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-white/50 max-w-xl mx-auto">
          Everything you need to know about OmniMarketX prediction markets, virtual demo funds, and oracle verification.
        </p>
      </div>

      {/* Compliance Box */}
      <div className="p-4 rounded-2xl bg-red-950/20 border border-[#EF233C]/30 flex items-start gap-3 text-xs">
        <ShieldAlert className="w-5 h-5 text-[#EF233C] shrink-0 mt-0.5" />
        <div>
          <h4 className="text-white font-bold mb-1 font-mono uppercase">
            REGULATORY & DEMO MODE CLARITY
          </h4>
          <p className="text-white/70 leading-relaxed">
            Real-money prediction trading requires extensive localized financial licensing, user KYC, AML checks, and regional banking compliance. OmniMarketX provides a risk-free simulated social environment. Never treat simulated prediction returns as guaranteed financial advice.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search questions (e.g. demo mode, selling holdings, oracles)..."
          className="w-full bg-[#0E0E12] border border-white/10 rounded-2xl px-5 py-3.5 pl-12 text-xs sm:text-sm text-white placeholder-white/40 focus:outline-none focus:border-emerald-500/50 font-mono"
        />
        <Search className="w-5 h-5 text-white/40 absolute left-4 top-3.5" />
      </div>

      {/* Accordion FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openItem === index;
          return (
            <div
              key={index}
              className="rounded-2xl bg-[#0E0E12] border border-white/10 overflow-hidden transition-all shadow-md"
            >
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
              >
                <span className="font-bold text-sm text-white">{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-white/50 transition-transform duration-200 shrink-0 ${
                    isOpen ? 'rotate-180 text-emerald-400' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-white/70 leading-relaxed border-t border-white/[0.04]">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
