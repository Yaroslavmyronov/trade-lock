'use client';
import { useAccount } from 'wagmi';
import Image from 'next/image';
import LogoImage from '@public/images/logo.png';
import { ConnectButton } from '@/features/connect-wallet/ui/CustomConnectButton';

export const LoginProvider = ({ children }: { children: React.ReactNode }) => {
  const { address, isConnected } = useAccount();
  if (isConnected && address) {
    return <>{children}</>;
  }
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <Image alt="" src={LogoImage}></Image>
      <div>Please log in to continue</div>
      <ConnectButton loginButtonClassNames="flex min-h-[36px] min-w-[100px] mt-2 cursor-pointer items-center justify-center rounded-[2px] bg-[#836EF9] px-3 disabled:cursor-not-allowed disabled:bg-[#A5A5A5]" />
    </div>
  );
};
