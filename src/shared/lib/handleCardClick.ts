import { Nft } from '@/entities/nfts/types';

export const handleCardClick = (
  nft: Nft,
  isSelected: boolean,
  toggleSelect: (nft: Nft) => void,
  removeItem: (id: string) => void,
) => {
  if (!isSelected) {
    toggleSelect(nft);
  } else {
    removeItem(`${nft.contract}-${nft.tokenId}`);
  }
};
