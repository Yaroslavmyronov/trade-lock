import { Address, Hash } from 'viem';

export interface Metadata {
  blockHash: Hash;
  blockNumber: string;
  timestamp: string;
  transactionHash: Hash;
}
export interface NftMetadata {
  description: string;
  id: string;
  imageOriginal: string;
  kind: string;
  lastUpdated: string;
  name: string;
  nftContractAddress: Address;
  price: number;
  tokenId: string;
}

export interface Listings {
  buyerAddress: Address;
  id: string;
  listingId: string;
  nftContractAddress: Address;
  nftMetadata: NftMetadata;
  price: number;
  sellerAddress: Address;
  status: string;
  tokenId: string;
}

export interface TradeParticipant {
  address: Address;
  tokenIds: string[];
  nftContracts: Address[];
}

export interface Trade {
  id: string;
  tradeId: string;
  status: 'string';
  from: TradeParticipant;
  to: TradeParticipant;
  listingIds: string[];
  listings: any[];
}

export interface History {
  listingId: string | null;
  metadata: Metadata;
  listings: Listings | null;
  status: 'Success' | 'Pending' | 'Reject';
  trade: Trade | null;
  tradeId: string | null;
  userAddress: Address;
}
