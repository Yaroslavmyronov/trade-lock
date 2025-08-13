import { UserNftResponse } from '@/entities/nfts/types';
import { isApproved } from './isApproved';

export const getNotApprovedNfts = async (nfts: UserNftResponse) => {
  const results = await Promise.all(
    nfts.map(async (nft) => {
      const approved = await isApproved(nft);
      return { nft, approved };
    }),
  );

  return {
    approved: results.filter((r) => r.approved).map((r) => r.nft),
    notApproved: results.filter((r) => !r.approved).map((r) => r.nft),
  };
};
