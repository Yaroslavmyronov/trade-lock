import { NftResponse } from '@/entities/nfts/types';
import { Card } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';

interface UserNftsProps {
  nftsData: NftResponse;
  selectedIds: string[];
  toggleSelect: (id: string) => void;
  removeItem: (id: string) => void;
}

export const UserNfts = ({
  nftsData,
  selectedIds,
  toggleSelect,
  removeItem,
}: UserNftsProps) => {
  return (
    <div className="relative flex shrink grow basis-auto flex-col overflow-auto">
      <div className="absolute flex h-full max-h-full w-full flex-wrap">
        <div className="pointer-events-none absolute flex h-full w-full items-center justify-center px-2 text-center text-[18px]"></div>
        <div className="flex h-full w-full shrink grow basis-full flex-col overflow-x-hidden overflow-y-auto">
          <div className="relative h-full overflow-x-visible overflow-y-auto">
            <div className="absolute top-0 left-0 grid max-h-screen w-full max-w-screen [grid-template-columns:repeat(auto-fill,_minmax(120px,_1fr))] [grid-template-rows:repeat(auto-fill,208px)] gap-1">
              {nftsData.map((card) => {
                const id = `${card.contract}-${card.tokenId}`;
                const isSelected = selectedIds.includes(id);
                return (
                  <Card
                    price={Number(card.lastPrice)}
                    image={card.imageOriginal}
                    isSelected={isSelected}
                    title={card.name}
                    key={id}
                    onClick={() =>
                      handleCardClick(id, isSelected, toggleSelect, removeItem)
                    }
                  ></Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
