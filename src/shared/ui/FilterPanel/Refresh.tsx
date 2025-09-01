import { RefreshIcon } from './icons/RefreshIcon';

export const Refresh = ({
  refresh,
  isRefresh,
}: {
  refresh: () => void;
  isRefresh: boolean;
}) => {
  return (
    <div className="mr-1 select-none">
      <button
        disabled={isRefresh}
        onClick={refresh}
        className="relative inline-flex h-[48px] min-w-[48px] cursor-pointer items-center justify-center overflow-hidden bg-[#2a2c2e] text-[#fff] hover:inset-shadow-[0_70px_#0000001a]"
      >
        <RefreshIcon />
      </button>
    </div>
  );
};
