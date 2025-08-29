import { MarketNftResponse } from '../types';

export type PaginatedResult<T> = {
  data: T;
  first: number;
  items: number;
  last: number;
  next: number | null;
  pages: number;
  prev: number | null;
};

export const marketNftsApi = {
  getList: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal },
  ) => {
    return fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/market/market-listing?page=${page}`,
      {
        signal,
      },
    ).then((res) => res.json() as Promise<PaginatedResult<MarketNftResponse>>);
  },
};
