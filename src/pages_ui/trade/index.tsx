import { getMarketNfts } from '@/shared/api/market-nfts';
import { LoginProvider } from '@/shared/providers/LoginProvider';
import { Inventory } from '@/widgets/Inventory';
import { Market } from '@/widgets/Market';

export const TradePage = async () => {
  const marketNfts = await getMarketNfts();

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
