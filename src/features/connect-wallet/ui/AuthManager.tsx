import { useGlobalState } from '@/shared/store/useGlobalState';
import { useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';
import { SignIn } from './SignIn';

export const AuthManager = () => {
  const { isConnected, connector } = useAccount();
  const { disconnect } = useDisconnect();

  const { authStatus } = useGlobalState();

  const [isModalOpen, setIsModalOpen] = useState(false);
  console.log('authStatus', authStatus);

  useEffect(() => {
    if (connector && !connector.getChainId) {
      console.warn('Zombie connector detected, disconnecting...');
      disconnect();
    }
  }, [connector, disconnect]);

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
    <SignIn
      open={isModalOpen}
      onClose={() => {
        disconnect();
        setIsModalOpen(false);
      }}
    />
  );
};
