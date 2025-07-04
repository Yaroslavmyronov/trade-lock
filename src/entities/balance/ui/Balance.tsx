'use client';

import { useWatchBalance } from '@/entities/user';
import { monadTestnet } from '@/shared/config/wagmi/chains';
import { Address, formatEther } from 'viem';

type BalanceProps = {
  address?: Address;
};

export const Balance = ({ address }: BalanceProps) => {
  const targetNetwork = monadTestnet;

  const {
    data: balance,
    isError,
    isLoading,
  } = useWatchBalance({
    address,
  });

  if (!address || isLoading || balance === null) {
    return (
      <div className="flex animate-pulse space-x-4">
        <div className="flex items-center space-y-6">
          <div className="h-3 w-28 rounded-sm bg-slate-300"></div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="border-base-content/30 flex max-w-fit cursor-pointer flex-col items-center rounded-md border-2 px-2">
        <div className="text-warning">Error</div>
      </div>
    );
  }

  const formattedBalance = balance ? Number(formatEther(balance.value)) : 0;

  return (
    <div className="flex w-full items-center justify-center">
      <>
        <span>{formattedBalance.toFixed(4)}</span>
        <span className="ml-1">{targetNetwork.nativeCurrency.symbol}</span>
      </>
    </div>
  );
};
