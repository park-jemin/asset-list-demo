import { ArrowDown, ArrowUp, ArrowUpDown, Info, ListFilter } from 'lucide-react';
import { memo, useCallback, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { ESGBadge } from './esg-badge';
import { FilterMenu } from './filter-menu';
import { esgRatings, formatChange, formatMarketCap } from './utils';

import type { ESGRating, Stock } from '@/types';

type Props = {
  stocks: Stock[];
  sectors: string[];
};

type Sort = {
  column: keyof Stock;
  direction: 'asc' | 'desc';
};

type Filter = {
  sectors: string[];
  esg: ESGRating[];
};

/** Ordinarily, I would delegate this to an API, but for the purposes of a demo: */
function computeSearchResults(
  stocks: Stock[],
  searchTerm: string,
  filters: Filter,
  sort: Sort
): Stock[] {
  return stocks
    .filter((stock) => {
      const matchesSearch =
        stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSector = filters.sectors.length === 0 || filters.sectors.includes(stock.sector);
      const matchesESG = filters.esg.length === 0 || filters.esg.includes(stock.esgRating);
      return matchesSearch && matchesSector && matchesESG;
    })
    .sort((a, b) => {
      if (sort.column === 'esgRating') {
        return (
          (sort.direction === 'asc' ? 1 : -1) *
          (esgRatings.indexOf(a.esgRating) - esgRatings.indexOf(b.esgRating))
        );
      }
      if (a[sort.column] < b[sort.column]) return sort.direction === 'asc' ? -1 : 1;
      if (a[sort.column] > b[sort.column]) return sort.direction === 'asc' ? 1 : -1;
      return 0;
    });
}

const SortIcon = memo(({ name, column, direction }: { name: keyof Stock } & Sort) => {
  if (column !== name) return <ArrowUpDown className="ml-2 h-4 w-4" />;
  if (direction === 'asc') return <ArrowUp className="ml-2 h-4 w-4" />;
  return <ArrowDown className="ml-2 h-4 w-4" />;
});

const AssetsHeader = memo(
  ({ column, direction, onSort }: { onSort: (column: keyof Stock) => void } & Sort) => (
    // TODO: buttons should be made to sort on click
    <TableHeader>
      <TableRow>
        <TableHead className="w-[180px]">
          <Button
            type="button"
            onClick={() => onSort('ticker')}
            variant="ghost"
            className="px-2 font-semibold hover:bg-transparent"
          >
            Ticker
            <SortIcon name="ticker" column={column} direction={direction} />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            type="button"
            onClick={() => onSort('name')}
            variant="ghost"
            className="px-1 font-semibold hover:bg-transparent"
          >
            Company Name
            <SortIcon name="name" column={column} direction={direction} />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            type="button"
            onClick={() => onSort('price')}
            variant="ghost"
            className="px-1 font-semibold hover:bg-transparent"
          >
            Price
            <SortIcon name="price" column={column} direction={direction} />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            type="button"
            onClick={() => onSort('change')}
            variant="ghost"
            className="px-1 font-semibold hover:bg-transparent"
          >
            Change
            <SortIcon name="change" column={column} direction={direction} />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            type="button"
            onClick={() => onSort('percentChange')}
            variant="ghost"
            className="px-1 font-semibold hover:bg-transparent"
          >
            % Chg
            <SortIcon name="percentChange" column={column} direction={direction} />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            type="button"
            onClick={() => onSort('marketCap')}
            variant="ghost"
            className="px-0 font-semibold hover:bg-transparent"
          >
            Mkt Cap
            <SortIcon name="marketCap" column={column} direction={direction} />
          </Button>
        </TableHead>
        <TableHead>
          <Button
            type="button"
            onClick={() => onSort('sector')}
            variant="ghost"
            className="px-0 font-semibold hover:bg-transparent"
          >
            Sector
            <SortIcon name="sector" column={column} direction={direction} />
          </Button>
        </TableHead>

        <TableHead>
          <Button
            // Consider a tooltip here
            type="button"
            onClick={() => onSort('esgRating')}
            variant="ghost"
            className="cursor-help px-0 font-semibold hover:bg-transparent"
          >
            ESG Score
            <SortIcon name="esgRating" column={column} direction={direction} />
            <Info className="ml-2 h-4 w-4" />
          </Button>
        </TableHead>
      </TableRow>
    </TableHeader>
  )
);

const AssetRow = memo(({ stock }: { stock: Stock }) => (
  <TableRow key={stock.ticker} className="h-[74px]">
    <TableCell className="font-medium">
      <div className="flex items-center space-x-2">
        <img
          // This is not exhaustive (see FB), but they offer most logos across exchanges as far as I see
          src={`https://logo.synthfinance.com/ticker/${stock.ticker}`}
          alt={`${stock.ticker} logo`}
          width={24}
          height={24}
        />
        <span>{stock.ticker}</span>
      </div>
    </TableCell>
    <TableCell>{stock.name}</TableCell>
    <TableCell>${stock.price.toFixed(2)}</TableCell>
    <TableCell className={stock.change >= 0 ? 'text-green-700' : 'text-red-600'}>
      {formatChange(stock.change)}
    </TableCell>
    <TableCell className={stock.percentChange >= 0 ? 'text-green-700' : 'text-red-600'}>
      {formatChange(stock.percentChange)}%
    </TableCell>
    <TableCell>{formatMarketCap(stock.marketCap)}</TableCell>
    <TableCell>{stock.sector}</TableCell>
    <TableCell>
      <ESGBadge rating={stock.esgRating} />
    </TableCell>
  </TableRow>
));

export function AssetsTable({ stocks, sectors }: Props) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sort, setSort] = useState<{ column: keyof Stock; direction: 'asc' | 'desc' }>({
    column: 'ticker',
    direction: 'asc',
  });
  const [filters, setFilters] = useState<Filter>({
    sectors: [],
    esg: [],
  });

  const searchResults = useMemo(
    () => computeSearchResults(stocks, searchTerm, filters, sort),
    [stocks, searchTerm, filters, sort]
  );

  const handleSort = (column: keyof Stock) => {
    if (column === sort.column) {
      setSort((prev) => ({ ...prev, direction: prev.direction === 'asc' ? 'desc' : 'asc' }));
    } else {
      setSort({ column, direction: 'asc' });
    }
  };

  const applyFilters = useCallback((filters: Filter) => {
    setFilters(filters);
  }, []);

  return (
    <section className="space-y-4 p-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Input
          type="text"
          value={searchTerm}
          placeholder="Search by ticker or company name"
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full lg:max-w-lg"
        />

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline">
              <ListFilter className="mr-2 h-4 w-4" /> Filters
            </Button>
          </PopoverTrigger>

          <PopoverContent className="w-80">
            <FilterMenu sectors={sectors} onApply={applyFilters} />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border">
        <Table>
          <AssetsHeader onSort={handleSort} column={sort.column} direction={sort.direction} />

          <TableBody>
            {searchResults.map((stock) => (
              <AssetRow key={stock.ticker} stock={stock} />
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
}
