import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { memo } from 'react';

type Props = {
  current: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onChange: (page: number) => void;
};

const MAX_VISIBLE_PAGES = 5;

function calculateRange(current: number, totalPages: number) {
  let startPage = Math.max(current - Math.floor(MAX_VISIBLE_PAGES / 2), 1);
  const endPage = Math.min(startPage + MAX_VISIBLE_PAGES - 1, totalPages);

  if (endPage - startPage + 1 < MAX_VISIBLE_PAGES) {
    startPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1);
  }

  return { startPage, endPage };
}

export const Pagination = memo(
  ({ current, totalPages, itemsPerPage, totalItems, onChange }: Props) => {
    const { startPage, endPage } = calculateRange(current, totalPages);

    const middle = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);

    return (
      <div className="flex items-center justify-between">
        <span>
          Showing {(current - 1) * itemsPerPage + 1} to{' '}
          {Math.min(current * itemsPerPage, totalItems)} of {totalItems} results
        </span>
        <nav className="flex space-x-2">
          <Button
            key="first"
            aria-label="Go to first page"
            variant="outline"
            onClick={() => onChange(1)}
            disabled={current === 1}
          >
            <ChevronsLeft className="h-4 w-4" />
          </Button>

          <Button
            key="prev"
            aria-label="Go to previous page"
            variant="outline"
            onClick={() => onChange(Math.max(current - 1, 1))}
            disabled={current === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {middle.map((i) => (
            <Button
              key={i}
              aria-label={`Go to page ${i}`}
              variant={i === current ? 'default' : 'outline'}
              onClick={() => onChange(i)}
            >
              {i}
            </Button>
          ))}

          <Button
            key="next"
            aria-label="Go to next page"
            variant="outline"
            onClick={() => onChange(Math.min(current + 1, totalPages))}
            disabled={current === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          <Button
            key="last"
            aria-label="Go to last page"
            variant="outline"
            onClick={() => onChange(totalPages)}
            disabled={current === totalPages}
          >
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </nav>
      </div>
    );
  }
);
