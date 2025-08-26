import { Arrow2Icon } from '@/shared';
import { useTradeModalStore } from '@/shared/store/useTradeModalStore';

export const UserItemPrice = () => {
  const { tradeData } = useTradeModalStore();
  const allNftPrices = tradeData?.fromMetadata.reduce(
    (sum, nft) => sum + nft.lastPrice,
    0,
  );

  return (
    <div className="relative w-1/2 max-w-1/2 pr-5 text-[22px]">
      <div className="flex w-full flex-row items-center justify-end text-[#af7fff]">
        <div className="w-full px-2 text-right text-[12px] text-[#fff]">
          <span>{`Your items price`}</span>
        </div>
        <div className="flex-end mx-[5px] flex text-[12px]">{`(${tradeData?.fromMetadata.length})`}</div>
        <div className="inline-flex items-center text-2xl">
          <div className="mr-[5px] inline-flex h-[18px] w-2.5 items-center">
            <Arrow2Icon width={14} height={24}></Arrow2Icon>
          </div>
          <div className="flex items-center">
            <span>{allNftPrices}</span>
          </div>
        </div>
        <div className="absolute right-[-16px] z-[1]">
          <button className="inline-flex size-[30px] cursor-pointer items-center justify-center rounded-full bg-[#35373a] text-[#fff] hover:shadow-[inset_0_-70px_0_0_rgba(0,0,0,0.1)]">
            <Arrow2Icon width={14} height={24}></Arrow2Icon>
          </button>
        </div>
      </div>
    </div>
  );
};
