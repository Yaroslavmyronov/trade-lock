import { getMarketNfts } from '@/shared/api/market-nfts';
import { defaultSortOption } from '@/shared/ui/FilterPanel/SortOptions';
import { Market } from '@/widgets/Market';

export const MarketPage = async () => {
  let marketNfts;
  try {
    marketNfts = await getMarketNfts({
      page: 1,
      pageSize: 20,
      sort: defaultSortOption.sort,
      order: defaultSortOption.order,
    });
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
