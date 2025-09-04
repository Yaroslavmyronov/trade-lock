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
    seller = '',
    excludeSelf = false,
  }: {
    sort?: string;
    order?: 'asc' | 'desc';
    searchText?: string;
    minPrice?: number | string;
    maxPrice?: number | string;
    excludeSelf?: boolean;
    seller?: string;
  }) => {
    return infiniteQueryOptions({
      queryKey: [
        'market',
        { sort, order, searchText, minPrice, maxPrice, excludeSelf },
      ],
      queryFn: async ({ pageParam, signal }) => {
        return apiFetch<MarketNftResponse>(
          `/market/market-listing?nextCursor=${pageParam}&pageSize=20&sortBy=${sort}&orderBy=${order}&search=${searchText}&minPrice=${minPrice}&maxPrice=${maxPrice}&excludeSelf=${excludeSelf}&seller=${seller}`,
          { signal },
        );
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      select: (result) => {
        return {
          hasMore: result.pages[0].hasMore,
          items: result.pages.flatMap((page) => page.items || []),
          nextCursor: result.pages[0].nextCursor,
        };
      },
    });
  },
};
