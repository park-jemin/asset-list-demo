import { Badge } from '@/components/ui/badge';
import type { ESGRating } from '@/types';

export const esgRatingColors: Record<ESGRating, string> = {
  AAA: 'bg-green-800/90 text-white',
  AA: 'bg-green-700 text-white',
  A: 'bg-yellow-500 text-black',
  BBB: 'bg-yellow-400 text-black',
  BB: 'bg-yellow-300 text-black',
  B: 'bg-red-500 text-white',
  CCC: 'bg-red-600 text-white',
};

export function ESGBadge({ rating }: { rating: ESGRating }) {
  const colors = esgRatingColors[rating];
  return (
    <Badge variant="no-hover:default" className={`${colors} w-12 justify-center`}>
      {rating}
    </Badge>
  );
}
