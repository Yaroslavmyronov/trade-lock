'use client';
import { useWalletStatusPolling } from '@/features/connect-wallet/hooks/useWalletStatus';
import { getConfig } from '@/shared/config/wagmi/wagmiConfig';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';
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
        <WalletStatusWrapper>{children}</WalletStatusWrapper>
      </QueryClientProvider>
    </WagmiProvider>
  );
};

const WalletStatusWrapper = ({ children }: { children: ReactNode }) => {
  useWalletStatusPolling();
  return <>{children}</>;
};
