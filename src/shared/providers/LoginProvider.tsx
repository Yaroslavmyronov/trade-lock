'use client';

import LogoImage from '@public/images/logo.png';
import { useConnectModal } from '@rainbow-me/rainbowkit';
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
  const { openConnectModal } = useConnectModal();

  const isWalletConnected = Boolean(address && isConnected && connector);

  console.log('address', address);
  console.log('isConnected', isConnected);
  console.log('connector', connector);

  const isAuthenticated = authStatus === 'authenticated';
  const isLoading = authStatus === 'loading';

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Preloader />
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

      <button
        onClick={openConnectModal}
        className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[#836EF9] px-6 text-base font-medium whitespace-nowrap text-white transition duration-200 hover:bg-[#6F5AD8] focus:bg-[#6F5AD8] focus-visible:outline-hidden active:bg-[#6F5AD8] disabled:pointer-events-none disabled:opacity-40"
      >
        Connect wallet
      </button>
    </div>
  );

  // We will come back to this part later, when we will have the urge to have Wallet connection and Authentication as a different steps.
  // return (
  //   <div className="flex h-full flex-col items-center justify-center gap-12 select-none">
  //     {/* Логотип и описание */}
  //     <div className="flex flex-col items-center justify-center gap-4">
  //       <div className="flex items-center gap-3">
  //         <Image alt="TradeLock Logo" src={LogoImage} />
  //         <span className="text-[32px] leading-tight font-medium">
  //           TradeLock
  //         </span>
  //       </div>
  //       <span className="text-[18px] leading-tight font-medium">
  //         The largest NFT marketplace
  //       </span>
  //     </div>

  //     <button
  //       onClick={() => {
  //         /* твоя логика аутентификации */
  //       }}
  //       className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-[4px] bg-[#836EF9] px-6 text-base font-medium whitespace-nowrap text-white transition duration-200 hover:bg-[#6F5AD8] focus:bg-[#6F5AD8] focus-visible:outline-hidden active:bg-[#6F5AD8] disabled:pointer-events-none disabled:opacity-40"
  //     >
  //       Sign In
  //     </button>
  //   </div>
  // );
};
