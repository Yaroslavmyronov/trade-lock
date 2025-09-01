import { apiFetch } from '@/shared/api/fetchInstance';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { Trade } from '../model';

interface TradeResponse {
  hasMore: boolean;
  items: Trade[];
  nextCursor?: string | null;
}

export const tradeApi = {
  getListInfiniteQueryOptions: (direction: 'incoming' | 'outgoing') => {
    return infiniteQueryOptions({
      queryKey: ['trade', direction],
      queryFn: async ({ pageParam, signal }) => {
        return apiFetch<TradeResponse>(
          `/market/trades?nextCursor=${pageParam}&pageSize=10&direction=${direction}`,
          { signal },
        );
      },
      initialPageParam: '',
      getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
      select: (result) => {
        return result.pages.flatMap((page) => page.items || []);
      },
    });
  },
};
