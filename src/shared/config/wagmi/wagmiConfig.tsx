import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { cookieStorage, createStorage, http } from 'wagmi';
import { monadTestnet } from './chains';

export const wagmiConfig = getDefaultConfig({
  appName: 'Trade Lock',
  projectId: '5d5ef5177343259c717e35caf8f64965',
  chains: [monadTestnet],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
  transports: {
    [monadTestnet.id]: http(monadTestnet.rpcUrls.default.http[0]),
  },
});

// export function getConfig() {
//   return createConfig({
//     chains: [monadTestnet],
//     ssr: true,

//     storage: createStorage({
//       storage: cookieStorage,
//     }),
//     transports: {
//       [monadTestnet.id]: http(monadTestnet.rpcUrls.default.http[0]),
//     },
//   });
// }
