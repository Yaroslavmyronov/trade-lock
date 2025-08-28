import { UserNft } from '@/entities/nfts/types';
import { getNftId } from '@/features/nft-sell/model/NFT';
import { wagmiConfig } from '@/shared/config/wagmi/wagmiConfig';
import { useState } from 'react';
import { Address, erc721Abi } from 'viem';
import {
  readContract,
  waitForTransactionReceipt,
  writeContract,
} from 'wagmi/actions';

export const useNftApproval = (marketplaceAddress: Address) => {
  const [approveStatuses, setApproveStatuses] = useState<
    Record<string, 'idle' | 'loading' | 'success' | 'error'>
  >({});

  const isApproved = async (nft: UserNft) => {
    try {
      const approvedAddress = await readContract(wagmiConfig, {
        address: nft.contractAddress,
        abi: erc721Abi,
        functionName: 'getApproved',
        args: [BigInt(nft.tokenId)],
      });

      return (
        approvedAddress?.toLowerCase() === marketplaceAddress.toLowerCase()
      );
    } catch (error) {
      console.error('isApproved error:', error);
      return false;
    }
  };

  const approveNfts = async (nfts: UserNft[]) => {
    for (const nft of nfts) {
      const id = getNftId(nft);

      try {
        const alreadyApproved = await isApproved(nft);
        if (alreadyApproved) {
          setApproveStatuses((x) => ({ ...x, [id]: 'success' }));
          continue;
        }

        setApproveStatuses((x) => ({ ...x, [id]: 'loading' }));

        const txHash = await writeContract(wagmiConfig, {
          address: nft.contractAddress,
          abi: erc721Abi,
          functionName: 'approve',
          args: [marketplaceAddress, BigInt(nft.tokenId)],
        });
        await waitForTransactionReceipt(wagmiConfig, { hash: txHash });
        setApproveStatuses((x) => ({ ...x, [id]: 'success' }));
      } catch {
        setApproveStatuses((x) => ({ ...x, [id]: 'error' }));
      }
    }
  };

  const resetApproveStatuses = (nfts: UserNft[]) => {
    const initialStatuses = nfts.reduce(
      (acc, nft) => {
        acc[getNftId(nft)] = 'idle';
        return acc;
      },
      {} as Record<string, 'idle'>,
    );

    setApproveStatuses(initialStatuses);
  };

  return { approveNfts, approveStatuses, resetApproveStatuses };
};
