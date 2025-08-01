'use client';
import { CloseIcon } from '@/shared';
import { Modal } from '@/shared/ui/Modal';
import LogoImage from '@public/images/logo.png';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Connector, useConnect } from 'wagmi';
import { useEIP6963 } from '../hooks/useEIP6963';
import { detectLegacyWallets } from '../lib/detectLegacyWallets';
import { ArrowIcon } from './icons/ArrowIcon';
import { WalletList } from './WalletList';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INSTALL_URLS: Record<string, string> = {
  'io.metamask': 'https://metamask.io/download/',
  'com.coinbase.wallet': 'https://www.coinbase.com/wallet/downloads',
  'io.rabby': 'https://rabby.io/',
  'app.phantom': 'https://phantom.app/download',
  'com.trustwallet.app': 'https://trustwallet.com/download',
  'io.zerion.wallet': 'https://zerion.io/download',
};

export const ConnectModal = ({ isOpen, onClose }: ConnectModalProps) => {
  const [showNotInstalled, setShowNotInstalled] = useState(false);
  const { connect, connectors, status, error, variables } = useConnect();

  const eip6963Providers = useEIP6963();

  const legacyWallets = detectLegacyWallets();

  const isConnecting = status === 'pending';
  const currentConnector = variables?.connector as Connector | undefined;

  const allWallets = useMemo(() => {
    const walletMap = new Map();

    eip6963Providers.forEach((provider) => {
      walletMap.set(provider.info.rdns, {
        id: provider.info.rdns,
        name: provider.info.name,
        icon: provider.info.icon,
        rdns: provider.info.rdns,
        detected: true,
        type: 'eip6963',
        provider: provider.provider,
      });
    });

    legacyWallets.forEach((wallet) => {
      if (!walletMap.has(wallet.rdns)) {
        walletMap.set(wallet.rdns, {
          id: wallet.rdns,
          name: wallet.name,
          icon: wallet.icon,
          rdns: wallet.rdns,
          detected: wallet.detected,
          type: 'legacy',
          provider: wallet.detected ? (window as any).ethereum : null,
        });
      }
    });

    return Array.from(walletMap.values());
  }, [eip6963Providers, legacyWallets]);

  const installedWallets = allWallets.filter((w) => w.detected);
  const notInstalledWallets = allWallets.filter((w) => !w.detected);

  const visibleWallets = showNotInstalled
    ? notInstalledWallets
    : installedWallets;

  const onToggleShowNotInstalled = () => setShowNotInstalled(!showNotInstalled);

  const handleWalletClick = async (wallet: any) => {
    if (!wallet.detected) {
      const installUrl = INSTALL_URLS[wallet.rdns];
      if (installUrl) {
        window.open(installUrl, '_blank');
      }
      return;
    }

    const wagmiConnector = connectors.find((c) => {
      if (wallet.type === 'eip6963') {
        return (
          c.name.toLowerCase().includes(wallet.name.toLowerCase()) ||
          wallet.name.toLowerCase().includes(c.name.toLowerCase())
        );
      }

      return (
        c.name.toLowerCase() === wallet.name.toLowerCase() ||
        c.id.includes(wallet.rdns.split('.').pop() || '')
      );
    });

    if (wagmiConnector) {
      try {
        await connect({ connector: wagmiConnector });
      } catch (error) {
        console.error('Connection failed:', error);
      }
    } else {
      console.warn('No wagmi connector found for wallet:', wallet.name);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="relative w-[420px] max-w-[calc(100vw-32px)] rounded-xl border border-[rgb(42,44,46)] bg-[rgb(16,16,17)] py-2">
        <div className="absolute top-6 right-6 translate-x-1.5">
          <button
            onClick={onClose}
            className="hover:bg-darkPurpl cursor-pointer rounded-[6px] p-0.5 text-xl text-white transition-colors duration-200"
          >
            <CloseIcon width={24} height={24} />
          </button>
        </div>
        <div className="flex max-h-[calc(100vh-60px)] flex-col">
          <div className="[&::-webkit-scrollbar-thumb]:bg-bg-additional-3 [&::-webkit-scrollbar-thumb]:hover:bg-bg-additional-3 [&::-webkit-scrollbar-thumb]:active:bg-bg-additional-3 [&::-webkit-scrollbar-track]:bg-bg-app [&::-webkit-scrollbar]:bg-bg-app flex flex-col overflow-y-auto px-6 pt-12 pb-6 [&::-webkit-scrollbar]:size-2 [&::-webkit-scrollbar-thumb]:rounded">
            <div className="mb-6 flex flex-col items-center justify-center">
              <div className="flex size-[100px] flex-col items-center justify-center overflow-hidden rounded-full drop-shadow-sm">
                <Image src={LogoImage} alt="Logo" />
              </div>
            </div>

            <h2 className="text-display-sm mb-8 text-center leading-tight font-medium">
              Connect with TradeLock
            </h2>

            {installedWallets.length === 0 && !showNotInstalled && (
              <div className="mb-4 rounded-lg border border-yellow-500/20 bg-yellow-500/10 p-4">
                <p className="text-center text-sm text-yellow-200">
                  No wallets detected. Install a wallet to continue.
                </p>
              </div>
            )}

            <WalletList
              onWalletClick={handleWalletClick}
              onToggleShowNotInstalled={onToggleShowNotInstalled}
              currentConnector={currentConnector}
              isConnecting={isConnecting}
              notInstalledWallets={notInstalledWallets}
              installedWallets={installedWallets}
              visibleWallets={visibleWallets}
              showNotInstalled={showNotInstalled}
            ></WalletList>

            {showNotInstalled && (
              <button
                onClick={() => setShowNotInstalled(false)}
                className="text-md absolute top-3 left-3 inline-flex h-12 w-12 cursor-pointer items-center justify-center gap-2 rounded-full p-3 font-medium whitespace-nowrap transition duration-200 focus-visible:outline-hidden"
              >
                <ArrowIcon />
              </button>
            )}

            {error && (
              <div className="mt-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3">
                <p className="text-center text-sm text-red-400">
                  {error.message}
                </p>
              </div>
            )}

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 rounded bg-gray-800 p-2 text-xs">
                <div>EIP-6963 providers: {eip6963Providers.length}</div>
                <div>Total wallets: {allWallets.length}</div>
                <div>Detected: {installedWallets.length}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};
