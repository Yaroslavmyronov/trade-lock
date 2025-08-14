import { getNftId } from '@/features/nft-sell/model/NFT';
import { Card } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';
import { useMarketSelectedCards } from '@/shared/store/useMarketSelectedCards';

export const MarketNFTList = () => {
  const { selectedNfts, toggleSelect, removeItem } = useMarketSelectedCards();
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
              price={nft.price}
              image={nft.metadata.imageOriginal}
              onClick={() =>
                handleCardClick(nft, isSelected, toggleSelect, removeItem)
              }
              selected
              title={nft.metadata.name}
              key={id}
              isSelected={isSelected}
            />
          );
        })}
      </div>
    </div>
  );
};
