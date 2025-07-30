'use client';

import { ConnectButton } from '@/features/connect-wallet/ui/CustomConnectButton';
import LogoImage from '@public/images/logo.png';
import Image from 'next/image';
import { useAccount } from 'wagmi';
import { useGlobalState } from '../store/useGlobalState';
import { Preloader } from '../ui';

interface LoginProviderProps {
  children: React.ReactNode;
}

export const LoginProvider = ({ children }: LoginProviderProps) => {
  const { address, isConnected, connector } = useAccount();
  const { authStatus } = useGlobalState();

  const isWalletConnected = Boolean(address && isConnected && connector);
  const isAuthenticated = authStatus === 'authenticated';
  const isLoading = authStatus === 'loading';

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Preloader></Preloader>
      </div>
    );
  }

  if (isWalletConnected && isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 select-none">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex items-center gap-3">
          <Image alt="TradeLock Logo" src={LogoImage} />
          <span className="text-[32px] leading-tight font-medium">
            TradeLock
          </span>
        </div>
        <span className="text-[18px] leading-tight font-medium">
          The largest NFT marketplace
        </span>
      </div>

      {isAuthenticated ? (
        <ConnectButton
          сonnectButtonText="Connect wallet"
          loginButtonClassNames="inline-flex items-center whitespace-nowrap rounded-[4px] transition duration-200 justify-center font-medium focus-visible:outline-hidden hover:bg-[#6F5AD8] focus:bg-[#6F5AD8] active:bg-[#6F5AD8] text-white h-12 gap-2 px-6 text-base disabled:pointer-events-none disabled:opacity-40 bg-[#836EF9] cursor-pointer"
        />
      ) : (
        <div>Sign With Ethereum</div>
      )}
    </div>
  );
};
