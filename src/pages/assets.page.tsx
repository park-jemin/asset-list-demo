import { useEffect } from 'react';

import { AssetsTable } from '@/components/assets-table';
import { Button } from '@/components/ui/button';
import { useAuthentication } from '@/hooks/use-authentication';

import stocks from '@/assets/stock-data.mock';

const sectors = [...new Set(stocks.map((stock) => stock.sector))];

export default function AssetsPage() {
  const { logout } = useAuthentication();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="container mx-auto min-w-80 py-8 sm:py-10">
      <div className="flex justify-between px-3 sm:px-4">
        <h1 className="mb-2 font-bold text-3xl">Assets</h1>
        <Button type="button" variant="outline" onClick={logout}>
          Log out
        </Button>
      </div>

      <AssetsTable stocks={stocks} sectors={sectors} />
    </main>
  );
}
