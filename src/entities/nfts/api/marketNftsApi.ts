import { apiFetch } from '@/shared/api/fetchInstance';
import { defaultSortOption } from '@/shared/ui/FilterPanel/SortOptions';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { MarketNftResponse } from '../types';

export const marketNftsApi = {
  getListInfiniteQueryOptions: ({
    sort = defaultSortOption.sort,
    order = defaultSortOption.order,
    searchText = '',
    minPrice = '',
    maxPrice = '',
    excludeSelf = false,
  }: {
    sort?: string;
    order?: 'asc' | 'desc';
    searchText?: string;
    minPrice?: number | string;
    maxPrice?: number | string;
    excludeSelf?: boolean;
  }) => {
    return infiniteQueryOptions({
      queryKey: [
        'market',
        { sort, order, searchText, minPrice, maxPrice, excludeSelf },
      ],
      queryFn: async ({ pageParam = 1, signal }) => {
        return apiFetch<MarketNftResponse>(
          `/market/market-listing?page=${pageParam}&pageSize=20&sortBy=${sort}&orderBy=${order}&search=${searchText}&minPrice=${minPrice}&maxPrice=${maxPrice}&excludeSelf=${excludeSelf}`,
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
