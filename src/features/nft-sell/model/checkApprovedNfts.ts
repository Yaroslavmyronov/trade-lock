import { Nft } from '@/entities/nfts/types';
import { isApproved } from './isApproved';
import { getNftId } from './NFT';
type StatusUpdater = (
  id: string,
  status: 'idle' | 'loading' | 'success' | 'error',
) => void;
export const getNotApprovedNfts = async (
  nfts: Nft[],
  updateApproveStatus: StatusUpdater,
) => {
  const results = await Promise.all(
    nfts.map(async (nft) => {
      const approved = await isApproved(nft);
      const id = getNftId(nft);

      if (approved) {
        updateApproveStatus(id, 'success');
        return null;
      }

      return nft;
    }),
  );

  return results.filter(Boolean) as Nft[];
};
