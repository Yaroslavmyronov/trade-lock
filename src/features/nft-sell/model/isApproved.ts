import { UserNft } from '@/entities/nfts/types';
import { wagmiConfig } from '@/shared/config/wagmi/wagmiConfig';
import { erc721Abi } from 'viem';
import { readContract } from 'wagmi/actions';

export const isApproved = async (nft: UserNft) => {
  try {
    const approvedAddress = await readContract(wagmiConfig, {
      address: nft.contract,
      abi: erc721Abi,
      functionName: 'getApproved',
      args: [BigInt(nft.tokenId)],
    });

    return (
      approvedAddress?.toLowerCase() ===
      '0x7D8b883A19EF765b6dbbf96AF84953885f8753B8'.toLowerCase()
    );
  } catch (error) {
    console.error('isApproved error:', error);
    return false;
  }
};
