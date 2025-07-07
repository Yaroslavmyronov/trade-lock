import { useEthereumAuth } from '@/features/auth/services/signMessage';
import { useGlobalState } from '@/shared/store/useGlobalState';
import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { Modal } from './Modal';

export const AuthManager = () => {
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const { signIn } = useEthereumAuth();
  const { authStatus } = useGlobalState();

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isConnected && authStatus === 'unauthenticated') {
      setIsModalOpen(true);
    }
  }, [isConnected, authStatus]);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      setIsModalOpen(false);
    }
  }, [authStatus]);

  return (
    <Modal
      open={isModalOpen}
      onClose={() => {
        disconnect();
        setIsModalOpen(false);
      }}
      onConfirm={signIn}
    />
  );
};
