import { MarketNft, MarketNftResponse } from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';
import { Card } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';

interface MarketNftsProps {
  nftsData: MarketNftResponse;
  selectedNfts: MarketNftResponse;
  toggleSelect: (nft: MarketNft) => void;
  removeItem: (id: string) => void;
}

export const MarketNfts = ({
  nftsData,
  selectedNfts,
  toggleSelect,
  removeItem,
}: MarketNftsProps) => {
  return (
    <div className="relative flex shrink grow flex-col overflow-auto">
      <div className="absolute flex size-full min-h-full flex-wrap">
        <div className="pointer-events-none absolute flex size-full items-center justify-center px-2 text-center text-[18px]"></div>
        <div className="flex size-full shrink grow basis-full flex-col overflow-x-hidden overflow-y-auto">
          <div className="size-full overflow-x-visible overflow-y-auto">
            <div className="absolute top-0 left-0 grid w-full [grid-template-columns:repeat(auto-fill,_minmax(120px,_1fr))] [grid-template-rows:repeat(auto-fill,208px)] gap-1">
              {nftsData.map((nft) => {
                const id = getNftId(nft);
                const isSelected = selectedNfts.some(
                  (selected) =>
                    selected.contractAddress === nft.contractAddress &&
                    selected.tokenId === nft.tokenId,
                );

                return (
                  <Card
                    price={Number(nft.price)}
                    image={nft.metadata.imageOriginal}
                    isSelected={isSelected}
                    title={nft.metadata.name}
                    key={id}
                    onClick={() =>
                      handleCardClick(nft, isSelected, toggleSelect, removeItem)
                    }
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
