import { getConfig } from '@/shared/config/wagmi/wagmiConfig';
import { Header } from '@/widgets/Header';
import '@shared/styles/globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { cookieToInitialState } from 'wagmi';
import { Providers } from './providers';

export const metadata: Metadata = {
  title: 'Trade Lock',
  description: 'A decentralized NFT trading platform',
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialState = cookieToInitialState(
    getConfig(),
    (await headers()).get('cookie'),
  );
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers initialState={initialState}>
          <Header></Header>
          <main className="grow overflow-auto">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
