import { Card } from '@/shared';
import { useTradeModalStore } from '@/shared/store/useTradeModalStore';

export const UserNFTList = () => {
  const { tradeData } = useTradeModalStore();
  return (
    <div className="relative">
      <div className="relative grid size-full min-h-auto grid-cols-[repeat(auto-fill,_minmax(70px,_1fr))] grid-rows-[repeat(auto-fill,_140px)] gap-1">
        {tradeData?.fromMetadata.map((nft, index) => {
          return (
            <Card
              price={nft.price}
              image={nft.imageOriginal}
              selected
              title={nft.name}
              key={index}
              isSelected={true}
            />
          );
        })}
      </div>
    </div>
  );
};
