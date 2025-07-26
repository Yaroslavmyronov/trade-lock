import { Nft } from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';

export const handleCardClick = (
  nft: Nft,
  isSelected: boolean,
  toggleSelect: (nft: Nft) => void,
  removeItem: (id: string) => void,
) => {
  if (!isSelected) {
    toggleSelect(nft);
  } else {
    removeItem(getNftId(nft));
  }
};
