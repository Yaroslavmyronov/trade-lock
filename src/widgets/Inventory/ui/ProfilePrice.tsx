import { NftResponse } from '@/entities/nfts/types';
import { Arrow2Icon } from '@/shared';

interface ProfilePriceProps {
  nftsData: NftResponse;
}

export const ProfilePrice = ({ nftsData }: ProfilePriceProps) => {
  const fullPrice = nftsData.reduce((sum, nft) => sum + nft.lastPrice, 0);
  return (
    <div className="mb-4">
      <div className="relative right-0 left-0 min-h-[44px] w-full min-w-auto overflow-hidden rounded-[4px] bg-[#424242]">
        <div className="flex h-[44px] w-full cursor-pointer flex-row items-center px-4">
          <div className="flex w-full flex-row items-center overflow-hidden pr-2">
            <div className="mr-auto">
              <span className="mr-1.5 leading-5">
                Profile price for <label>{nftsData.length} items</label>
              </span>
              <span>icon</span>
            </div>
            <div className="flex items-start">
              <div className="mr-1 flex min-h-5 flex-row flex-nowrap items-center p-1 text-[#8851f6]">
                <div className="mr-1">
                  <Arrow2Icon width={14} height={14} />
                </div>
                <span>{fullPrice.toFixed(4)} MON</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
