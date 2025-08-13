import { UserNft } from '@/entities/nfts/types';
import { getNftId } from '../model/NFT';
import { nftPriceChange, nftPrices } from '../types';
interface SellNFTProps {
  nft: UserNft;
  prices: nftPrices;
  handlePriceChange: nftPriceChange;
}

export const SellNFT = ({ nft, prices, handlePriceChange }: SellNFTProps) => {
  const id = getNftId(nft);
  return (
    <li key={id}>
      <div className="flex items-center justify-between gap-x-3 py-0.5">
        <div className="flex min-w-0 items-center gap-x-3">
          <div className="relative shrink-0">
            <div className="bg-layer-02 size-[50px] overflow-hidden rounded">
              <div className="relative size-full">
                <img
                  className="size-full overflow-hidden object-contain"
                  src={
                    nft.imageOriginal
                      ? nft.imageOriginal
                      : '/images/no-media-available.jpg'
                  }
                  alt={nft.name}
                />
              </div>
            </div>
          </div>
          <div className="overflow-hidden">
            <p className="truncate font-semibold">{nft.name}</p>
            <div className="text-[12px] leading-4">
              <p className="text-[rgb(133,127,148)]">Unlisted</p>
            </div>
          </div>
        </div>
        <div className="shrink-0">
          <div>
            <div className="group flex w-[180px] shrink-0 flex-col gap-y-1">
              <div className="flex w-full overflow-hidden rounded border border-[rgb(71_64_89/_60%)] bg-[rgb(10_7_14/_30%)] transition group-hover:border-[rgb(111_104_125/_50%)]">
                <div className="text flex w-full items-center gap-2">
                  <input
                    type="number"
                    min="0"
                    placeholder="0.00"
                    value={prices[id] || ''}
                    onChange={(e) => handlePriceChange(id, e.target.value)}
                    className="box-border !h-[calc(theme(spacing.10)-2px)] w-full bg-transparent p-3 text-sm outline-none placeholder:text-[rgb(133_127_148/_50%;)] focus:outline-none"
                  />
                </div>
                <div className="text flex items-center bg-[rgb(62_56_77/_60%)] text-sm whitespace-nowrap">
                  <span className="px-3 text-sm">MON</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
