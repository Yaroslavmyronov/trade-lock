'use client';
import { UserNftResponse } from '@/entities/nfts/types';
import { MarketIcon } from '@/shared';
import { useModal } from '@/shared/lib/useModal';
import { SellModal } from './SellModal';

interface SellButtonProps {
  selectedNfts: UserNftResponse;
  clearAll: () => void;
}

export const SellButton = ({ selectedNfts, clearAll }: SellButtonProps) => {
  const sellPrice = selectedNfts.reduce((sum, nft) => sum + nft.price, 0);
  const { isOpen, open, close } = useModal();
  const noSelectedNfts = selectedNfts.length === 0;

  return (
    <>
      <div className="mx-1.5">
        <button
          className="flex min-h-[48px] min-w-[160px] cursor-pointer items-center justify-start rounded-[2px] bg-[#836EF9] px-3 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={noSelectedNfts}
          onClick={open}
        >
          <MarketIcon />
          <span className="ml-2.5 flex flex-col text-left">
            <span className="leading-3.5">Sell now</span>
            {sellPrice && (
              <span className="text-[12px] leading-3 opacity-80">{`${sellPrice.toFixed(4)} MON`}</span>
            )}
          </span>
        </button>
      </div>
      <SellModal
        selectedNfts={selectedNfts}
        clearAll={clearAll}
        isOpen={isOpen}
        onClose={close}
      ></SellModal>
    </>
  );
};

// <ActionWithModal
//     icon={<MarketIcon />}
//     label="Sell now"
//     subLabel={`${sellPrice.toFixed(4)} MON`}
//     disabled={noSelectedNfts}
//     ModalComponent={SellModal}
//     modalProps={{ selectedNfts }}
//   />
