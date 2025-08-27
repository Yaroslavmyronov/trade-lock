'use client';
import {
  CloseIcon,
  InfoCircleIcon,
  ModalButton,
  Preloader,
  TickCircleIcon,
} from '@/shared';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';
import { useBuyModalStore } from '@/shared/store/useBuyModalStore';
import { useMarketSelectedNfts } from '@/shared/store/useMarketSelectedNfts';
import { Modal } from '@/shared/ui/Modal';
import { useEffect, useState } from 'react';
import { parseEther } from 'viem';

type BuyModalState = {
  status: 'idle' | 'success' | 'error';
  errorMessage?: string;
};

export const BuyModal = () => {
  const [{ status, errorMessage }, setState] = useState<BuyModalState>({
    status: 'idle',
  });
  const { isOpen, close } = useBuyModalStore();
  const { selectedNfts, clearAll } = useMarketSelectedNfts();
  const { writeContractAsync, isMining } =
    useWrapperWriteContract('Marketplace');

  const totalPrice = selectedNfts.reduce((sum, nft) => sum + nft.price, 0);

  const buyNfts = async () => {
    console.log('selectedNfts', selectedNfts);
    try {
      await writeContractAsync({
        functionName: 'buyListing',
        args: [selectedNfts.map((nft) => BigInt(nft.listingId))],
        value: parseEther(totalPrice.toString()),
      });
      setState({ status: 'success' });
    } catch (e) {
      setState({ status: 'error', errorMessage: (e as Error).message });
      console.error('Listing error:', e);
    }
  };

  const retryBuy = () => {
    setState({ status: 'idle', errorMessage: '' });
    buyNfts();
  };
  const handleDone = () => {
    setState({ status: 'idle', errorMessage: '' });
    clearAll();
    close();
  };

  const handleClose = () => {
    setState({ status: 'idle', errorMessage: '' });
    close();
  };

  useEffect(() => {
    if (!isOpen) return;
    if (isMining) return;
    buyNfts();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="flex h-screen w-full max-w-[680px] items-center justify-center">
        <div className="flex h-auto max-h-[850px] min-h-[600px] w-full flex-col rounded-[4px] bg-[#2a2c2e]">
          <div className="flex min-h-[52px] shrink-0 items-center justify-between border-b border-[#35373a] px-6">
            <div className="flex w-full items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-2 transition-opacity duration-300">
                <h4 className="text-[22px] leading-6 font-normal text-[#836EF9] uppercase">
                  buy
                </h4>
              </div>
              <button
                onClick={handleClose}
                className="text-primary disabled:text-disabled inline-flex size-8 cursor-pointer items-center justify-center rounded bg-transparent p-0 text-sm transition hover:bg-[rgb(62_56_77/_40%)] active:bg-[rgb(71_64_89/_60%)] disabled:bg-transparent"
              >
                <CloseIcon width={24} height={24} />
              </button>
            </div>
          </div>
          {/* body */}
          <div className="flex grow flex-col px-6">
            {isMining && (
              <div className="flex size-full grow items-center justify-center text-[#836EF9]">
                <Preloader width={80} height={80} border={5}></Preloader>
              </div>
            )}
            {status === 'error' && (
              <>
                <div className="flex grow flex-col items-center justify-center">
                  <p className="mb-12 flex justify-center">
                    <InfoCircleIcon width={80} height={80}></InfoCircleIcon>
                  </p>
                  <p className="text-center text-lg leading-[18px] font-semibold">
                    {errorMessage}
                  </p>
                </div>
                <ModalButton onClick={retryBuy}>Retry</ModalButton>
              </>
            )}
            {status === 'success' && (
              <>
                <div className="flex grow flex-col items-center justify-center">
                  <p className="mb-12 flex justify-center">
                    <TickCircleIcon width={80} height={80}></TickCircleIcon>
                  </p>
                  <p className="text-center text-lg leading-[18px] font-semibold">
                    Success
                  </p>
                </div>
                <ModalButton onClick={handleDone}>Done</ModalButton>
              </>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
