import { Nft } from '@/entities/nfts/types';
import { NftListStatus } from './NftListStatus';

interface ApproveProps {
  nfts: Nft[];
  statuses: Record<string, 'idle' | 'loading' | 'success' | 'error'>;
}

export const Approve = ({ nfts, statuses }: ApproveProps) => {
  return <NftListStatus statuses={statuses} nfts={nfts}></NftListStatus>;
};
