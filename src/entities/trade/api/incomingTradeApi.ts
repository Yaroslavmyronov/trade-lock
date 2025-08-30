import { apiFetch } from '@/shared/api/fetchInstance';
import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { Trade } from '../model';

export const tradeApi = {
  getListQueryOptions: (direction: 'incoming' | 'outgoing') => {
    return queryOptions({
      queryKey: ['trade', 'incoming', 'outgoing'],
      queryFn: async ({ pageParam = 1, signal }) => {
        return apiFetch<Trade[]>(
          `/market/trades?page=${pageParam}&pageSize=20&direction=${direction}`,
          {
            signal,
          },
        );
      },
      placeholderData: keepPreviousData,
    });
  },
};
