import { AssetsTable } from '@/components/assets-table';

import stocks from '@/assets/stock-data.mock';

const sectors = [...new Set(stocks.map((stock) => stock.sector))];

export default function AssetsPage() {
  return (
    <main className="container mx-auto min-w-80 py-10">
      <div className="flex justify-between px-4">
        <h1 className="mb-2 font-bold text-3xl">Assets</h1>
      </div>

      <AssetsTable stocks={stocks} sectors={sectors} />
    </main>
  );
}
