import { NftResponse } from '@/entities/nfts/types';
import { Card } from '@/shared';
import { handleCardClick } from '../../../shared/lib/handleCardClick';

interface UserProposeProps {
  nftsData: NftResponse;
  selectedIds: number[];
  toggleSelect: (id: number) => void;
  removeItem: (id: number) => void;
  isOpen: boolean;
}

export const Propose = ({
  nftsData,
  selectedIds,
  toggleSelect,
  removeItem,
  isOpen,
}: UserProposeProps) => {
  if (!nftsData) {
    return <div>Loading...</div>;
  }

  const userProposeNfts = nftsData.filter((card) =>
    selectedIds.includes(Number(card.tokenId)),
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
                    const isSelected = selectedIds.includes(
                      Number(card.tokenId),
                    );
                    return (
                      <Card
                        price={card.lastPrice}
                        image={card.imageOriginal}
                        onClick={() =>
                          handleCardClick(
                            Number(card.tokenId),
                            isSelected,
                            toggleSelect,
                            removeItem,
                          )
                        }
                        selected={true}
                        title={card.name}
                        key={Number(card.tokenId)}
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
