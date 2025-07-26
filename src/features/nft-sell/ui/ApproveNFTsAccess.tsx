import { Nft, nftStatus } from '@/entities/nfts/types';
import { SellNFTsSummary } from './SellNFTsSummary';
import { nftPrices } from '../types';
import { NftStatus } from '@/entities/nfts/types';
import { NFTsApproval } from './NFTsApproval';

interface ApproveNFTsAccessProps {
  nfts: Nft[];
  prices: nftPrices;
}

export const ApproveNFTsAccess = ({ nfts, prices }: ApproveNFTsAccessProps) => {
  // Logic to handle the approval of NFTs access

  const nftStatuses: nftStatus[] = nfts.map((nft) => {
    return {
      nft,
      status: NftStatus.REJECTED,
    }
  });

  return (
    <>
      <SellNFTsSummary nfts={nfts} prices={prices} />
      <NFTsApproval nftStatuses={nftStatuses} />
    </>
  );
};
