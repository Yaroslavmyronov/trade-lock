import { apiFetch } from '@/shared/api/fetchInstance';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { MarketNftResponse } from '../types';
import { defaultSortOption } from '@/shared/ui/FilterPanel/SortOptions';

export const marketNftsApi = {
  getListInfiniteQueryOptions: ({
    sort = defaultSortOption.sort,
    order = defaultSortOption.order,
    searchText = '',
  }: {
    sort?: string;
    order?: 'asc' | 'desc';
    searchText?: string;
  }) => {
    return infiniteQueryOptions({
      queryKey: ['market', { sort, order, searchText }], // ✅ unique per sort/order
      queryFn: async ({ pageParam = 1, signal }) => {
        return apiFetch<MarketNftResponse>(
          `/market/market-listing?page=${pageParam}&pageSize=10&sortBy=${sort}&orderBy=${order}&search=${searchText}`,
          { signal },
        );
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
      select: (result) => result.pages.flatMap((page) => page),
    });
  },
};
