import { apiFetch } from '@/shared/api/fetchInstance';
import { cookies } from 'next/headers';

export const getMarketNfts = async () => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore.toString();

  const nftsData = await apiFetch('/market/market-listing', {
    headers: { Cookie: cookieHeader },
  });
  return nftsData;
};
