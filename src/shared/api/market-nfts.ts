import { apiFetch } from '@/shared/api/fetchInstance';
import { cookies } from 'next/headers';

export const getMarketNfts = async () => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();

  return await apiFetch('/market/market-listing?page=1&pageSize=20', {
    headers: { Cookie: cookieHeader },
  });
};
