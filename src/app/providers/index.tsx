'use client';

import { AuthManager } from '@/features/connect-wallet/ui/AuthManager';
import { apiFetch } from '@/shared/api/fetchInstance';
import { monadTestnet } from '@/shared/config/wagmi/chains';
import { wagmiConfig } from '@/shared/config/wagmi/wagmiConfig';
import { useGlobalState } from '@/shared/store/useGlobalState';
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useEffect, useRef, useState } from 'react';
import { cookieToInitialState, WagmiProvider } from 'wagmi';
import { WebSocketProvider } from './webSocketProvider';
interface ProvidersProps {
  children: ReactNode;
  cookie: string;
}

export const Providers = ({ children, cookie }: ProvidersProps) => {
  const [queryClient] = useState(() => new QueryClient());
  const initialState = cookieToInitialState(wagmiConfig, cookie);
  return (
    <WagmiProvider
      config={wagmiConfig}
      {...(initialState ? { initialState } : {})}
    >
      <QueryClientProvider client={queryClient}>
        <WebSocketProvider>
          <RainbowKitProvider
            appInfo={{
              appName: 'Trade Lock',
            }}
            initialChain={monadTestnet.id}
            modalSize="compact"
            theme={darkTheme({
              ...darkTheme.accentColors.purple,
            })}
          >
            <AuthManager></AuthManager>
            <WalletStatusWrapper>{children}</WalletStatusWrapper>
          </RainbowKitProvider>
        </WebSocketProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const WalletStatusWrapper = ({ children }: { children: ReactNode }) => {
  const fetchingStatusRef = useRef(false);

  const { setAuthStatus } = useGlobalState();

  useEffect(() => {
    const fetchStatus = async () => {
      if (fetchingStatusRef.current) {
        return;
      }

      fetchingStatusRef.current = true;

      try {
        const { data } = await apiFetch('/auth/me');
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
