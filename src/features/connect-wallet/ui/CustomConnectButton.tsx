'use client';

import { useState } from 'react';
import { ConnectModal } from './ConnectModal';

export function ConnectButton({
  сonnectButtonText,
  loginButtonClassNames,
}: {
  loginButtonClassNames?: string;
  сonnectButtonText?: string;
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalOpen(true)}
        className={
          loginButtonClassNames ??
          'cursor-pointer self-center bg-[#35373a] px-[15px] py-[11px] text-[14px] leading-3.5 text-white'
        }
      >
        {сonnectButtonText ?? 'Login'}
      </button>

      <ConnectModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      ></ConnectModal>
    </>
  );
}
