'use client';
import { Nft } from '@/entities/nfts/types';
import { CloseIcon } from '@/shared';
import { getConfig } from '@/shared/config/wagmi/wagmiConfig';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';
import { Modal } from '@/shared/ui/Modal';
import { useState } from 'react';
import { erc721Abi, parseEther } from 'viem';

import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNfts: Nft[];
}

export const SellModal = ({
  isOpen,
  onClose,
  selectedNfts,
}: SellModalProps) => {
  const { writeContractAsync, isMining } =
    useWrapperWriteContract('Marketplace');
  const { writeContractAsync: writeContractApproveAsync } = useWriteContract();
  const [isApproving, setIsApproving] = useState(false);

  const nftContracts = selectedNfts.map((nft) => nft.contract);
  const tokenIdsConsole = selectedNfts.map((nft) => Number(nft.tokenId));
  console.log('tokenIdsConsole', tokenIdsConsole);
  const tokenIds: number[] = selectedNfts.map((nft) => Number(nft.tokenId));
  const prices = selectedNfts.map((nft) =>
    parseEther(nft.lastPrice.toString()),
  );
  const config = getConfig();

  const handleSell = async () => {
    try {
      setIsApproving(true);
      // for (const nft of selectedNfts) {
      const approveTokenHash = await writeContractApproveAsync({
        address: '0x3019BF1dfB84E5b46Ca9D0eEC37dE08a59A41308',
        abi: erc721Abi,
        functionName: 'approve',
        args: ['0xb1BfCa83f6d16928af5d67623627F157c896E7f7', 209252],
      });

      if (!approveTokenHash) return;

      console.log('approveTokenHash', approveTokenHash);
      const receipt = await waitForTransactionReceipt(config, {
        hash: approveTokenHash,
      });

      if (!receipt) return;
      console.log('receipt', receipt);

      try {
        await writeContractAsync({
          functionName: 'createListing',
          args: [
            '0x3019BF1dfB84E5b46Ca9D0eEC37dE08a59A41308',
            209252,
            parseEther('5'),
          ],
        });
        console.log('createListing');
      } catch (error) {
        console.error('Mint failed:', error);
      }
      // }

      setIsApproving(false);
    } catch (error) {
      console.error('Approve failed:', error);
      setIsApproving(false);
      return;
    }
  };

  const [inputPrices, setInputPrices] = useState<Record<string, string>>({});

  const handlePriceChange = (id: string, value: string) => {
    setInputPrices((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const allPricesFilled = selectedNfts.every((nft) => {
    const id = `${nft.contract}-${nft.tokenId}`;
    const price = inputPrices[id];
    return price !== undefined && Number(price) > 0;
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-screen w-full max-w-[600px] items-center justify-center">
        <div className="flex h-[700px] max-h-[calc(100dvh_-_32px)] w-full flex-col border border-[rgb(50,45,62)] bg-[#35373a]">
          <div className="flex shrink-0 items-center justify-between border-b p-4 px-8 py-6 transition-all duration-300">
            <div className="flex w-full items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-2 transition-opacity duration-300">
                <span>Sell</span>
              </div>
              <button
                onClick={onClose}
                className="text-primary disabled:text-disabled inline-flex size-8 cursor-pointer items-center justify-center rounded bg-transparent p-0 text-sm transition hover:bg-[rgb(62_56_77/_40%)] active:bg-[rgb(71_64_89/_60%)] disabled:bg-transparent"
              >
                <CloseIcon width={24} height={24} />
              </button>
            </div>
          </div>
          <div className="relative flex flex-1 flex-col overflow-hidden !p-0 px-4 pb-4 md:p-4">
            <div className="text relative flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
              <div className="px-3.5 pb-3.5 md:px-8 md:pb-6">
                <ul className="flex flex-col gap-y-3.5 pt-3.5 md:gap-y-4 md:pt-6">
                  {selectedNfts.map((nft) => {
                    const id = `${nft.contract}-${nft.tokenId}`;
                    return (
                      <li key={`${nft.contract}-${nft.tokenId}`}>
                        <div className="flex items-center justify-between gap-x-3 py-0.5">
                          <div className="flex min-w-0 items-center gap-x-3">
                            <div className="relative shrink-0">
                              <div className="bg-layer-02 size-[50px] overflow-hidden rounded">
                                <div className="relative size-full">
                                  <img
                                    className="size-full overflow-hidden object-contain"
                                    src={
                                      nft.imageOriginal
                                        ? nft.imageOriginal
                                        : '/images/default.png'
                                    }
                                    alt={nft.name}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="overflow-hidden text-ellipsis whitespace-nowrap">
                              <div className="overflow-hidden font-semibold text-ellipsis whitespace-nowrap">
                                {nft.name}
                              </div>
                              <div className="text-[12px] leading-4">
                                <p className="text-[rgb(133,127,148)]">
                                  Unlisted
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <div>
                              <div className="group flex w-[180px] shrink-0 flex-col gap-y-1">
                                <div className="flex w-full overflow-hidden rounded border border-[rgb(71_64_89/_60%)] bg-[rgb(10_7_14/_30%)] transition group-hover:border-[rgb(111_104_125/_50%)]">
                                  <div className="text flex w-full items-center gap-2">
                                    <input
                                      type="number"
                                      min="0"
                                      placeholder="0.00"
                                      value={inputPrices[id] || ''}
                                      onChange={(e) =>
                                        handlePriceChange(id, e.target.value)
                                      }
                                      className="box-border !h-[calc(theme(spacing.10)-2px)] w-full bg-transparent p-3 text-sm outline-none placeholder:text-[rgb(133_127_148/_50%;)] focus:outline-none"
                                    />
                                  </div>
                                  <div className="text flex items-center bg-[rgb(62_56_77/_60%)] text-sm whitespace-nowrap">
                                    <span className="px-3 text-sm">MON</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
            <div className="shrink-0 overflow-hidden">
              <div className="flex flex-col gap-y-3 border-t px-3.5 pt-3.5 pb-3.5 md:px-8 md:pt-6 md:pb-6">
                <div></div>
                <div className="grid grid-cols-2 gap-x-2">
                  <button
                    onClick={onClose}
                    className="text-primary disabled:text-disabled inline-flex h-[40px] cursor-pointer items-center justify-center rounded bg-[rgb(62_56_77/_60%)] px-3 py-0 text-sm transition hover:bg-[rgb(62_56_77/_40%)] active:bg-[rgb(71_64_89/_90%)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSell}
                    disabled={!allPricesFilled || isMining}
                    className="hover:bg-button-secondary-hover active:bg-button-secondary-active text-primary disabled:text-disabled inline-flex h-[40px] cursor-pointer items-center justify-center rounded bg-[#836EF9] px-3 py-0 text-sm transition disabled:cursor-not-allowed disabled:bg-[rgb(236_19_109/_20%)]"
                  >
                    <span>Sell {selectedNfts.length} Item</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
