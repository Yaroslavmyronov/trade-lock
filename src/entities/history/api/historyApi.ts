import { apiFetch } from '@/shared/api/fetchInstance';
import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { History } from '../model/type';

export interface HistoryResponse {
  history: History[];
  totalPages: number;
}

export const historyApi = {
  getListQueryOptions: (page: number) => {
    return queryOptions({
      queryKey: ['history', page],
      queryFn: async ({ signal }) => {
        return apiFetch<HistoryResponse>(
          `/market/history?page=${page}&pageSize=10`,
          {
            signal,
          },
        );
      },
      placeholderData: keepPreviousData,
    });
  },
};
