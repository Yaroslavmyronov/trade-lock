'use client';
import { Balance } from '@/entities/balance/ui/Balance';

import { UserMenu } from '@/features';
import { getAddress, isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import { MonadIcon } from './icons/MonadIcon';

export const Address = () => {
  const { address, connector, isConnected } = useAccount();
  const checkSumAddress = address ? getAddress(address) : undefined;

  const { data: ensName } = useEnsName({
    address: checkSumAddress,
    chainId: 1,
    query: {
      enabled: isAddress(checkSumAddress ?? ''),
    },
  });

  const { data: ensAvatar } = useEnsAvatar({
    name: ensName ? normalize(ensName) : undefined,
    chainId: 1,
    query: {
      enabled: Boolean(ensName),
      gcTime: 30_000,
    },
  });

  const normalizedEnsAvatar = ensAvatar ?? undefined;

  const shortAddress = checkSumAddress?.slice(2, 8) ?? '';

  return (
    <div className="ml-4 flex items-center gap-1">
      <div className="inline-flex h-10 items-center justify-center gap-2 bg-[rgb(42,44,46)] px-4 text-sm font-medium whitespace-nowrap disabled:pointer-events-none">
        {isConnected && !address ? (
          <div className="flex animate-pulse space-x-4">
            <div className="flex items-center space-y-6">
              <div className="h-4 w-28 rounded-sm bg-slate-300"></div>
            </div>
          </div>
        ) : (
          <>
            <MonadIcon />
            <span className="text-sm leading-normal font-normal">
              <div className="flex items-center">
                <div className="inline-flex items-center gap-1">
                  <div className="flex max-w-full items-center break-all">
                    <Balance address={address}></Balance>
                  </div>
                </div>
              </div>
            </span>
          </>
        )}
      </div>
      {isConnected && !address ? (
        <div className="flex h-10 animate-pulse space-x-4 bg-[rgb(42,44,46)] px-4">
          <div className="flex items-center space-y-6">
            <div className="mr-2 mb-0 size-[24px] rounded-full bg-slate-300"></div>
            <div className="h-4 w-12 rounded-sm bg-slate-300"></div>
          </div>
        </div>
      ) : (
        <UserMenu
          address={checkSumAddress}
          ensAvatar={normalizedEnsAvatar}
          connector={connector}
          shortAddress={shortAddress}
        ></UserMenu>
      )}
    </div>
  );
};
