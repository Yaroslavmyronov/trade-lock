'use client';
import { CloseIcon, Preloader } from '@/shared';
import { Modal } from '@/shared/ui/Modal';
import type { StreamProvider } from '@metamask/providers';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useConnect } from 'wagmi';
import { ArrowIcon } from './icons/ArrowIcon';
import LogoImage from '@public/images/logo.png';

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// EIP-6963 типы
interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: StreamProvider;
}

const INSTALL_URLS: Record<string, string> = {
  'io.metamask': 'https://metamask.io/download/',
  'com.coinbase.wallet': 'https://www.coinbase.com/wallet/downloads',
  'io.rabby': 'https://rabby.io/',
  'app.phantom': 'https://phantom.app/download',
  'com.trustwallet.app': 'https://trustwallet.com/download',
  'io.zerion.wallet': 'https://zerion.io/download',
};

function useEIP6963() {
  const [providers, setProviders] = useState<
    Map<string, EIP6963ProviderDetail>
  >(new Map());

  useEffect(() => {
    const handleAnnouncement = (event: CustomEvent<EIP6963ProviderDetail>) => {
      setProviders((prev) => {
        const updated = new Map(prev);
        updated.set(event.detail.info.uuid, event.detail);
        return updated;
      });
    };

    window.addEventListener(
      'eip6963:announceProvider',
      handleAnnouncement as EventListener,
    );

    window.dispatchEvent(new CustomEvent('eip6963:requestProvider'));

    return () => {
      window.removeEventListener(
        'eip6963:announceProvider',
        handleAnnouncement as EventListener,
      );
    };
  }, []);

  return Array.from(providers.values());
}

function detectLegacyWallets() {
  if (typeof window === 'undefined') return [];

  const legacyWallets = [
    {
      name: 'MetaMask',
      rdns: 'io.metamask',
      icon: '/images/metamask.svg',
      detected: !!(window as any).ethereum?.isMetaMask,
    },
    {
      name: 'Coinbase Wallet',
      rdns: 'com.coinbase.wallet',
      icon: '/images/coinbase-wallet.svg',
      detected: !!(window as any).ethereum?.isCoinbaseWallet,
    },
    {
      name: 'Rabby',
      rdns: 'io.rabby',
      icon: '/images/rabby-wallet.svg',
      detected: !!(window as any).ethereum?.isRabby,
    },
    {
      name: 'Phantom',
      rdns: 'app.phantom',
      icon: '/images/phantom.png',
      detected: !!(window as any).phantom?.ethereum,
    },
  ];

  return legacyWallets;
}

export const ConnectModal = ({ isOpen, onClose }: ConnectModalProps) => {
  const [showNotInstalled, setShowNotInstalled] = useState(false);
  const { connect, connectors, status, error, variables } = useConnect();

  const eip6963Providers = useEIP6963();

  const legacyWallets = detectLegacyWallets();

  const isConnecting = status === 'pending';
  const currentConnector = variables?.connector;

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

            <div className="flex flex-col text-center">
              <ul className="divide-y divide-[rgb(42,44,46)] overflow-hidden rounded-xl border border-[rgb(42,44,46)] bg-[rgb(20,20,21)]">
                {visibleWallets.map((wallet) => {
                  const isCurrentlyConnecting =
                    isConnecting &&
                    currentConnector?.name
                      .toLowerCase()
                      .includes(wallet.name.toLowerCase());

                  return (
                    <div key={wallet.id}>
                      <button
                        onClick={() => handleWalletClick(wallet)}
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
                            <span className="text-xs text-gray-400">
                              EIP-6963 compatible
                            </span>
                          )}
                        </div>

                        <div className="order-3 flex max-w-[40%] flex-none flex-col justify-center self-stretch overflow-visible text-right">
                          {/* isCurrentlyConnecting */}
                          {isCurrentlyConnecting ? (
                            <Preloader />
                          ) : wallet.detected ? (
                            <div className="flex w-fit items-center gap-1 rounded bg-green-600/20 px-1.5 py-0.5 text-green-400">
                              <span className="text-xs leading-normal font-normal">
                                Detected
                              </span>
                            </div>
                          ) : (
                            <div className="flex w-fit items-center gap-1 rounded bg-blue-600/20 px-1.5 py-0.5 text-blue-400">
                              <span className="text-xs leading-normal font-normal">
                                Install
                              </span>
                            </div>
                          )}
                        </div>
                      </button>
                    </div>
                  );
                })}

                {(installedWallets.length > 0 ||
                  notInstalledWallets.length > 0) && (
                  <div>
                    <button
                      className="active:bg-bg-additional-2 flex w-full cursor-pointer items-center gap-3 border-[rgb(42,44,46)] p-4 hover:bg-[rgb(27,29,31)] focus-visible:outline-none"
                      onClick={() => setShowNotInstalled(!showNotInstalled)}
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
