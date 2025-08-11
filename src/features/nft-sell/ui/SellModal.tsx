'use client';
import { Nft } from '@/entities/nfts/types';
import { CloseIcon, Preloader } from '@/shared';
import { wagmiConfig } from '@/shared/config/wagmi/wagmiConfig';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';
import { Modal } from '@/shared/ui/Modal';
import { useState } from 'react';
import { erc721Abi, parseEther } from 'viem';

import { useWriteContract } from 'wagmi';
import { waitForTransactionReceipt } from 'wagmi/actions';
import { getNotApprovedNfts } from '../model/checkApprovedNfts';
import { getNftId } from '../model/NFT';
import { getStatusesHelpers } from '../model/selectors';
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

  const [approveStatuses, setApproveStatuses] = useState<
    Record<string, 'idle' | 'loading' | 'success' | 'error'>
  >({});
  const [listingStatuses, setListingStatuses] = useState<
    Record<string, 'idle' | 'loading' | 'success' | 'error'>
  >({});

  const approve = getStatusesHelpers(selectedNfts, approveStatuses);
  const listing = getStatusesHelpers(selectedNfts, listingStatuses);

  const isApproving = approve.hasAny('loading');

  const isError = listing.hasAny('error') || approve.hasAny('error');

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

  const [step, setStep] = useState<'form' | 'approve' | 'listing'>('form');

  const handleSell = async () => {
    setStep('approve');

    // const notApprovedNfts = await getNotApprovedNfts(
    //   selectedNfts,
    //   updateApproveStatus,
    // );

    const { approved, notApproved } = await getNotApprovedNfts(selectedNfts);

    approved.forEach((nft) => {
      updateApproveStatus(getNftId(nft), 'success');
    });

    if (notApproved.length > 0) {
      const statuses = Object.fromEntries(
        notApproved.map((nft) => [getNftId(nft), 'loading' as const]),
      );
      setApproveStatuses((prev) => ({ ...prev, ...statuses }));

      try {
        for (const nft of notApproved) {
          const id = getNftId(nft);
          updateApproveStatus(id, 'loading');

          const approveHash = await writeContractApproveAsync({
            address: nft.contract,
            abi: erc721Abi,
            functionName: 'approve',
            args: [
              '0x7D8b883A19EF765b6dbbf96AF84953885f8753B8', // MARKETPLACE_ADDRESS
              BigInt(nft.tokenId),
            ],
          });

          if (!approveHash) throw new Error('No approve hash');
          await waitForTransactionReceipt(wagmiConfig, { hash: approveHash });

          updateApproveStatus(id, 'success');
        }
      } catch (e) {
        console.error('Approve error:', e);
        notApproved.forEach((nft) => {
          const id = getNftId(nft);
          updateApproveStatus(id, 'error');
        });
        return;
      }
    }

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
            contractAddress: nft.contract,
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

    setApproveStatuses(resetStatuses);
    setListingStatuses(resetStatuses);
  };

  const buttonText = isError
    ? 'Retry Listing'
    : `Sell ${selectedNfts.length} Item${selectedNfts.length > 1 ? 's' : ''}`;

  const buttonOnClick = isError ? handleRetry : handleSell;

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

            <div className="shrink-0 overflow-hidden">
              <div className="flex flex-col gap-y-3 border-t border-[rgb(42,44,46)] px-3.5 pt-3.5 pb-3.5 md:px-8 md:pt-6 md:pb-6">
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
