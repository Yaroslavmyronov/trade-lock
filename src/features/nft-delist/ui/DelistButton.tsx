'use client';
import { MarketNft } from '@/entities/nfts/types';
import { TrashIcon } from '@/shared';
import { useDelistModalStore } from '@/shared/store/useDelistModalStore';

export const DelistButton = ({
  selectedNfts,
}: {
  selectedNfts: MarketNft[];
}) => {
  const { open } = useDelistModalStore();
  const sellPrice = selectedNfts.reduce((sum, nft) => sum + nft.price, 0);

  return (
    <div className="mx-1.5">
      <button
        onClick={open}
        disabled={!sellPrice}
        className="flex size-[48px] cursor-pointer items-center justify-center rounded-[2px] bg-[#35373a] transition-shadow duration-300 hover:shadow-[inset_0_-70px_0_0_rgba(0,0,0,0.1)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        <TrashIcon width={18} height={18} />
      </button>
    </div>
  );
};
