import { getMarketNfts } from '@/shared/api/market-nfts';
import { LoginProvider } from '@/shared/providers/LoginProvider';
import { Inventory } from '@/widgets/Inventory';
import { Market } from '@/widgets/Market';

export const TradePage = async () => {
  let marketNfts;
  try {
    marketNfts = await getMarketNfts({
      page: 1,
      pageSize: 20,
      excludeSelf: true,
    });
  } catch (error) {
    console.error('Failed to load NFT', error);
    return (
      <div className="flex size-full items-center justify-center">
        Failed to load NFT. Try again later.
      </div>
    );
  }

  return (
    <LoginProvider>
      <div className="relative flex h-full shrink grow flex-col bg-[#1d1f20]">
        <div className="flex shrink grow border-t-2 border-[#2a2c2e]">
          <div className="flex h-full w-full max-w-[570px] min-w-[570px] flex-col bg-[#17191a]">
            <Inventory filter="trade" />
          </div>
          <Market excludeSelf={true} initialNfts={marketNfts} />
        </div>
      </div>
    </LoginProvider>
  );
};
