import type { ESGRating } from '@/types';

export const esgRatings: ESGRating[] = ['AAA', 'AA', 'A', 'BBB', 'BB', 'B', 'CCC'];

export const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1e12) return `$${(marketCap / 1e12).toFixed(2)}T`;
  if (marketCap >= 1e9) return `$${(marketCap / 1e9).toFixed(2)}B`;
  if (marketCap >= 1e6) return `$${(marketCap / 1e6).toFixed(2)}M`;
  return `$${marketCap.toFixed(2)}`;
};

export const formatChange = (change: number) => (change >= 0 ? '+' : '') + change.toFixed(2);
