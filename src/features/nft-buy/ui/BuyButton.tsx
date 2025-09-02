'use client';
import { MarketNft } from '@/entities/nfts/types';
import { MarketIcon } from '@/shared';
import { useBuyModalStore } from '@/shared/store/useBuyModalStore';

export const BuyButton = ({
  selectedNftsMarket,
}: {
  selectedNftsMarket: MarketNft[];
}) => {
  const { open } = useBuyModalStore();
  const sellPrice = selectedNftsMarket.reduce((sum, nft) => sum + nft.price, 0);

  return (
    <div className="mx-1.5">
      <button
        onClick={open}
        disabled={!sellPrice}
        className="flex min-h-[48px] min-w-[160px] cursor-pointer items-center justify-start rounded-[2px] bg-[#836EF9] px-3 disabled:cursor-not-allowed disabled:opacity-40"
      >
        <MarketIcon />
        <span className="ml-2.5 flex flex-col text-left">
          <span className="leading-3.5">Buy</span>
          {sellPrice > 0 && (
            <span className="text-[12px] leading-3 opacity-80">{`${sellPrice.toFixed(4)} MON`}</span>
          )}
        </span>
      </button>
    </div>
  );
};
