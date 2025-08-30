import {
  MarketNft,
  MarketNftResponse,
  UserNft,
  UserNftResponse,
} from '@/entities/nfts/types';
import { Metadata } from '@/entities/trade/model/type';
import { Address } from 'viem';

const mapUserNftToMetadata = (nft: UserNft): Metadata => ({
  description: nft.description ?? '',
  imageOriginal: nft.imageOriginal,
  kind: nft.kind,
  price: nft.price,
  name: nft.name,
});

const mapMarketNftToMetadata = (nft: MarketNft): Metadata => ({
  description: nft.metadata.description ?? '',
  imageOriginal: nft.metadata.imageOriginal,
  kind: nft.metadata.kind,
  price: nft.metadata.price,
  name: nft.metadata.name,
});

export const createTrade = (
  userNfts: UserNftResponse,
  marketNfts: MarketNftResponse,
  address: Address,
) => {
  if (!userNfts.length || !marketNfts.length || !address) return;

  return {
    fromAddress: address,
    toAddress: marketNfts[0].sellerAddress,
    fromMetadata: userNfts.map(mapUserNftToMetadata),
    toMetadata: marketNfts.map(mapMarketNftToMetadata),
  };
};
