'use client';
import { Balance } from '@/entities/balance/ui/Balance';

import { UserMenu } from '@/features';
import { ConnectButton } from '@/features/connect-wallet/ui/CustomConnectButton';
import { getAddress, isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { useAccount, useEnsAvatar, useEnsName } from 'wagmi';
import { MonadIcon } from './icons/MondIcon';

export const Address = () => {
  const { address, connector, isConnected, status } = useAccount();
  const checkSumAddress = address ? getAddress(address) : undefined;

  // Получаем ENS имя
  const { data: ensName } = useEnsName({
    address: checkSumAddress,
    chainId: 1,
    query: {
      enabled: isAddress(checkSumAddress ?? ''),
    },
  });

  console.log('isConnected', isConnected);
  console.log('address', address);
  console.log('status', status);
  // Получаем ENS аватар
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

  if (!checkSumAddress) {
    return <ConnectButton></ConnectButton>;
  }

  return (
    <div className="flex items-center gap-1">
      <div className="inline-flex h-10 items-center justify-center gap-2 bg-[rgb(42,44,46)] px-4 text-sm font-medium whitespace-nowrap disabled:pointer-events-none">
        <MonadIcon />
        <span className="text-sm leading-normal font-normal">
          <div className="flex items-center">
            <div className="inline-flex items-center gap-1 truncate">
              <div className="flex max-w-full items-center truncate break-all">
                <Balance address={address}></Balance>
              </div>
            </div>
            <div className="mx-3 h-4 w-px shrink-0 bg-[#fff]"></div>
            <div className="inline-flex items-center gap-1 truncate bg-[rgb(141,210,148)] opacity-10">
              <div className="flex max-w-full items-center truncate break-all">
                <span>30</span>
                <span>MON</span>
              </div>
            </div>
          </div>
        </span>
      </div>
      {/* account */}
      <UserMenu
        address={checkSumAddress}
        ensAvatar={normalizedEnsAvatar}
        connector={connector}
        shortAddress={shortAddress}
      ></UserMenu>
    </div>
  );
};
