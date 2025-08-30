import { useTradeModalStore } from '@/shared/store/useTradeModalStore';

export const MarketItemPrice = () => {
  const { tradeData } = useTradeModalStore();
  const allNftPrices = tradeData?.toMetadata.reduce(
    (sum, nft) => sum + nft.price,
    0,
  );
  return (
    <div className="w-1/2 max-w-1/2 pl-5 text-[22px]">
      <div className="flex w-full flex-row items-center justify-end text-[#fff]">
        <div className="inline-flex items-center text-2xl">
          <div className="flex items-center">
            <span>{allNftPrices}</span>
          </div>
        </div>
        <div className="flex-end mx-[5px] flex text-[12px]">{`(${tradeData?.toMetadata.length})`}</div>
        <div className="w-full px-2 text-left text-[12px]">
          <span>Market items price</span>
        </div>
      </div>
    </div>
  );
};
