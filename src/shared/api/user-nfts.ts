import { apiFetch } from '@/shared/api/fetchInstance';
import { cookies } from 'next/headers';

export const getUserNfts = async () => {
  const cookieStore = await cookies();

  const cookieHeader = cookieStore.toString();

  const nftsData = await apiFetch('/market/get-user-tokens', {
    headers: { Cookie: cookieHeader },
  });
  return nftsData;
};
