import { UserNft, UserNftResponse } from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';
import { Card, Preloader } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';
import { memo } from 'react';

interface UserNftsProps {
  nftsData: UserNftResponse | null;
  selectedNfts: UserNftResponse;
  toggleSelect: (nft: UserNft) => void;
  removeItem: (id: string) => void;
  cursorRef?: (node: HTMLDivElement | null) => void;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  hasNextPage: boolean;
}

const UserNftsComponent = ({
  nftsData,
  selectedNfts,
  toggleSelect,
  removeItem,
  cursorRef,
  isLoading,
  isFetchingNextPage,
  hasNextPage,
}: UserNftsProps) => {
  console.log('UserNfts render');
  if (isLoading) {
    return (
      <div className="flex size-full shrink grow basis-auto items-center justify-center">
        <Preloader></Preloader>
      </div>
    );
  }

  if (!nftsData) {
    return (
      <div className="flex size-full shrink grow basis-auto items-center justify-center">
        <span>No NFTs found</span>
      </div>
    );
  }
  return (
    <div className="relative flex shrink grow basis-auto flex-col overflow-auto">
      <div className="absolute flex h-full max-h-full w-full flex-wrap">
        <div className="pointer-events-none absolute flex h-full w-full items-center justify-center px-2 text-center text-[18px]"></div>
        <div className="flex h-full w-full shrink grow basis-full flex-col overflow-x-hidden overflow-y-auto">
          <div className="relative h-full overflow-x-visible overflow-y-auto">
            <div className="absolute top-0 left-0 grid max-h-screen w-full max-w-screen [grid-template-columns:repeat(auto-fill,_minmax(120px,_1fr))] [grid-template-rows:repeat(auto-fill,208px)] gap-1">
              {nftsData.map((nft, index) => {
                const id = getNftId(nft);
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
                    image={nft.imageOriginal}
                    isSelected={isSelected}
                    title={nft.name}
                    key={id}
                    onClick={() =>
                      handleCardClick(nft, isSelected, toggleSelect, removeItem)
                    }
                  ></Card>
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

export const UserNfts = memo(UserNftsComponent);
