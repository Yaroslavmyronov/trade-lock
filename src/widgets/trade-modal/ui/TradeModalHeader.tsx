import { CloseIcon } from '@/shared';

export const TradeModalHeader = ({ onClose }: { onClose: () => void }) => (
  <div className="flex min-h-[55px] shrink-0 items-center justify-between border-b-2 border-[#af7fff] px-6">
    <div className="flex w-full items-center justify-between gap-x-2">
      <div className="flex items-center gap-x-2 transition-opacity duration-300">
        <h4 className="text-[22px] leading-6 font-normal text-[#af7fff] uppercase">
          Trade
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
);
