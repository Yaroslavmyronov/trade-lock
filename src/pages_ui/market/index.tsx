import { getMarketNfts } from '@/shared/api/market-nfts';
import { Market } from '@/widgets/Market';

export const MarketPage = async () => {
  const data = await getMarketNfts();
  console.log('data', data);
  return <Market />;
};
