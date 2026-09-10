import { Market } from '../types/market';

export const INITIAL_MARKETS: Market[] = [
  {
    id: 'mkt-btc-120k',
    title: 'Will Bitcoin reach $120,000 before December 31, 2026?',
    category: 'Crypto',
    description: 'Resolves to YES if the CoinGecko / Coinbase consolidated index price for BTC/USD reaches or exceeds $120,000.00 at any point prior to 23:59:59 UTC on December 31, 2026.',
    status: 'Active',
    yesProbability: 71,
    noProbability: 29,
    change24h: 3.8,
    volume24h: 1845200,
    totalVolume: 14250000,
    liquidity: 920000,
    closingDate: 'Dec 31, 2026',
    participantsCount: 8432,
    featured: true,
    trending: true,
    lastUpdated: 'Just now',
    resolutionSource: 'CoinGecko Consolidated Global VWAP & Coinbase Pro BTC/USD',
    resolutionSourceUrl: 'https://www.coingecko.com/en/coins/bitcoin',
    resolutionCriteria: 'The spot price must trade at or above $120,000.00 on supported spot order books. Flash wicks of under 3 seconds excluded if deemed liquidity anomalies by oracle concensus.',
    excludedConditions: 'Futures liquidation anomalies, exchange API downtime exceeding 4 hours without off-chain verification.',
    aiBrief: {
      summary: 'Institutional inflows into spot ETFs have accelerated by 24% month-over-month. On-chain supply illiquidity is at multi-year highs as long-term hodler cohorts retain 74% of circulating supply.',
      keyDrivers: [
        'Sustained global central bank rate cutting cycles boosting speculative assets',
        'Record inflows across sovereign wealth fund allocation desks',
        'Post-halving block subsidy crunch limiting miner sell-side liquidity'
      ],
      riskFactors: [
        'Macro risk-off shocks in broader US equities markets',
        'Unexpected regulatory enforcement in major offshore derivative platforms'
      ],
      sentimentBullish: 78,
      sources: [
        { name: 'Bloomberg Crypto Intelligence', url: 'https://bloomberg.com' },
        { name: 'CoinDesk Macro Research', url: 'https://coindesk.com' },
        { name: 'Glassnode On-Chain Analytics', url: 'https://glassnode.com' }
      ]
    },
    chartHistory: {
      '1D': [
        { time: '00:00', yesPrice: 0.67, noPrice: 0.33, volume: 120000 },
        { time: '04:00', yesPrice: 0.68, noPrice: 0.32, volume: 145000 },
        { time: '08:00', yesPrice: 0.66, noPrice: 0.34, volume: 190000 },
        { time: '12:00', yesPrice: 0.69, noPrice: 0.31, volume: 320000 },
        { time: '16:00', yesPrice: 0.70, noPrice: 0.30, volume: 480000 },
        { time: '20:00', yesPrice: 0.71, noPrice: 0.29, volume: 590000 }
      ],
      '1W': [
        { time: 'Day 1', yesPrice: 0.58, noPrice: 0.42, volume: 800000 },
        { time: 'Day 2', yesPrice: 0.61, noPrice: 0.39, volume: 950000 },
        { time: 'Day 3', yesPrice: 0.60, noPrice: 0.40, volume: 1100000 },
        { time: 'Day 4', yesPrice: 0.64, noPrice: 0.36, volume: 1300000 },
        { time: 'Day 5', yesPrice: 0.68, noPrice: 0.32, volume: 1400000 },
        { time: 'Day 6', yesPrice: 0.69, noPrice: 0.31, volume: 1600000 },
        { time: 'Day 7', yesPrice: 0.71, noPrice: 0.29, volume: 1845200 }
      ],
      '1M': [
        { time: 'Week 1', yesPrice: 0.44, noPrice: 0.56, volume: 2400000 },
        { time: 'Week 2', yesPrice: 0.51, noPrice: 0.49, volume: 3100000 },
        { time: 'Week 3', yesPrice: 0.62, noPrice: 0.38, volume: 4200000 },
        { time: 'Week 4', yesPrice: 0.71, noPrice: 0.29, volume: 5500000 }
      ],
      'ALL': [
        { time: 'Q1', yesPrice: 0.35, noPrice: 0.65, volume: 3000000 },
        { time: 'Q2', yesPrice: 0.48, noPrice: 0.52, volume: 4200000 },
        { time: 'Q3', yesPrice: 0.71, noPrice: 0.29, volume: 7050000 }
      ]
    },
    expertOpinions: [
      {
        id: 'exp-1',
        name: 'Elena Rostova',
        handle: '@elena_crypto',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        badge: 'Top Forecaster',
        stance: 'YES',
        probabilityEstimate: 78,
        rationale: 'Liquidity index shows massive institutional accumulation above $85k support. The $120k strike is mathematically within the 1-sigma standard deviation target for Q4.',
        likes: 342,
        timestamp: '2h ago'
      },
      {
        id: 'exp-2',
        name: 'Marcus Vance',
        handle: '@vance_macro',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
        badge: 'Macro Strategist',
        stance: 'NO',
        probabilityEstimate: 35,
        rationale: 'Bond yield re-steepening might choke high-beta tech valuations in late Autumn. $110k is realistic resistance before 2027.',
        likes: 118,
        timestamp: '5h ago'
      }
    ]
  },
  {
    id: 'mkt-agi-frontier',
    title: 'Will an open-weight AI model score >85% on the ARC-AGI-2 benchmark in 2026?',
    category: 'AI',
    description: 'Resolves to YES if a publicly released, open-weights foundation model achieves a certified score exceeding 85% on the official ARC Prize benchmark before Jan 1, 2027.',
    status: 'Active',
    yesProbability: 64,
    noProbability: 36,
    change24h: 5.4,
    volume24h: 960000,
    totalVolume: 6800000,
    liquidity: 480000,
    closingDate: 'Dec 31, 2026',
    participantsCount: 5210,
    featured: true,
    trending: true,
    lastUpdated: 'Just now',
    resolutionSource: 'Official ARC Prize Foundation Leaderboard (François Chollet)',
    resolutionSourceUrl: 'https://arcprize.org/leaderboard',
    resolutionCriteria: 'The evaluation must be verified by the official ARC Prize benchmark team on their blind test evaluation set.',
    excludedConditions: 'Test set data leakage or proprietary weights accessed via closed API without full weights download.',
    aiBrief: {
      summary: 'Test-time compute scaling and autonomous synthetic reasoning environments (like RLVR) have closed the gap with human abstract reasoning puzzles faster than anticipated.',
      keyDrivers: [
        'Open weights distillation from frontier reasoning models',
        'Massive programmatic synthesis of symbolic reasoning priors',
        'Dynamic search algorithm integration at inference'
      ],
      riskFactors: [
        'Plateauing performance on visual priors in the ARC-2 private test harness'
      ],
      sentimentBullish: 69,
      sources: [
        { name: 'ARC Prize Official Reports', url: 'https://arcprize.org' },
        { name: 'NeurIPS Reasoning Workshop', url: 'https://neurips.cc' }
      ]
    },
    chartHistory: {
      '1D': [
        { time: '00:00', yesPrice: 0.59, noPrice: 0.41, volume: 80000 },
        { time: '08:00', yesPrice: 0.61, noPrice: 0.39, volume: 140000 },
        { time: '16:00', yesPrice: 0.63, noPrice: 0.37, volume: 220000 },
        { time: '20:00', yesPrice: 0.64, noPrice: 0.36, volume: 310000 }
      ],
      '1W': [
        { time: 'Day 1', yesPrice: 0.52, noPrice: 0.48, volume: 400000 },
        { time: 'Day 4', yesPrice: 0.57, noPrice: 0.43, volume: 680000 },
        { time: 'Day 7', yesPrice: 0.64, noPrice: 0.36, volume: 960000 }
      ],
      '1M': [
        { time: 'Week 1', yesPrice: 0.38, noPrice: 0.62, volume: 1500000 },
        { time: 'Week 4', yesPrice: 0.64, noPrice: 0.36, volume: 2800000 }
      ],
      'ALL': [
        { time: 'Q1', yesPrice: 0.28, noPrice: 0.72, volume: 2100000 },
        { time: 'Q3', yesPrice: 0.64, noPrice: 0.36, volume: 4700000 }
      ]
    },
    expertOpinions: [
      {
        id: 'exp-3',
        name: 'Dr. Aris Thorne',
        handle: '@aris_ai',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
        badge: 'AI Research Lead',
        stance: 'YES',
        probabilityEstimate: 72,
        rationale: 'Recent progress in test-time Tree Search combined with self-verification is proving that ARC-AGI is solvable without brute memorization.',
        likes: 215,
        timestamp: '1h ago'
      }
    ]
  },
  {
    id: 'mkt-fed-rate-cut',
    title: 'Will the US Federal Reserve cut rates by ≥50 bps in the upcoming FOMC meeting?',
    category: 'Finance',
    description: 'Resolves to YES if the Federal Reserve Board announces a Federal Funds target rate reduction of 50 basis points or more following the upcoming FOMC statement.',
    status: 'Closing Soon',
    yesProbability: 38,
    noProbability: 62,
    change24h: -4.1,
    volume24h: 3100400,
    totalVolume: 18900000,
    liquidity: 1450000,
    closingDate: 'Sep 18, 2026',
    participantsCount: 11400,
    featured: true,
    trending: true,
    lastUpdated: 'Just now',
    resolutionSource: 'Federal Reserve Board Official Press Release',
    resolutionSourceUrl: 'https://federalreserve.gov/newsevents/pressreleases/monetary.htm',
    resolutionCriteria: 'The change in the target range upper bound announced in the post-meeting statement must be at least -0.50% from the preceding benchmark.',
    excludedConditions: 'Emergency unscheduled meetings taking place after the standard scheduled window.',
    aiBrief: {
      summary: 'Latest Core CPI print came in cooler at 2.4% annualized, but non-farm payroll revisions and retail sales remain resilient, reducing urgency for a jumbo 50 bps reduction.',
      keyDrivers: [
        'CME FedWatch tool pricing 25 bps at 78% probability',
        'Moderating wage growth indicators easing inflationary persistence'
      ],
      riskFactors: [
        'Hawkish dissent comments among regional Fed voting governors'
      ],
      sentimentBullish: 35,
      sources: [
        { name: 'CME Group FedWatch', url: 'https://cmegroup.com' },
        { name: 'Federal Reserve Statistical Release H.15', url: 'https://federalreserve.gov' }
      ]
    },
    chartHistory: {
      '1D': [
        { time: '00:00', yesPrice: 0.42, noPrice: 0.58, volume: 410000 },
        { time: '06:00', yesPrice: 0.41, noPrice: 0.59, volume: 620000 },
        { time: '12:00', yesPrice: 0.39, noPrice: 0.61, volume: 940000 },
        { time: '20:00', yesPrice: 0.38, noPrice: 0.62, volume: 1130000 }
      ],
      '1W': [
        { time: 'Day 1', yesPrice: 0.51, noPrice: 0.49, volume: 1200000 },
        { time: 'Day 4', yesPrice: 0.44, noPrice: 0.56, volume: 1800000 },
        { time: 'Day 7', yesPrice: 0.38, noPrice: 0.62, volume: 3100400 }
      ],
      '1M': [
        { time: 'Week 1', yesPrice: 0.55, noPrice: 0.45, volume: 4500000 },
        { time: 'Week 4', yesPrice: 0.38, noPrice: 0.62, volume: 8200000 }
      ],
      'ALL': [
        { time: 'Jul', yesPrice: 0.60, noPrice: 0.40, volume: 7000000 },
        { time: 'Sep', yesPrice: 0.38, noPrice: 0.62, volume: 18900000 }
      ]
    },
    expertOpinions: [
      {
        id: 'exp-4',
        name: 'Sarah Chen, CFA',
        handle: '@chen_capital',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
        badge: 'Institutional Macro',
        stance: 'NO',
        probabilityEstimate: 28,
        rationale: 'Powell will not risk re-igniting goods inflation before the quarterly press conference. 25 bps is locked.',
        likes: 420,
        timestamp: '3h ago'
      }
    ]
  },
  {
    id: 'mkt-ucl-final',
    title: 'Will Real Madrid win the UEFA Champions League title this season?',
    category: 'Sports',
    description: 'Resolves to YES if Real Madrid CF are officially crowned champions of the 2026/27 UEFA Champions League competition.',
    status: 'Active',
    yesProbability: 31,
    noProbability: 69,
    change24h: 1.2,
    volume24h: 750000,
    totalVolume: 4200000,
    liquidity: 320000,
    closingDate: 'Jun 05, 2027',
    participantsCount: 4620,
    featured: false,
    trending: false,
    lastUpdated: '1m ago',
    resolutionSource: 'UEFA Official Tournament Results',
    resolutionSourceUrl: 'https://www.uefa.com/uefachampionsleague',
    resolutionCriteria: 'Official winner as recorded on UEFA.com at the final whistle and trophy presentation.',
    excludedConditions: 'Any retroactive forfeiture occurring more than 30 days after the final match.',
    aiBrief: {
      summary: 'With their refreshed forward line and defensive depth, Real Madrid maintain the highest xG differential in European knockout simulations.',
      keyDrivers: ['Elite tournament pedigree', 'Deep bench depth for the multi-stage league phase'],
      riskFactors: ['Tough knockout bracket draw and domestic fixture congestion'],
      sentimentBullish: 45,
      sources: [
        { name: 'Opta Football Analytics', url: 'https://theanalyst.com' },
        { name: 'UEFA Press', url: 'https://uefa.com' }
      ]
    },
    chartHistory: {
      '1D': [
        { time: '00:00', yesPrice: 0.30, noPrice: 0.70, volume: 60000 },
        { time: '12:00', yesPrice: 0.31, noPrice: 0.69, volume: 140000 }
      ],
      '1W': [
        { time: 'Day 1', yesPrice: 0.28, noPrice: 0.72, volume: 300000 },
        { time: 'Day 7', yesPrice: 0.31, noPrice: 0.69, volume: 750000 }
      ],
      '1M': [
        { time: 'Week 1', yesPrice: 0.26, noPrice: 0.74, volume: 900000 },
        { time: 'Week 4', yesPrice: 0.31, noPrice: 0.69, volume: 1800000 }
      ],
      'ALL': [
        { time: 'Start', yesPrice: 0.25, noPrice: 0.75, volume: 2000000 },
        { time: 'Current', yesPrice: 0.31, noPrice: 0.69, volume: 4200000 }
      ]
    },
    expertOpinions: []
  },
  {
    id: 'mkt-starship-orbital',
    title: 'Will SpaceX complete a successful orbital propellant transfer in 2026?',
    category: 'Technology',
    description: 'Resolves to YES if SpaceX successfully conducts a ship-to-ship cryogenic propellant transfer in Earth orbit as verified by NASA Artemis program monitors.',
    status: 'Active',
    yesProbability: 82,
    noProbability: 18,
    change24h: 2.5,
    volume24h: 1120000,
    totalVolume: 5300000,
    liquidity: 610000,
    closingDate: 'Nov 30, 2026',
    participantsCount: 3890,
    featured: true,
    trending: true,
    lastUpdated: 'Just now',
    resolutionSource: 'NASA Artemis Program Announcements & FAA Orbital Flight Licensing',
    resolutionSourceUrl: 'https://www.nasa.gov/artemis-program/',
    resolutionCriteria: 'Official NASA confirmation of successful cryogenic fuel transfer between two Starship vehicles in orbital trajectory.',
    excludedConditions: 'Sub-orbital uncrewed internal manifold transfers.',
    aiBrief: {
      summary: 'Flight 5 and 6 demonstrated flawless booster catching and upper stage reignition in vacuum. The Starship HLS milestones demand orbital refueling before mid-2027.',
      keyDrivers: ['Contractual NASA Artemis III milestones', 'Accelerated Starbase Boca Chica launch cadence'],
      riskFactors: ['Boil-off management in microgravity and docking seal integrity'],
      sentimentBullish: 88,
      sources: [
        { name: 'NASA Flight Directives', url: 'https://nasa.gov' },
        { name: 'Aviation Week Space Tech', url: 'https://aviationweek.com' }
      ]
    },
    chartHistory: {
      '1D': [
        { time: '00:00', yesPrice: 0.80, noPrice: 0.20, volume: 90000 },
        { time: '12:00', yesPrice: 0.82, noPrice: 0.18, volume: 210000 }
      ],
      '1W': [
        { time: 'Day 1', yesPrice: 0.76, noPrice: 0.24, volume: 450000 },
        { time: 'Day 7', yesPrice: 0.82, noPrice: 0.18, volume: 1120000 }
      ],
      '1M': [
        { time: 'Week 1', yesPrice: 0.68, noPrice: 0.32, volume: 1200000 },
        { time: 'Week 4', yesPrice: 0.82, noPrice: 0.18, volume: 3400000 }
      ],
      'ALL': [
        { time: 'Q1', yesPrice: 0.55, noPrice: 0.45, volume: 2000000 },
        { time: 'Q3', yesPrice: 0.82, noPrice: 0.18, volume: 5300000 }
      ]
    },
    expertOpinions: []
  },
  {
    id: 'mkt-humanoid-robots',
    title: 'Will a Fortune 500 company deploy >1,000 humanoid robots in factory operations before end of 2026?',
    category: 'Technology',
    description: 'Resolves to YES if a company listed on the Fortune 500 confirms commercial active fleet deployment of at least 1,000 bipedal humanoid robots.',
    status: 'Active',
    yesProbability: 49,
    noProbability: 51,
    change24h: 6.2,
    volume24h: 890000,
    totalVolume: 3900000,
    liquidity: 410000,
    closingDate: 'Dec 31, 2026',
    participantsCount: 3120,
    featured: false,
    trending: true,
    lastUpdated: '3m ago',
    resolutionSource: 'Official Corporate SEC 10-K/10-Q Filings and Verified Press Releases',
    resolutionSourceUrl: 'https://www.sec.gov/edgar',
    resolutionCriteria: 'Must be bipedal humanoid robots actively operating on manufacturing, assembly, or logistics floors.',
    excludedConditions: 'Pilot lab demonstrations or wheeled automated guided vehicles (AGVs).',
    aiBrief: {
      summary: 'Agility Robotics, Figure AI, and Tesla Optimus teams have initiated pilot factory trials with BMW, Amazon, and Tesla Gigafactories.',
      keyDrivers: ['Rapid decline in actuator costs', 'End-to-end vision-language-action neural policies'],
      riskFactors: ['MTBF (Mean Time Between Failures) safety certifications'],
      sentimentBullish: 53,
      sources: [
        { name: 'Robotics Business Review', url: 'https://roboticsbusinessreview.com' }
      ]
    },
    chartHistory: {
      '1D': [
        { time: '00:00', yesPrice: 0.45, noPrice: 0.55, volume: 70000 },
        { time: '12:00', yesPrice: 0.49, noPrice: 0.51, volume: 160000 }
      ],
      '1W': [
        { time: 'Day 1', yesPrice: 0.41, noPrice: 0.59, volume: 320000 },
        { time: 'Day 7', yesPrice: 0.49, noPrice: 0.51, volume: 890000 }
      ],
      '1M': [
        { time: 'Week 1', yesPrice: 0.35, noPrice: 0.65, volume: 1100000 },
        { time: 'Week 4', yesPrice: 0.49, noPrice: 0.51, volume: 2400000 }
      ],
      'ALL': [
        { time: 'Start', yesPrice: 0.25, noPrice: 0.75, volume: 1500000 },
        { time: 'Current', yesPrice: 0.49, noPrice: 0.51, volume: 3900000 }
      ]
    },
    expertOpinions: []
  },
  {
    id: 'mkt-gold-ath',
    title: 'Will Gold spot price exceed $3,200/oz in 2026?',
    category: 'Finance',
    description: 'Resolves to YES if LBMA Gold Price PM or COMEX continuous gold futures spot quote trades above $3,200.00 USD/troy ounce.',
    status: 'Active',
    yesProbability: 57,
    noProbability: 43,
    change24h: 1.8,
    volume24h: 1250000,
    totalVolume: 6100000,
    liquidity: 520000,
    closingDate: 'Dec 31, 2026',
    participantsCount: 4200,
    featured: false,
    trending: false,
    lastUpdated: '1m ago',
    resolutionSource: 'LBMA (London Bullion Market Association) Daily Fix & COMEX Gold Spot',
    resolutionSourceUrl: 'https://www.lbma.org.uk/prices-and-data',
    resolutionCriteria: 'Official PM fixing or official CME COMEX trade record exceeding $3,200.00.',
    excludedConditions: 'Futures rollover premium spreads without spot equivalence.',
    aiBrief: {
      summary: 'Central bank purchases led by Asian reserve managers continue at historical records, maintaining solid bids beneath geopolitical pullbacks.',
      keyDrivers: ['Sovereign reserve diversification away from fiat paper reserves', 'Lower real interest yields globally'],
      riskFactors: ['Sudden dollar strength spike if economic growth decouples from expectations'],
      sentimentBullish: 61,
      sources: [
        { name: 'World Gold Council Demand Trends', url: 'https://gold.org' }
      ]
    },
    chartHistory: {
      '1D': [
        { time: '00:00', yesPrice: 0.55, noPrice: 0.45, volume: 90000 },
        { time: '12:00', yesPrice: 0.57, noPrice: 0.43, volume: 220000 }
      ],
      '1W': [
        { time: 'Day 1', yesPrice: 0.52, noPrice: 0.48, volume: 410000 },
        { time: 'Day 7', yesPrice: 0.57, noPrice: 0.43, volume: 1250000 }
      ],
      '1M': [
        { time: 'Week 1', yesPrice: 0.46, noPrice: 0.54, volume: 1800000 },
        { time: 'Week 4', yesPrice: 0.57, noPrice: 0.43, volume: 3900000 }
      ],
      'ALL': [
        { time: 'Start', yesPrice: 0.40, noPrice: 0.60, volume: 2500000 },
        { time: 'Current', yesPrice: 0.57, noPrice: 0.43, volume: 6100000 }
      ]
    },
    expertOpinions: []
  },
  {
    id: 'mkt-avatar3-record',
    title: 'Will Avatar 3 surpass $2.0 Billion at the worldwide box office?',
    category: 'Entertainment',
    description: 'Resolves to YES if Avatar: Fire and Ash grosses more than $2,000,000,000 in global box office receipts according to Box Office Mojo within 180 days of theatrical release.',
    status: 'Active',
    yesProbability: 76,
    noProbability: 24,
    change24h: 0.8,
    volume24h: 420000,
    totalVolume: 2100000,
    liquidity: 280000,
    closingDate: 'Jul 30, 2026',
    participantsCount: 2190,
    featured: false,
    trending: false,
    lastUpdated: '12m ago',
    resolutionSource: 'Box Office Mojo by IMDbPro',
    resolutionSourceUrl: 'https://www.boxofficemojo.com',
    resolutionCriteria: 'Lifetime worldwide gross exceeding $2,000,000,000.00 as reported by Box Office Mojo.',
    excludedConditions: 'Re-releases taking place after the 180-day initial window.',
    aiBrief: {
      summary: 'Both prior installments achieved over $2.3B worldwide with immense international and IMAX market legs. Pre-release tracking indicates high multi-quadrant anticipation.',
      keyDrivers: ['James Cameron historical box office resilience', 'Record IMAX and premium screen pre-commitments'],
      riskFactors: ['Foreign exchange currency headwinds in major European and Asian territories'],
      sentimentBullish: 82,
      sources: [
        { name: 'Deadline Hollywood Box Office Tracking', url: 'https://deadline.com' }
      ]
    },
    chartHistory: {
      '1D': [
        { time: '00:00', yesPrice: 0.75, noPrice: 0.25, volume: 40000 },
        { time: '12:00', yesPrice: 0.76, noPrice: 0.24, volume: 90000 }
      ],
      '1W': [
        { time: 'Day 1', yesPrice: 0.72, noPrice: 0.28, volume: 180000 },
        { time: 'Day 7', yesPrice: 0.76, noPrice: 0.24, volume: 420000 }
      ],
      '1M': [
        { time: 'Week 1', yesPrice: 0.69, noPrice: 0.31, volume: 750000 },
        { time: 'Week 4', yesPrice: 0.76, noPrice: 0.24, volume: 1500000 }
      ],
      'ALL': [
        { time: 'Start', yesPrice: 0.65, noPrice: 0.35, volume: 1000000 },
        { time: 'Current', yesPrice: 0.76, noPrice: 0.24, volume: 2100000 }
      ]
    },
    expertOpinions: []
  },
  {
    id: 'mkt-election-resolved',
    title: 'Did the UK general parliamentary election conclude before August 2026?',
    category: 'Politics',
    description: 'Resolves to YES if the general election to the UK Parliament took place and official electoral commission results were verified before August 1, 2026.',
    status: 'Resolved',
    yesProbability: 100,
    noProbability: 0,
    change24h: 0,
    volume24h: 0,
    totalVolume: 9800000,
    liquidity: 0,
    closingDate: 'Resolved Aug 2026',
    participantsCount: 7800,
    featured: false,
    trending: false,
    lastUpdated: 'Resolved',
    resolutionSource: 'UK Electoral Commission Official Results',
    resolutionSourceUrl: 'https://www.electoralcommission.org.uk',
    resolutionCriteria: 'Election completed and verified by the Returning Officers of the United Kingdom.',
    excludedConditions: 'None.',
    aiBrief: {
      summary: 'Market has successfully resolved to YES following the certified results of the general election.',
      keyDrivers: ['Certification by Returning Officers', 'New government formed and parliament opened'],
      riskFactors: [],
      sentimentBullish: 100,
      sources: [
        { name: 'BBC News Elections Desk', url: 'https://bbc.com/news' }
      ]
    },
    chartHistory: {
      '1D': [{ time: 'Close', yesPrice: 1.0, noPrice: 0.0, volume: 0 }],
      '1W': [{ time: 'Close', yesPrice: 1.0, noPrice: 0.0, volume: 0 }],
      '1M': [{ time: 'Close', yesPrice: 1.0, noPrice: 0.0, volume: 0 }],
      'ALL': [{ time: 'Resolved', yesPrice: 1.0, noPrice: 0.0, volume: 9800000 }]
    },
    expertOpinions: []
  }
];
