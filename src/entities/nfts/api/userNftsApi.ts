import { apiFetch } from '@/shared/api/fetchInstance';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { UserNftResponse } from '../types';

type UserNftsApiResponse = {
  hasMore: boolean;
  items: UserNftResponse;
  nextCursor?: string | null;
  nftAmount: number;
  totalValue: number;
};

export const userNftsApi = {
  getListInfiniteQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ['user'],
      queryFn: async ({ pageParam, signal }) => {
        return apiFetch<UserNftsApiResponse>(
          `/market/user-tokens?nextCursor=${pageParam}&pageSize=20`,
          { signal },
        );
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      select: (result) => {
        console.log('userNftsApi', result);
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
