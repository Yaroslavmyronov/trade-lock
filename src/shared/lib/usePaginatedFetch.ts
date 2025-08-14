import { useCallback, useEffect, useRef, useState } from 'react';
import { useFetch } from './useFetch';

export type ApiResponse<T, Extra = object> = {
  response: T[];
} & Extra;

export function usePaginatedFetch<T, Extra = object>(
  baseUrl: string,
  initialPage = 1,
  limit = 20,
  config?: RequestInit,
  initialData?: T[],
) {
  const [page, setPage] = useState(initialPage);
  const [items, setItems] = useState<T[]>(initialData || []);
  const [hasMore, setHasMore] = useState<boolean | null>(null);

  const skipFetch = !!initialData && page === initialPage;
  const url = `${baseUrl}?page=${page}&pageSize=${limit}`;

  const { data, error, loading } = useFetch<ApiResponse<T, Extra>>(
    url,
    config,
    skipFetch,
  );

  const isFirstLoad = page === initialPage && loading && !initialData;

  useEffect(() => {
    if (!skipFetch && data?.response) {
      setItems((prev) => {
        const newItems = [...prev, ...data.response];

        return Array.from(
          new Map(
            newItems.map((item) => [JSON.stringify(item), item]),
          ).values(),
        );
      });
      setHasMore(data.response.length === limit);
    } else {
      console.warn('Data is not an array or is null:', data);
    }
  }, [data]);

  const loadMore = useCallback(() => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  }, [hasMore, loading]);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loadMore, hasMore, loading],
  );

  return {
    data,
    items,
    error,
    loading,
    hasMore,
    loadMore,
    lastElementRef,
    isFirstLoad,
  };
}
