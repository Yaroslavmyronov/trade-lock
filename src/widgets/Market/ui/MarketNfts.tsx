import { Card } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';
import { CardData } from './Market';

interface MarketNftsProps {
  cardsData: CardData[];
  selectedIds: number[];
  toggleSelect: (id: number) => void;
  removeItem: (id: number) => void;
}

export const MarketNfts = ({
  cardsData,
  selectedIds,
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
              {cardsData.map((card) => {
                const isSelected = selectedIds.includes(card.id);

                return (
                  <Card
                    key={card.id}
                    title={card.title}
                    isSelected={isSelected}
                    onClick={() =>
                      handleCardClick(
                        card.id,
                        isSelected,
                        toggleSelect,
                        removeItem,
                      )
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
