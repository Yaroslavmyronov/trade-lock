'use client';
import { ArrowIcon, CloseIcon } from '@/shared';

interface MarketCounterProps {
  selectedIds: number[];
  clearAll: () => void;
  toggle: () => void;
  isOpen: boolean;
}

export const MarketCounter = ({
  toggle,
  selectedIds,
  clearAll,
  isOpen,
}: MarketCounterProps) => {
  return (
    <div className="flex items-center py-2.5 text-[#836EF9]">
      <div
        className={`flex w-full flex-row items-center justify-end ${selectedIds.length === 0 && 'text-[#fff] opacity-50'}`}
      >
        <div className="inline-flex items-center text-[24px]">
          <div className="flex items-center">
            <span>$0.00</span>
          </div>
        </div>
        <div className="mx-[5px] flex items-end text-[12px]">{`(${selectedIds.length})`}</div>
        <div className="w-full px-2 text-left text-[#fff]">
          <p className="text-xs">
            {selectedIds.length === 0
              ? 'Select nfts you want to exchange'
              : 'In case of exchange you’ll be asked to pay'}
          </p>
        </div>

        <div className="relative flex shrink grow basis-auto justify-end">
          {selectedIds.length > 0 && (
            <button
              onClick={() => clearAll()}
              className="group mx-2 flex aspect-square w-[30px] cursor-pointer items-center justify-center bg-[#2a2c2e] text-[#fff] select-none"
            >
              <CloseIcon width={24} height={24} />

              <div className="pointer-events-none absolute bottom-[-50px] left-0 z-[2] max-h-[40vh] min-h-[24px] max-w-[250px] min-w-[40px] overflow-hidden rounded-[2px] bg-[#35373a] px-3.5 py-2.5 text-center text-xs break-words whitespace-nowrap text-[#fff] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                Remove all
              </div>
            </button>
          )}
          <button
            onClick={toggle}
            className="flex aspect-square w-[30px] cursor-pointer items-center justify-center bg-[#2a2c2e] text-[#fff] select-none"
          >
            <div className={`${!isOpen && 'rotate-180'}`}>
              <ArrowIcon />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
