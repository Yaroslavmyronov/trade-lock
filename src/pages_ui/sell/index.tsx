import { getUserNfts } from '@/shared/api/user-nfts';
import { LoginProvider } from '@/shared/providers/LoginProvider';
import { Inventory } from '@/widgets/Inventory';

export const SellPage = async () => {
  const nftsData = await getUserNfts();
  return (
    <LoginProvider>
      <div className="relative flex h-full shrink grow flex-col bg-[#1d1f20]">
        <div className="flex shrink grow border-t-2 border-[#2a2c2e]">
          <Inventory nftsData={nftsData} filter="sell" />
        </div>
      </div>
    </LoginProvider>
  );
};
