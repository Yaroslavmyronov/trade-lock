'use client';
import { useHistoryModalStore } from '@/shared/store/useHistoryModalStore';
import { Modal } from '@/shared/ui/Modal';
import { Body } from './Body';
import { Header } from './Header';

export const HistoryModal = () => {
  const { isOpen, close } = useHistoryModalStore();
  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="flex h-screen w-full max-w-[1200px] items-center justify-center">
        <div className="flex h-[98vh] max-h-[1000px] w-full flex-col rounded-[4px] bg-[#2a2c2e]">
          <Header close={close}></Header>
          <Body></Body>
        </div>
      </div>
    </Modal>
  );
};
