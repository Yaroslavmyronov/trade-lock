import { UserNftResponse } from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';
import { Card } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';

export const UserNFTList = ({
  selectedNfts,
}: {
  selectedNfts: UserNftResponse;
}) => {
  return (
    <div className="relative">
      <div className="relative grid size-full min-h-auto grid-cols-[repeat(auto-fill,_minmax(110px,_1fr))] grid-rows-[repeat(auto-fill,_110px)] gap-1">
        {selectedNfts.map((nft) => {
          const id = getNftId(nft);
          const isSelected = selectedNfts.some(
            (c) => `${c.contract}-${c.tokenId}` === id,
          );

          return (
            <Card
              price={nft.lastPrice}
              image={nft.imageOriginal}
              onClick={() =>
                handleCardClick(nft, isSelected, toggleSelect, removeItem)
              }
              selected
              title={nft.name}
              key={id}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
};
