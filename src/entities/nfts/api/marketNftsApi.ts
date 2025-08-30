import { apiFetch } from '@/shared/api/fetchInstance';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { MarketNftResponse } from '../types';

export const marketNftsApi = {
  getListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ['market'],
      queryFn: async ({ pageParam = 1, signal }) => {
        return apiFetch<MarketNftResponse>(
          `/market/market-listing?page=${pageParam}&pageSize=10`,
          { signal },
        );
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        console.log('lastPage', lastPage);
        return lastPage.length ? allPages.length + 1 : undefined;
      },
      select: (result) => {
        return result.pages.flatMap((page) => page);
      },
    });
  },
};
