import { useMemo, useState } from 'react';

const DEFAULT_ITEMS_PER_PAGE = 10;

// Very basic pagination hook (no query params)
export function usePagination<T>(origin: T[], { itemsPerPage = DEFAULT_ITEMS_PER_PAGE } = {}) {
  const [page, setPage] = useState(1);

  const paginatedData = useMemo(() => {
    const startIndex = (page - 1) * itemsPerPage;
    return origin.slice(startIndex, startIndex + itemsPerPage);
  }, [origin, itemsPerPage, page]);

  const totalPages = Math.ceil(origin.length / itemsPerPage);

  return {
    data: paginatedData,
    page,
    setPage,
    totalPages,
  } as const;
}
