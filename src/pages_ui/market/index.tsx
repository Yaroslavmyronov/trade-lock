import { getMarketNfts } from '@/shared/api/market-nfts';
import { Market } from '@/widgets/market';

export const MarketPage = async () => {
  const marketNfts = await getMarketNfts();
  console.log('data', marketNfts);
  return <Market initialNfts={marketNfts} />;
};
