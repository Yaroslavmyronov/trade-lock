import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

import { useEthereumAuth } from '@/features/auth/services/signMessage';
import { useGlobalState } from '@/shared/store/useGlobalState';
import { Modal } from './Modal';

export const AuthManager = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { signIn } = useEthereumAuth();
  const { authStatus } = useGlobalState();

  useEffect(() => {
    if (isConnected && authStatus === 'unauthenticated') {
      setIsModalOpen(true);
    }
  }, [isConnected, authStatus]);

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        disconnect();
        setIsModalOpen(false);
      }}
      onConfirm={signIn}
    ></Modal>
  );
};
