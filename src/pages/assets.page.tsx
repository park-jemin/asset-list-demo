import { useMemo, useState } from 'react';

import type { Stock } from '@/types';

import stocks from '@/assets/stock-data.mock';

/** Ordinarily, I would delegate this to an API, but for the purposes of a demo: */
function computeSearchResults(stocks: Stock[], searchTerm: string): Stock[] {
  const term = searchTerm.toLowerCase();
  return stocks.filter((stock) => {
    return stock.ticker.toLowerCase().includes(term) || stock.name.toLowerCase().includes(term);
  });
}

export default function AssetsPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const searchResults = useMemo(
    () => computeSearchResults(stocks, searchTerm),
    [stocks, searchTerm]
  );

  return (
    <main className="container mx-auto min-w-80 py-10">
      <div className="flex justify-between px-4">
        <h1 className="mb-2 font-bold text-3xl">Assets</h1>
      </div>

      <section className="space-y-4 p-4">
        <div className="flex flex-col gap-4 sm:flex-row">
          <input
            type="text"
            placeholder="Search by ticker or company name"
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="rounded-md border">
          {searchResults.map((stock) => {
            return (
              <div key={stock.ticker} className="flex items-center justify-between border-b p-4">
                <div>
                  <h2 className="font-bold text-lg">{stock.name}</h2>
                  <p className="text-sm">{stock.ticker}</p>
                </div>
                <div className="flex items-center">
                  <p className="font-bold text-lg">{stock.price}</p>
                  <p
                    className={`ml-2 font-bold ${
                      stock.change > 0 ? 'text-green-700' : 'text-destructive'
                    }`}
                  >
                    {stock.change} ({stock.percentChange}%)
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}
