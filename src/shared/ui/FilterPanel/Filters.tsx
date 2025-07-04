import { CloseIcon } from '@/shared/icons';

interface FilterDrawProps {
  opened: 'market' | 'user' | null;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
}

export const Filters = ({ opened, onClose }: FilterDrawProps) => {
  return (
    <div
      className={`fixed bottom-0 ${opened === 'market' && 'right-[20px]'} ${opened === 'user' && 'left-[20px]'} z-50 flex h-[calc(100%-65px-16px-0.1px-0.1px-0.1px)] min-w-[365px] flex-col rounded-[2px] bg-[#2a2c2e]`}
    >
      <div className="relative mb-4 flex min-h-[48px] items-center justify-center border-b-[2px] border-[#35373a] px-6">
        <span>Filters</span>
        <button
          onClick={onClose}
          className="absolute top-1/2 right-4 -mt-3 cursor-pointer"
        >
          <CloseIcon width={24} height={24} />
        </button>
      </div>
      <div></div>
    </div>
  );
};
