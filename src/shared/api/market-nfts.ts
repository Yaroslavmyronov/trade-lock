import { MarketNftResponse } from '@/entities/nfts/types';
import { apiFetch } from '@/shared/api/fetchInstance';
import { cookies } from 'next/headers';

export type GetMarketNftsParams = {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: 'asc' | 'desc';
  excludeSelf?: boolean;
};

export const getMarketNfts = async (params: GetMarketNftsParams = {}) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const queryObj: Record<string, string> = {
    page: String(params.page ?? 1),
    pageSize: String(params.pageSize ?? 10),
    excludeSelf: String(params.excludeSelf ?? false),
    sort: params.sort ?? '',
    order: params.order ?? '',
  };

  const query = new URLSearchParams(queryObj).toString();

  return await apiFetch<MarketNftResponse>(`/market/market-listing?${query}`, {
    headers: { Cookie: cookieHeader },
  });
};
