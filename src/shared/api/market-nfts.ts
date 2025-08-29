import { apiFetch } from '@/shared/api/fetchInstance';
import { cookies } from 'next/headers';

export type GetMarketNftsParams = {
  page?: number;
  pageSize?: number;
  excludeSelf?: boolean;
};

export const getMarketNfts = async (params: GetMarketNftsParams = {}) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  const queryObj: Record<string, string> = {
    page: String(params.page ?? 1),
    pageSize: String(params.pageSize ?? 20),
    excludeSelf: String(params.excludeSelf ?? false),
  };

  const query = new URLSearchParams(queryObj).toString();

  return await apiFetch(`/market/market-listing?${query}`, {
    headers: { Cookie: cookieHeader },
  });
};
