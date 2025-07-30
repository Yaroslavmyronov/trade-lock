'use client';
import { Nft } from '@/entities/nfts/types';
import { CloseIcon, Preloader } from '@/shared';
import { getConfig } from '@/shared/config/wagmi/wagmiConfig';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';
import { Modal } from '@/shared/ui/Modal';
import { useState } from 'react';
import { erc721Abi, parseEther } from 'viem';

import { useReadContract, useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { getNftId } from '../model/NFT';
import { Approve } from './Approve';
import { List } from './List';
import { ListingForm } from './ListingForm';

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

  const nftContracts = selectedNfts.map((nft) => nft.contract);
  const tokenIdsConsole = selectedNfts.map((nft) => Number(nft.tokenId));
  console.log('tokenIdsConsole', tokenIdsConsole);
  const tokenIds: number[] = selectedNfts.map((nft) => Number(nft.tokenId));
  const prices = selectedNfts.map((nft) =>
    parseEther(nft.lastPrice.toString()),
  );

  const [approveStatuses, setApproveStatuses] = useState<
    Record<string, 'idle' | 'loading' | 'success' | 'error'>
  >({});
  const [listingStatuses, setListingStatuses] = useState<
    Record<string, 'idle' | 'loading' | 'success' | 'error'>
  >({});

  const isAllListedSuccessfully = () => {
    return selectedNfts.every((nft) => {
      const id = getNftId(nft);
      return listingStatuses[id] === 'success';
    });
  };
  const isAllApproveSuccessfully = () => {
    return selectedNfts.every((nft) => {
      const id = getNftId(nft);
      return approveStatuses[id] !== 'loading';
    });
  };

  const updateApproveStatus = (
    nftId: string,
    status: 'idle' | 'loading' | 'success' | 'error',
  ) => {
    setApproveStatuses((prev) => ({ ...prev, [nftId]: status }));
  };
  const updateListingStatus = (
    nftId: string,
    status: 'idle' | 'loading' | 'success' | 'error',
  ) => {
    setListingStatuses((prev) => ({ ...prev, [nftId]: status }));
  };
  const config = getConfig();
  const [step, setStep] = useState<'form' | 'approve' | 'listing'>('form');

  const isApproved = (nft: Nft) => {
    const approved = useReadContract();
  };

  const handleSell = async () => {
    for (const nft of selectedNfts) {
      const id = getNftId(nft);

      try {
        // APPROVE
        const initialApproveStatuses: Record<string, 'loading'> = {};
        selectedNfts.forEach((nft) => {
          const id = getNftId(nft);
          initialApproveStatuses[id] = 'loading';
        });
        setApproveStatuses(initialApproveStatuses);
        setStep('approve');
        updateApproveStatus(id, 'loading');

        const approveHash = await writeContractApproveAsync({
          address: nft.contract,
          abi: erc721Abi,
          functionName: 'approve',
          args: [
            '0xb1BfCa83f6d16928af5d67623627F157c896E7f7',
            Number(nft.tokenId),
          ],
        });

        if (!approveHash) throw new Error('No approve hash');

        await waitForTransactionReceipt(config, { hash: approveHash });

        updateApproveStatus(id, 'success');

        // LISTING
        setStep('listing');
        const initialListingStatuses: Record<string, 'loading'> = {};
        selectedNfts.forEach((nft) => {
          const id = getNftId(nft);
          initialListingStatuses[id] = 'loading';
        });
        setListingStatuses(initialListingStatuses);
        updateListingStatus(id, 'loading');

        await writeContractAsync({
          functionName: 'createListing',
          args: [
            nft.contract,
            Number(nft.tokenId),
            parseEther(inputPrices[id]),
          ],
        });

        updateListingStatus(id, 'success');
      } catch (e) {
        console.error(e);
        updateApproveStatus(id, 'error');
        updateListingStatus(id, 'error');
      }
    }
  };

  const [inputPrices, setInputPrices] = useState<Record<string, string>>({});

  const totalPrice = selectedNfts.reduce(
    (sum, nft) => sum + Number(inputPrices[getNftId(nft)]) || 0,
    0,
  );

  const handlePriceChange = (id: string, value: string) => {
    setInputPrices((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const allPricesFilled = selectedNfts.every((nft) => {
    const id = getNftId(nft);
    const price = inputPrices[id];
    return price !== undefined && Number(price) > 0;
  });

  const getButtonText = () => {
    if (step === 'listing') return 'Listing';
    if (step === 'approve') return 'Approve Access';
    return 'List Items';
  };

  const renderContent = () => {
    switch (step) {
      case 'approve':
        return <Approve nfts={selectedNfts} statuses={approveStatuses} />;

      case 'listing':
        return <List statuses={listingStatuses} nfts={selectedNfts} />;

      case 'form':
      default:
        return (
          <ListingForm
            nfts={selectedNfts}
            prices={inputPrices}
            handlePriceChange={handlePriceChange}
          />
        );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-screen w-full max-w-[600px] items-center justify-center">
        <div className="flex h-[700px] max-h-[calc(100dvh_-_32px)] w-full flex-col rounded-[4px] border border-[rgb(42,44,46)] bg-[rgb(16,16,17)]">
          <div className="flex shrink-0 items-center justify-between border-b border-[rgb(42,44,46)] p-4 px-8 py-6 transition-all duration-300">
            <div className="flex w-full items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-2 transition-opacity duration-300">
                <h4 className="text-base leading-6 font-semibold">
                  {getButtonText()}
                </h4>
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
              <div className="relative px-3.5 pb-3.5 md:px-8 md:pb-6">
                {renderContent()}
              </div>
            </div>
            <></>
            {isAllListedSuccessfully() && (
              <button
                onClick={onClose}
                className="text-primary disabled:text-disabled inline-flex h-[40px] cursor-pointer items-center justify-center rounded bg-[rgb(62_56_77/_60%)] px-3 py-0 text-sm transition hover:bg-[rgb(62_56_77/_40%)] active:bg-[rgb(71_64_89/_90%)]"
              >
                Done
              </button>
            )}
            <div className="shrink-0 overflow-hidden">
              <div className="flex flex-col gap-y-3 border-t border-[rgb(42,44,46)] px-3.5 pt-3.5 pb-3.5 md:px-8 md:pt-6 md:pb-6">
                {}
                <></>
                <div className="flex h-[22px] w-full items-center justify-between text-base">
                  <span className="text-[#fff]">You receive</span>
                  <div className="flex gap-1 text-[#fff]">
                    <span>{totalPrice}</span>
                    <span className="text-[rgb(133,127,148)]">MON</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-x-2">
                  <button
                    onClick={onClose}
                    className="text-primary disabled:text-disabled inline-flex h-[40px] cursor-pointer items-center justify-center rounded bg-[rgb(62_56_77/_60%)] px-3 py-0 text-sm transition hover:bg-[rgb(62_56_77/_40%)] active:bg-[rgb(71_64_89/_90%)]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSell}
                    disabled={
                      !allPricesFilled ||
                      isMining ||
                      !isAllApproveSuccessfully()
                    }
                    className="hover:bg-button-secondary-hover active:bg-button-secondary-active text-primary disabled:text-disabled inline-flex h-[40px] cursor-pointer items-center justify-center rounded bg-[#836EF9] px-3 py-0 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {!isAllApproveSuccessfully() ? (
                      <Preloader></Preloader>
                    ) : (
                      <span>Sell {selectedNfts.length} Item</span>
                    )}
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
