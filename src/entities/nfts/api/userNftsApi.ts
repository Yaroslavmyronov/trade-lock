import { apiFetch } from '@/shared/api/fetchInstance';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { UserNftResponse } from '../types';
import { defaultSortOption } from '@/shared/ui/FilterPanel/SortOptions';

type UserNftsApiResponse = {
  hasMore: boolean;
  items: UserNftResponse;
  nextCursor?: string | null;
  nftAmount: number;
  totalValue: number;
};

export const userNftsApi = {
  getListInfiniteQueryOptions: ({
    searchText = '',
    sort = defaultSortOption.sort,
    order = defaultSortOption.order,
    minPrice = '',
    maxPrice = '',
  }: {
    searchText?: string;
    sort?: string;
    order?: 'asc' | 'desc';
    minPrice?: number | string;
    maxPrice?: number | string;
  }) => {
    return infiniteQueryOptions({
      queryKey: ['user', { searchText, sort, order, minPrice, maxPrice }],
      queryFn: async ({ pageParam, signal }) => {
        return apiFetch<UserNftsApiResponse>(
          `/market/user-tokens?nextCursor=${pageParam}&pageSize=20&search=${searchText}&sortBy=${sort}&orderBy=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
          { signal },
        );
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      select: (result) => {
        const firstPage = result.pages[0];

        return {
          response: result.pages.flatMap((page) => page.items || []),
          nftAmount: firstPage?.nftAmount ?? 0,
          totalValue: firstPage?.totalValue ?? 0,
        };
      },
    });
  },
};
