import { MarketNft, MarketNftResponse } from '@/entities/nfts/types';
import { Card, Preloader } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';
import { memo } from 'react';

interface MarketNftsProps {
  nftsData: MarketNftResponse;
  selectedNfts: MarketNftResponse;
  toggleSelect: (nft: MarketNft) => void;
  removeItem: (id: string) => void;
  cursorRef?: (node: HTMLDivElement | null) => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
}

const MarketNftsComponent = ({
  nftsData,
  selectedNfts,
  toggleSelect,
  removeItem,
  cursorRef,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
}: MarketNftsProps) => {
  console.log('isFetchingNextPage', isFetchingNextPage);
  if (isLoading) {
    return (
      <div className="flex size-full shrink grow basis-auto items-center justify-center">
        <Preloader></Preloader>
      </div>
    );
  }
  return (
    <div className="relative flex shrink grow flex-col overflow-auto">
      <div className="absolute flex size-full min-h-full flex-wrap">
        <div className="pointer-events-none absolute flex size-full items-center justify-center px-2 text-center text-[18px]"></div>
        <div className="flex size-full shrink grow basis-full flex-col overflow-x-hidden overflow-y-auto">
          <div className="size-full overflow-x-visible overflow-y-auto">
            <div className="absolute top-0 left-0 grid w-full [grid-template-columns:repeat(auto-fill,_minmax(120px,_1fr))] [grid-template-rows:repeat(auto-fill,208px)] gap-1">
              {nftsData.map((nft, index) => {
                const isSelected = selectedNfts.some(
                  (selected) =>
                    selected.contractAddress === nft.contractAddress &&
                    selected.tokenId === nft.tokenId,
                );
                const isLastElement = index === nftsData.length - 1;
                return (
                  <Card
                    ref={isLastElement && hasNextPage ? cursorRef : null}
                    price={Number(nft.price)}
                    image={nft.metadata.imageOriginal}
                    isSelected={isSelected}
                    title={nft.metadata.name}
                    key={nft.listingId}
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
      {isFetchingNextPage && (
        <div className="absolute bottom-[12%] left-0 flex h-14 w-full items-center justify-center text-[#836EF9]">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#17191a]">
            <Preloader width={24} height={24} />
          </div>
        </div>
      )}
    </div>
  );
};

export const MarketNfts = memo(MarketNftsComponent);
