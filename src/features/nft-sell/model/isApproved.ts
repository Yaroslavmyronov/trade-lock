import { UserNft } from '@/entities/nfts/types';
import { wagmiConfig } from '@/shared/config/wagmi/wagmiConfig';
import { Address, erc721Abi } from 'viem';
import { readContract } from 'wagmi/actions';

export const isApproved = async (nft: UserNft) => {
  try {
    const approvedAddress = await readContract(wagmiConfig, {
      address: nft.contractAddress,
      abi: erc721Abi,
      functionName: 'getApproved',
      args: [BigInt(nft.tokenId)],
    });

    return (
      approvedAddress?.toLowerCase() ===
      (process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as Address).toLowerCase()
    );
  } catch (error) {
    console.error('isApproved error:', error);
    return false;
  }
};
