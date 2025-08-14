import { MarketNft, UserNft } from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';

export const handleCardClick = <T extends UserNft | MarketNft>(
  nft: T,
  isSelected: boolean,
  toggleSelect: (nft: T) => void,
  removeItem: (id: string) => void,
) => {
  const id = getNftId(nft);
  if (isSelected) {
    removeItem(id);
  } else {
    toggleSelect(nft);
  }
};
