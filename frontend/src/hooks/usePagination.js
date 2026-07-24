import { useMemo, useState } from 'react';

export function usePagination(items = [], pageSize = 12) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const safeSetPage = (p) => setPage(Math.min(Math.max(1, p), totalPages));

  return {
    page: Math.min(page, totalPages),
    setPage: safeSetPage,
    totalPages,
    pageItems,
    total: items.length,
  };
}

export default usePagination;
