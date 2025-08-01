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
        <Preloader />
      </div>
    );
  }

  // Кошелек подключен и пользователь аутентифицирован — показываем контент
  if (isWalletConnected && isAuthenticated) {
    return <>{children}</>;
  }

  // Если кошелек НЕ подключен — показываем кнопку подключения
  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 select-none">
      {/* Логотип и описание */}
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

      <ConnectButton
        сonnectButtonText="Connect wallet"
        loginButtonClassNames="inline-flex items-center whitespace-nowrap rounded-[4px] transition duration-200 justify-center font-medium focus-visible:outline-hidden hover:bg-[#6F5AD8] focus:bg-[#6F5AD8] active:bg-[#6F5AD8] text-white h-12 gap-2 px-6 text-base disabled:pointer-events-none disabled:opacity-40 bg-[#836EF9] cursor-pointer"
      />
    </div>
  );

  // Если кошелек подключен, но не аутентифицирован — например, показываем кнопку логина
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
