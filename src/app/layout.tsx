import { BuyModal } from '@/features/nft-buy';
import { Header } from '@/widgets/header';
import { MyTrades } from '@/widgets/my-trades';
import { TradeModal } from '@/widgets/trade-modal';
import '@rainbow-me/rainbowkit/styles.css';
import '@shared/styles/globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Toaster } from 'react-hot-toast';
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
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers cookie={(await headers()).get('cookie') ?? ''}>
          <div className="flex h-full min-h-screen grow flex-col">
            <Header />
            <main className="grow overflow-auto">{children}</main>
          </div>
          <Toaster position="bottom-right" />
          <MyTrades />
          <TradeModal />
          <BuyModal />
        </Providers>
      </body>
    </html>
  );
}
