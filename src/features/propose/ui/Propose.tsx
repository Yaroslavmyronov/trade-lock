import {
  MarketNft,
  MarketNftResponse,
  UserNft,
  UserNftResponse,
} from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';
import { Card } from '@/shared';
import { handleCardClick } from '@/shared/lib/handleCardClick';
import { isMarketNft } from '../lib/isMarketNft';

interface ProposeProps {
  selectedNfts: UserNftResponse | MarketNftResponse;
  toggleSelect: (nft: UserNft | MarketNft) => void;
  removeItem: (id: string) => void;
  isOpen: boolean;
}

export const Propose = ({
  selectedNfts = [],
  toggleSelect,
  removeItem,
  isOpen,
}: ProposeProps) => {
  if (!isOpen) return null;

  return (
    <div className="mb-[10px] flex h-[120px] min-h-[114px]">
      <div className="flex size-full min-h-full flex-wrap">
        <div className="flex size-full flex-col overflow-x-hidden overflow-y-auto">
          <div className="overflow-x-visible overflow-y-auto">
            <div className="grid grid-cols-[repeat(auto-fill,_minmax(70px,_1fr))] grid-rows-[repeat(auto-fill,_120px)] gap-1">
              {selectedNfts.map((nft) => {
                const id = getNftId(nft);
                const isSelected = selectedNfts.some(
                  (c) => `${c.contractAddress}-${c.tokenId}` === id,
                );

                return (
                  <Card
                    price={isMarketNft(nft) ? nft.price : nft.lastPrice}
                    image={
                      isMarketNft(nft)
                        ? nft.metadata.imageOriginal
                        : nft.imageOriginal
                    }
                    onClick={() =>
                      handleCardClick(nft, isSelected, toggleSelect, removeItem)
                    }
                    selected
                    title={isMarketNft(nft) ? nft.metadata.name : nft.name}
                    key={id}
                    isSelected={isSelected}
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
