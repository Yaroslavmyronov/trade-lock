import { UserNftResponse } from '@/entities/nfts/types';
import { getNftId } from './NFT';

export const getStatusesHelpers = (
  selectedNfts: UserNftResponse,
  statuses: Record<string, string>,
) => ({
  isAll: (state: string) =>
    selectedNfts.every((nft) => statuses[getNftId(nft)] === state),
  isNot: (state: string) =>
    selectedNfts.every((nft) => statuses[getNftId(nft)] !== state),
  hasAny: (state: string) =>
    selectedNfts.some((nft) => statuses[getNftId(nft)] === state),
});
