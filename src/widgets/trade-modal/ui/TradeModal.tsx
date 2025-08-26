'use client';
import { useTradeModalStore } from '@/shared/store/useTradeModalStore';
import { Modal } from '@/shared/ui/Modal';

import { TradeModalBody } from './TradeModalBody';
import { TradeModalHeader } from './TradeModalHeader';

export const TradeModal = () => {
  const { isOpen, close, footer } = useTradeModalStore();
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="flex h-screen w-full max-w-[600px] items-center justify-center">
        <div className="flex h-[600px] max-h-[calc(100dvh_-_32px)] w-full flex-col rounded-[4px] bg-[#2a2c2e]">
          <TradeModalHeader onClose={close} />
          <TradeModalBody />
          <div className="bg-transparent px-6 py-4">{footer}</div>
        </div>
      </div>
    </Modal>
  );
};
