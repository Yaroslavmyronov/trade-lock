import { getUserNfts } from '@/shared/api/user-nfts';
import { Inventory } from '@/widgets/Inventory';
import { Market } from '@/widgets/Market';

export const TradePage = async () => {
  const nftsData = await getUserNfts();

  return (
    <div className="relative flex h-full shrink grow flex-col bg-[#1d1f20]">
      <div className="flex shrink grow border-t-2 border-[#2a2c2e]">
        <div className="flex h-full w-full max-w-[437px] min-w-[437px] flex-col bg-[#17191a]">
          <Inventory nftsData={nftsData} filter="trade" />
        </div>
        <Market />
      </div>
    </div>
  );
};
