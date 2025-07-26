import { Nft } from '@/entities/nfts/types';

export const getNftId = (nft: Nft): string => {
  return `${nft.contract}-${nft.tokenId}`;
};
