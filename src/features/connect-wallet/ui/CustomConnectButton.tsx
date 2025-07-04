'use client';

import { useState } from 'react';
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi';
import { ConnectModal } from './ConnectModal';

export function ConnectButton() {
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName ?? undefined });

  const [isModalOpen, setModalOpen] = useState(false);

  if (address) {
    return (
      <div>
        {ensAvatar && (
          <img
            src={ensAvatar}
            alt="ENS Avatar"
            className="mr-2 inline-block h-8 w-8 rounded-full"
          />
        )}
        <span>{ensName ? `${ensName} (${address})` : address}</span>
        <div>Connected to {connector?.name}</div>
        <button
          onClick={() => disconnect()}
          className="mt-2 rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className="cursor-pointer self-center bg-[#35373a] px-[15px] py-[11px] text-[14px] leading-3.5 text-white"
      >
        Login
      </button>

      <ConnectModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      ></ConnectModal>
    </>
  );
}
