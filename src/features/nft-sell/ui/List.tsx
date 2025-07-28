import { Nft } from '@/entities/nfts/types';
import { NftListStatus } from './NftListStatus';

interface ListProps {
  nfts: Nft[];
  statuses: Record<string, 'idle' | 'loading' | 'success' | 'error'>;
}

export const List = ({ nfts, statuses }: ListProps) => {
  return <NftListStatus statuses={statuses} nfts={nfts}></NftListStatus>;
};
