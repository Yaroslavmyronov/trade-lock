import { CloseIcon } from '@/shared';
import { Modal } from '@/shared/ui/Modal';
import { ExchangeItems } from './ExchangeItems';
import { ExchangePrice } from './ExchangePrice';

interface TradeModalProps {
  isOpen: boolean;
  onClose: () => void;
}
export const TradeModal = ({ isOpen, onClose }: TradeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex h-screen w-full max-w-[600px] items-center justify-center">
        <div className="flex h-[700px] max-h-[calc(100dvh_-_32px)] w-full flex-col rounded-[4px] border border-[rgb(42,44,46)] bg-[rgb(16,16,17)]">
          <div className="flex shrink-0 items-center justify-between border-b border-[rgb(42,44,46)] p-4 px-8 py-6 transition-all duration-300">
            <div className="flex w-full items-center justify-between gap-x-2">
              <div className="flex items-center gap-x-2 transition-opacity duration-300">
                <h4 className="text-base leading-6 font-semibold">Trade</h4>
              </div>
              <button
                onClick={onClose}
                className="text-primary disabled:text-disabled inline-flex size-8 cursor-pointer items-center justify-center rounded bg-transparent p-0 text-sm transition hover:bg-[rgb(62_56_77/_40%)] active:bg-[rgb(71_64_89/_60%)] disabled:bg-transparent"
              >
                <CloseIcon width={24} height={24} />
              </button>
            </div>
          </div>

          <div className="flex grow flex-col overflow-auto px-6">
            <div className="-mx-6 flex h-full grow flex-col bg-[linear-gradient(to_right,_#2a2c2e_0%,_#2a2c2e_50%,_#1d1f20_50%,_#1d1f20_100%)] px-[15px]">
              <ExchangePrice />
              <ExchangeItems />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};
