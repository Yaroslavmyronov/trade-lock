'use client';
import abi from '@/../abi.json';
import { NftResponse } from '@/entities/nfts/types';
import { MarketIcon } from '@/shared';
import { parseEther } from 'viem';
import { useWriteContract } from 'wagmi';

interface SellButtonProps {
  nftsData: NftResponse;
  selectedIds: string[];
}

export const SellButton = ({ nftsData, selectedIds }: SellButtonProps) => {
  const { writeContract, isPending, error, data } = useWriteContract();

  const userProposeNfts = nftsData.filter((card) =>
    selectedIds.includes(`${card.contract}-${card.tokenId}`),
  );

  const nftContracts = userProposeNfts.map((nft) => nft.contract);
  const tokenIds: number[] = userProposeNfts.map((nft) => Number(nft.tokenId));
  const prices = userProposeNfts.map((nft) =>
    parseEther(nft.lastPrice.toString()),
  );
  const handleListNFTs = () => {
    writeContract({
      abi,
      address: '0xbf412641093C96d6e37231B57769efF181C09671',
      functionName: 'listNFTs',
      args: [nftContracts, tokenIds, prices],
    });
  };

  return (
    <>
      <div className="mx-1.5">
        <button
          onClick={handleListNFTs}
          disabled={isPending}
          className="flex min-h-[48px] min-w-[160px] cursor-pointer items-center justify-center rounded-[2px] bg-[#836EF9] px-3"
        >
          <MarketIcon />
          <span className="ml-2.5 flex flex-col text-left">
            <span className="leading-3.5">Sell now</span>
            <span className="text-[12px] leading-3 opacity-80">$0.26</span>
          </span>
        </button>
      </div>
    </>
  );
};
