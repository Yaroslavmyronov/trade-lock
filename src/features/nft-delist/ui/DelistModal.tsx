'use client';
import { ConfirmModal } from '@/shared';
import { getParsedError } from '@/shared/lib/web3/getParsedError';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';
import { useDelistModalStore } from '@/shared/store/useDelistModalStore';
import { useOnSaleSelectedNfts } from '@/shared/store/useOnSaleSelectedNfts';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

type DelistModalState = {
  status: 'idle' | 'success' | 'error';
  errorMessage?: string;
};

export const DelistModal = () => {
  const [{ status, errorMessage }, setState] = useState<DelistModalState>({
    status: 'idle',
  });
  const { isOpen, close } = useDelistModalStore();
  const { selectedNfts, clearAll } = useOnSaleSelectedNfts();
  const { writeContractAsync, isMining } =
    useWrapperWriteContract('Marketplace');

  const queryClient = useQueryClient();

  const buyNfts = async () => {
    try {
      await writeContractAsync({
        functionName: 'removeListing',
        args: [BigInt(selectedNfts[0].listingId)],
      });
      queryClient.invalidateQueries({ queryKey: ['market'] });
      setState({ status: 'success' });
    } catch (error) {
      setState({ status: 'error', errorMessage: getParsedError(error) });
      console.error('Listing error:', error);
    }
  };

  const retryDelist = () => {
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
    <ConfirmModal
      handleClose={handleClose}
      isOpen={isOpen}
      close={close}
      status={status}
      errorMessage={errorMessage}
      loading={isMining}
      retry={retryDelist}
      done={handleDone}
      title="Delist"
    ></ConfirmModal>
  );
};
