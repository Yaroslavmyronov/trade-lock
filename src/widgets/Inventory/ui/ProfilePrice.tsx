import { UserNftResponse } from '@/entities/nfts/types';
import { Arrow2Icon } from '@/shared';

interface ProfilePriceProps {
  nftsData: UserNftResponse | null;
  loading: boolean;
}

export const ProfilePrice = ({ nftsData, loading }: ProfilePriceProps) => {
  if (loading) {
    return (
      <div className="mb-4">
        <div className="relative right-0 left-0 flex min-h-[44px] w-full min-w-auto flex-row items-center overflow-hidden rounded-[4px] bg-[#424242] px-4">
          <div className="mr-auto h-[24px] w-[210px] animate-pulse rounded-[4px] bg-[#333]" />
          <div className="h-[24px] w-[130px] animate-pulse rounded-[4px] bg-[#333]" />
        </div>
      </div>
    );
  }

  const fullPrice = nftsData
    ? nftsData.reduce((sum, nft) => sum + nft.lastPrice, 0)
    : 0;

  return (
    <div className="mb-4">
      <div className="relative right-0 left-0 min-h-[44px] w-full min-w-auto overflow-hidden rounded-[4px] bg-[#424242]">
        <div className="flex h-[44px] w-full flex-row items-center px-4">
          <div className="flex w-full flex-row items-center overflow-hidden pr-2">
            <div className="mr-auto">
              <span className="mr-1.5 leading-5">
                Profile price for{' '}
                <label>{nftsData ? nftsData.length : 0} items</label>
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
