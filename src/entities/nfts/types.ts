export type Nft = {
  contract: `0x${string}`;
  description: string;
  imageOriginal: string;
  kind: string;
  lastPrice: number;
  name: string;
  tokenId: string;
};

export type NftResponse = Nft[];

export interface nftStatus {
  nft: Nft;
  status: NftStatus;
}

export enum NftStatus {
  APPROVED = 'APPROVED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  UNKNOWN = 'UNKNOWN',
}
