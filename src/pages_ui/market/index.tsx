import { getMarketNfts } from '@/shared/api/market-nfts';
import { Market } from '@/widgets/market';

export const MarketPage = async () => {
  const { data: marketNfts, error } = await getMarketNfts();
  if (error) {
    console.log('error', error);
    return (
      <div className="flex size-full items-center justify-center">
        Failed to load NFT. Try again later.
      </div>
    );
  }
  return <Market initialNfts={marketNfts} />;
};
