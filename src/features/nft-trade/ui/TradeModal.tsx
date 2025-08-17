import { Modal } from '@/shared/ui/Modal';
import { TradeModalBody } from './TradeModalBody';
import { TradeModalFooter } from './TradeModalFooter';
import { TradeModalHeader } from './TradeModalHeader';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const TradeModal = ({ isOpen, onClose }: TradeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-screen w-full max-w-[600px] items-center justify-center">
        <div className="flex h-[600px] max-h-[calc(100dvh_-_32px)] w-full flex-col rounded-[4px] bg-[#2a2c2e]">
          <TradeModalHeader onClose={onClose} />
          <TradeModalBody />
          <TradeModalFooter />
        </div>
      </div>
    </Modal>
  );
};
