import { cookieStorage, createConfig, createStorage, http } from 'wagmi';

import { monadTestnet } from './chains';

export function getConfig() {
  return createConfig({
    chains: [monadTestnet],

    ssr: true,
    storage: createStorage({
      storage: cookieStorage,
    }),
    transports: {
      [monadTestnet.id]: http(monadTestnet.rpcUrls.default.http[0]),
    },
  });
}
