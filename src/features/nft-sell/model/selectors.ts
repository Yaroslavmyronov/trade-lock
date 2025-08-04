import { Nft } from '@/entities/nfts/types';
import { getNftId } from './NFT';

export const getStatusesHelpers = (
  selectedNfts: Nft[],
  statuses: Record<string, string>,
) => ({
  isAll: (state: string) =>
    selectedNfts.every((nft) => statuses[getNftId(nft)] === state),
  isNot: (state: string) =>
    selectedNfts.every((nft) => statuses[getNftId(nft)] !== state),
  hasAny: (state: string) =>
    selectedNfts.some((nft) => statuses[getNftId(nft)] === state),
});
