import { Address } from 'viem';

export interface Metadata {
  description: string;
  imageOriginal: string;
  kind: string;
  price: number;
  name: string;
}

export interface Trade {
  tradeId: string;
  fromAddress: Address;
  toAddress: Address;
  isIncoming: boolean;
  fromMetadata: Metadata[];
  toMetadata: Metadata[];
}

export interface NewTrade {
  fromAddress: Address;
  toAddress: Address;
  fromMetadata: Metadata[];
  toMetadata: Metadata[];
}
