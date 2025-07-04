import { RefreshIcon } from './icons/RefreshIcon';

export const Refresh = () => {
  return (
    <div className="mr-auto select-none">
      <button className="relative inline-flex h-[48px] min-w-[48px] cursor-pointer items-center justify-center overflow-hidden bg-[#2a2c2e] text-[#fff] hover:inset-shadow-[0_70px_#0000001a]">
        <RefreshIcon />
      </button>
    </div>
  );
};
