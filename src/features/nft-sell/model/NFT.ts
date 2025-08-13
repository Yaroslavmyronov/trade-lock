import { MarketNft, UserNft } from '@/entities/nfts/types';

export const getNftId = (nft: MarketNft | UserNft): string => {
  return `${nft.contractAddress}-${nft.tokenId}`;
};
