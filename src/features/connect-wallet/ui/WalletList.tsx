import { Connector } from 'wagmi';
import { Wallet } from '../model/types';
import { WalletItem } from './WalletItem';

interface WalletListProps {
  showNotInstalled: boolean;
  visibleWallets: Wallet[];
  installedWallets: Wallet[];
  notInstalledWallets: Wallet[];
  isConnecting: boolean;
  currentConnector?: Connector;
  onToggleShowNotInstalled: () => void;
  onWalletClick: (wallet: Wallet) => void;
}

export const WalletList = ({
  onWalletClick,
  showNotInstalled,
  visibleWallets,
  installedWallets,
  notInstalledWallets,
  isConnecting,
  currentConnector,
  onToggleShowNotInstalled,
}: WalletListProps) => {
  return (
    <div className="flex flex-col text-center">
      <ul className="divide-y divide-[rgb(42,44,46)] overflow-hidden rounded-xl border border-[rgb(42,44,46)] bg-[rgb(20,20,21)]">
        {visibleWallets.map((wallet) => {
          const isCurrentlyConnecting = Boolean(
            isConnecting &&
              currentConnector?.name
                ?.toLowerCase()
                .includes(wallet.name.toLowerCase()),
          );

          return (
            <WalletItem
              onWalletClick={onWalletClick}
              key={wallet.id}
              wallet={wallet}
              isCurrentlyConnecting={isCurrentlyConnecting}
            />
          );
        })}

        {(installedWallets.length > 0 || notInstalledWallets.length > 0) && (
          <div>
            <button
              className="active:bg-bg-additional-2 flex w-full cursor-pointer items-center gap-3 border-[rgb(42,44,46)] p-4 hover:bg-[rgb(27,29,31)] focus-visible:outline-none"
              onClick={onToggleShowNotInstalled}
            >
              <span className="text-text-primary text-sm">
                {showNotInstalled
                  ? `Show detected wallets (${installedWallets.length})`
                  : `Show more options (${notInstalledWallets.length})`}
              </span>
            </button>
          </div>
        )}
      </ul>
    </div>
  );
};
