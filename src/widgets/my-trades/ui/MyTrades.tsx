'use client';
import { useTradesModalStore } from '@/shared/store/useTradesModalStore';
import { Modal } from '@/shared/ui/Modal';
import { Body } from './Body';
import { Header } from './Header';

export const MyTrades = () => {
  const { isOpen, close, setActiveTab, activeTab } = useTradesModalStore();

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="flex h-screen w-full max-w-[1200px] items-center justify-center">
        <div className="flex h-[98vh] max-h-[1000px] w-full flex-col rounded-[4px] bg-[#2a2c2e]">
          <Header
            close={close}
            activeTab={activeTab}
            onTabChange={setActiveTab}
          ></Header>
          <Body activeTab={activeTab}></Body>
        </div>
      </div>
    </Modal>
  );
};
