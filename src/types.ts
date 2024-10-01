export type ESGRating = 'AAA' | 'AA' | 'A' | 'BBB' | 'BB' | 'B' | 'CCC';

export type Stock = {
  ticker: string;
  name: string;
  price: number;
  change: number;
  percentChange: number;
  marketCap: number;
  sector: string;
  esgRating: ESGRating;
};
