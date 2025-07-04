import { Card } from '@/shared';
import { CardData } from '@/widgets/Market/ui/Market';
import { handleCardClick } from '../../../shared/lib/handleCardClick';

interface UserProposeProps {
  cardsData: CardData[];
  selectedIds: number[];
  toggleSelect: (id: number) => void;
  removeItem: (id: number) => void;
  isOpen: boolean;
}

export const Propose = ({
  cardsData,
  selectedIds,
  toggleSelect,
  removeItem,
  isOpen,
}: UserProposeProps) => {
  const userProposeNfts = cardsData.filter((card) =>
    selectedIds.includes(card.id),
  );

  return (
    <>
      {isOpen && (
        <div className="mb-[10px] flex h-[120px] min-h-[114px]">
          <div className="flex size-full min-h-full flex-wrap">
            <div className="flex size-full flex-col overflow-x-hidden overflow-y-auto">
              <div className="overflow-x-visible overflow-y-auto">
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(70px,_1fr))] grid-rows-[repeat(auto-fill,_120px)] gap-1">
                  {userProposeNfts.map((card) => {
                    const isSelected = selectedIds.includes(card.id);
                    return (
                      <Card
                        onClick={() =>
                          handleCardClick(
                            card.id,
                            isSelected,
                            toggleSelect,
                            removeItem,
                          )
                        }
                        selected={true}
                        title={card.title}
                        key={card.id}
                        isSelected={isSelected}
                      ></Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
