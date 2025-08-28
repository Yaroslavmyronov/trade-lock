import { getMarketNfts } from '@/shared/api/market-nfts';
import { LoginProvider } from '@/shared/providers/LoginProvider';
import { Inventory } from '@/widgets/inventory';
import { Market } from '@/widgets/market';

export const TradePage = async () => {
  const { data: marketNfts, error } = await getMarketNfts();

  if (error) {
    return (
      <div className="flex size-full items-center justify-center">
        Failed to load NFTs. Please try again.
      </div>
    );
  }

  return (
    <LoginProvider>
      <div className="relative flex h-full shrink grow flex-col bg-[#1d1f20]">
        <div className="flex shrink grow border-t-2 border-[#2a2c2e]">
          <div className="flex h-full w-full max-w-[650px] min-w-[437px] flex-col bg-[#17191a]">
            <Inventory filter="trade" />
          </div>
          <Market initialNfts={marketNfts} />
        </div>
      </div>
    </LoginProvider>
  );
};
