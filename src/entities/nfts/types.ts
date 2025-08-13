import { Address } from 'viem';

export type BaseNft = {
  description: string | null;
  imageOriginal: string;
  kind: string;
  lastPrice: number;
  name: string;
};

export type MarketNft = {
  contractAddress: Address;
  listingId: string;
  metadata: BaseNft;
  price: number;
  sellerAddress: Address;
  tokenId: string;
};
export type MarketNftResponse = MarketNft[];

export type UserNft = BaseNft & {
  contractAddress: Address;
  tokenId: string;
};
export type UserNftResponse = UserNft[];
