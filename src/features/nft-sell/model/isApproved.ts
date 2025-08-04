import { Nft } from '@/entities/nfts/types';
import { getConfig } from '@/shared/config/wagmi/wagmiConfig';
import { erc721Abi } from 'viem';
import { readContract } from 'wagmi/actions';

export const isApproved = async (nft: Nft) => {
  const config = getConfig();
  try {
    const approvedAddress = await readContract(config, {
      address: nft.contract,
      abi: erc721Abi,
      functionName: 'getApproved',
      args: [BigInt(nft.tokenId)],
    });

    return (
      approvedAddress?.toLowerCase() ===
      '0x570413264Fb80dcEA4b35bd364dA54320f61fDB9'.toLowerCase()
    );
  } catch (error) {
    console.error('isApproved error:', error);
    return false;
  }
};
