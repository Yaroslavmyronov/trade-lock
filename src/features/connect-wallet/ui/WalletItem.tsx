import { Preloader } from '@/shared';
import Image from 'next/image';
import { Wallet } from '../model/types';

interface WalletItemProps {
  wallet: Wallet;
  isCurrentlyConnecting: boolean;
  onWalletClick: (wallet: Wallet) => void;
}

export const WalletItem = ({
  wallet,
  isCurrentlyConnecting,
  onWalletClick,
}: WalletItemProps) => {
  return (
    <button
      onClick={() => onWalletClick(wallet)}
      disabled={isCurrentlyConnecting}
      className="active:bg-bg-additional-2 flex w-full cursor-pointer items-center gap-3 border-[rgb(42,44,46)] p-4 hover:bg-[rgb(27,29,31)] focus-visible:outline-none disabled:pointer-events-none disabled:opacity-40"
    >
      {wallet.icon && (
        <Image
          src={wallet.icon.trim()}
          width={24}
          height={24}
          alt={wallet.name}
          className="rounded"
        />
      )}

      <div className="order-2 flex flex-auto flex-col items-start justify-center self-stretch overflow-hidden">
        <span className="text-text-primary w-full truncate text-start text-sm leading-normal font-medium">
          {wallet.name}
        </span>
        {wallet.type === 'eip6963' && (
          <span className="text-xs text-gray-400">EIP-6963 compatible</span>
        )}
      </div>

      <div className="order-3 flex max-w-[40%] flex-none flex-col justify-center self-stretch overflow-visible text-right">
        {isCurrentlyConnecting ? (
          <Preloader />
        ) : wallet.detected ? (
          <div className="flex w-fit items-center gap-1 rounded bg-green-600/20 px-1.5 py-0.5 text-green-400">
            <span className="text-xs leading-normal font-normal">Detected</span>
          </div>
        ) : (
          <div className="flex w-fit items-center gap-1 rounded bg-blue-600/20 px-1.5 py-0.5 text-blue-400">
            <span className="text-xs leading-normal font-normal">Install</span>
          </div>
        )}
      </div>
    </button>
  );
};
