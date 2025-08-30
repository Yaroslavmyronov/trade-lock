import { apiFetch } from '@/shared/api/fetchInstance';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { UserNftResponse } from '../types';

type UserNftsApiResponse = {
  nftAmount: number;
  response: UserNftResponse;
  totalValue: number;
};

export const userNftsApi = {
  getListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ['user'],
      queryFn: async ({ pageParam = 1, signal }) => {
        return apiFetch<UserNftsApiResponse>(
          `/market/user-tokens?page=${pageParam}&pageSize=20`,
          { signal },
        );
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.response.length ? allPages.length + 1 : undefined;
      },
      select: (result) => {
        const firstPage = result.pages[0];

        return {
          response: result.pages.flatMap((page) => page.response),
          nftAmount: firstPage?.nftAmount ?? 0,
          totalValue: firstPage?.totalValue ?? 0,
        };
      },
    });
  },
};
