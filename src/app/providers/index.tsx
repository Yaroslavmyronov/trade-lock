'use client';
import { useWalletStatusPolling } from '@/features/connect-wallet/hooks/useWalletStatus';
import { AuthManager } from '@/features/connect-wallet/ui/AuthManager';
import { apiFetch } from '@/shared/api/fetchInstance';
import { getConfig } from '@/shared/config/wagmi/wagmiConfig';
import { useGlobalState } from '@/shared/store/useGlobalState';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { type State, WagmiProvider } from 'wagmi';

interface ProvidersProps {
  children: ReactNode;
  initialState: State | undefined;
}

export const Providers = ({ children, initialState }: ProvidersProps) => {
  const [config] = useState(() => getConfig());
  const [queryClient] = useState(() => new QueryClient());
  return (
    <WagmiProvider config={config} initialState={initialState}>
      <QueryClientProvider client={queryClient}>
        <AuthManager></AuthManager>
        <WalletStatusWrapper>{children}</WalletStatusWrapper>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const WalletStatusWrapper = ({ children }: { children: ReactNode }) => {
  useWalletStatusPolling();
  const fetchingStatusRef = useRef(false);

  const { setAuthStatus } = useGlobalState();

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current) {
        return;
      }

      fetchingStatusRef.current = true;

      try {
        const data = await apiFetch('/auth/me');
        setAuthStatus(data.address ? 'authenticated' : 'unauthenticated');
      } catch (_error) {
        console.error(_error);

        setAuthStatus('unauthenticated');
      } finally {
        fetchingStatusRef.current = false;
      }
    };

    fetchStatus();

    window.addEventListener('focus', fetchStatus);
    return () => window.removeEventListener('focus', fetchStatus);
  }, []);

  return <>{children}</>;
};
