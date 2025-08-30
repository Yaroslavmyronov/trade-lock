import { getMarketNfts } from '@/shared/api/market-nfts';
import { Market } from '@/widgets/market';

export const MarketPage = async () => {
  let marketNfts;
  try {
    marketNfts = await getMarketNfts({ page: 1, pageSize: 20 });
  } catch (error) {
    console.error('Failed to load NFT', error);
    return (
      <div className="flex size-full items-center justify-center">
        Failed to load NFT. Try again later.
      </div>
    );
  }

  return <Market initialNfts={marketNfts} />;
};
