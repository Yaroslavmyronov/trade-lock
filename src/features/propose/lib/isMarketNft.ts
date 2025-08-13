import { MarketNft, UserNft } from '@/entities/nfts/types';

export const isMarketNft = (nft: UserNft | MarketNft): nft is MarketNft => {
  return 'metadata' in nft;
};
