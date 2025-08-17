import { UserNft } from '@/entities/nfts/types';
import { wagmiConfig } from '@/shared/config/wagmi/wagmiConfig';
import { erc721Abi } from 'viem';
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
      '0x2fe3AA6c023608b6F3D94b6Ec91fae1382de61c8'.toLowerCase()
    );
  } catch (error) {
    console.error('isApproved error:', error);
    return false;
  }
};
