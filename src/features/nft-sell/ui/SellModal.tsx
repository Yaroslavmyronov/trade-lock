'use client';
import { UserNftResponse } from '@/entities/nfts/types';
import { CloseIcon, Preloader } from '@/shared';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';
import { Modal } from '@/shared/ui/Modal';
import { useState } from 'react';
import { Address, parseEther } from 'viem';

import { useNftApproval } from '@/shared/lib/web3/useNftApproval';
import { getNftId } from '../model/NFT';
import { getStatusesHelpers } from '../model/selectors';
import { Approve } from './Approve';
import { List } from './List';
import { ListingForm } from './ListingForm';

type ListingStatus = 'idle' | 'loading' | 'success' | 'error';
type Step = 'form' | 'approve' | 'listing';

interface SellModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedNfts: UserNftResponse;
}

export const SellModal = ({
  isOpen,
  onClose,
  selectedNfts,
}: SellModalProps) => {
  const { writeContractAsync, isMining } =
    useWrapperWriteContract('Marketplace');

  const [listingStatuses, setListingStatuses] = useState<
    Record<string, ListingStatus>
  >({});

  const updateListingStatus = (nftId: string, status: ListingStatus) => {
    setListingStatuses((prev) => ({ ...prev, [nftId]: status }));
  };

  const [step, setStep] = useState<Step>('form');

  const { approveNfts, approveStatuses, resetApproveStatuses } = useNftApproval(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as Address,
  );

  const listing = getStatusesHelpers(selectedNfts, listingStatuses);

  const isApproving = Object.values(approveStatuses).some(
    (status) => status === 'loading',
  );

  const isError =
    listing.hasAny('error') ||
    Object.values(approveStatuses).some((status) => status === 'error');

  const handleSell = async () => {
    setStep('approve');

    await approveNfts(selectedNfts);

    // Step 2: Create listings
    setStep('listing');
    const initialListingStatuses: Record<string, 'loading'> = {};
    selectedNfts.forEach((nft) => {
      const id = getNftId(nft);
      initialListingStatuses[id] = 'loading';
    });
    setListingStatuses(initialListingStatuses);

    try {
      await writeContractAsync({
        functionName: 'createListing',
        args: [
          selectedNfts.map((nft) => ({
            contractAddress: nft.contractAddress,
            tokenId: BigInt(nft.tokenId),
            price: parseEther(inputPrices[getNftId(nft)]),
          })),
        ],
      });

      selectedNfts.forEach((nft) => {
        updateListingStatus(getNftId(nft), 'success');
      });
    } catch (e) {
      console.error('Listing error:', e);
      selectedNfts.forEach((nft) => {
        updateListingStatus(getNftId(nft), 'error');
      });
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
    if (step === 'approve') return 'Approve';
    return 'List';
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

  const handleRetry = () => {
    setStep('form');
    const resetStatuses = selectedNfts.reduce(
      (acc, nft) => {
        const id = getNftId(nft);
        acc[id] = 'idle';
        return acc;
      },
      {} as Record<string, 'idle'>,
    );

    resetApproveStatuses(selectedNfts);
    setListingStatuses(resetStatuses);
  };

  const buttonText = isError
    ? 'Retry Listing'
    : `Sell ${selectedNfts.length} Item${selectedNfts.length > 1 ? 's' : ''}`;

  const buttonOnClick = isError ? handleRetry : handleSell;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-screen w-full max-w-[600px] items-center justify-center">
        <div className="flex h-[700px] max-h-[calc(100dvh_-_32px)] w-full flex-col rounded-[4px] bg-[#2a2c2e]">
          <div className="flex min-h-[52px] shrink-0 items-center justify-between border-b border-[#35373a] px-6">
            <div className="flex w-full items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-2 transition-opacity duration-300">
                <h4 className="text-[22px] leading-6 font-normal text-[#836EF9] uppercase">
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

            <div className="shrink-0 overflow-hidden">
              <div className="flex flex-col gap-y-3 bg-[#2d2e30] px-3.5 pt-3.5 pb-3.5 shadow-[0_-2px_10px_rgba(0,0,0,0.1)] md:px-8 md:pt-6 md:pb-6">
                {listing.isAll('success') ? (
                  <button
                    onClick={onClose}
                    className="text-primary disabled:text-disabled inline-flex h-[40px] cursor-pointer items-center justify-center rounded bg-[#836EF9] px-3 py-0 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Done
                  </button>
                ) : (
                  <>
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
                        onClick={buttonOnClick}
                        disabled={!allPricesFilled || isMining || isApproving}
                        className="text-primary disabled:text-disabled inline-flex h-[40px] cursor-pointer items-center justify-center rounded bg-[#836EF9] px-3 py-0 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isApproving ? (
                          <Preloader></Preloader>
                        ) : (
                          <span>{buttonText}</span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
