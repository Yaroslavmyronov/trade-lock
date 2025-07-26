import { Nft, NftResponse } from '@/entities/nfts/types';
import { Card } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';

interface UserProposeProps {
  nftsData: NftResponse;
  selectedNfts: Nft[];
  toggleSelect: (nft: Nft) => void;
  removeItem: (id: string) => void;
  isOpen: boolean;
}

export const Propose = ({
  nftsData,
  selectedNfts,
  toggleSelect,
  removeItem,
  isOpen,
}: UserProposeProps) => {
  if (!nftsData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isOpen && (
        <div className="mb-[10px] flex h-[120px] min-h-[114px]">
          <div className="flex size-full min-h-full flex-wrap">
            <div className="flex size-full flex-col overflow-x-hidden overflow-y-auto">
              <div className="overflow-x-visible overflow-y-auto">
                <div className="grid grid-cols-[repeat(auto-fill,_minmax(70px,_1fr))] grid-rows-[repeat(auto-fill,_120px)] gap-1">
                  {selectedNfts.map((nft) => {
                    const id = `${nft.contract}-${nft.tokenId}`;
                    const isSelected = selectedNfts.some(
                      (c) => `${c.contract}-${c.tokenId}` === id,
                    );
                    return (
                      <Card
                        price={nft.lastPrice}
                        image={nft.imageOriginal}
                        onClick={() =>
                          handleCardClick(
                            nft,
                            isSelected,
                            toggleSelect,
                            removeItem,
                          )
                        }
                        selected={true}
                        title={nft.name}
                        key={`${nft.contract}-${nft.tokenId}`}
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
