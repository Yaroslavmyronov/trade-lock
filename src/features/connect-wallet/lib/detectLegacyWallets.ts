export const detectLegacyWallets = () => {
  if (typeof window === 'undefined') return [];

  const legacyWallets = [
    {
      name: 'MetaMask',
      rdns: 'io.metamask',
      icon: '/images/metamask.svg',
      detected: !!(window as any).ethereum?.isMetaMask,
    },
    {
      name: 'Coinbase Wallet',
      rdns: 'com.coinbase.wallet',
      icon: '/images/coinbase-wallet.svg',
      detected: !!(window as any).ethereum?.isCoinbaseWallet,
    },
    {
      name: 'Rabby',
      rdns: 'io.rabby',
      icon: '/images/rabby-wallet.svg',
      detected: !!(window as any).ethereum?.isRabby,
    },
    {
      name: 'Phantom',
      rdns: 'app.phantom',
      icon: '/images/phantom.png',
      detected: !!(window as any).phantom?.ethereum,
    },
  ];

  return legacyWallets;
};
