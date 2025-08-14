import { getNftId } from '@/features/nft-sell/model/NFT';
import { Card } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';
import { useSelectedNfts } from '@/shared/store/useSelectedNfts';

export const UserNFTList = () => {
  const { selectedNfts, toggleSelect, removeItem } = useSelectedNfts();
  return (
    <div className="relative">
      <div className="relative grid size-full min-h-auto grid-cols-[repeat(auto-fill,_minmax(70px,_1fr))] grid-rows-[repeat(auto-fill,_140px)] gap-1">
        {selectedNfts.map((nft) => {
          const id = getNftId(nft);
          const isSelected = selectedNfts.some(
            (c) => `${c.contractAddress}-${c.tokenId}` === id,
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
