import { MarketNft, UserNft } from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';

export const handleCardClick = (
  nft: UserNft | MarketNft,
  isSelected: boolean,
  toggleSelect: (nft: UserNft | MarketNft) => void,
  removeItem: (id: string) => void,
) => {
  if (!isSelected) {
    toggleSelect(nft);
  } else {
    removeItem(getNftId(nft));
  }
};
