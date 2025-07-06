import { create } from 'zustand';

// import { ChainWithAttributes } from '~~/utils/scaffold-eth';

type GlobalState = {
  // targetNetwork: ChainWithAttributes;
  // setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
  authStatus: 'loading' | 'unauthenticated' | 'authenticated';
  setAuthStatus: (
    newStatus: 'loading' | 'unauthenticated' | 'authenticated',
  ) => void;
};

export const useGlobalState = create<GlobalState>((set) => ({
  // targetNetwork: scaffoldConfig.targetNetworks[0],
  // setTargetNetwork: (newTargetNetwork: ChainWithAttributes) =>
  //   set(() => ({ targetNetwork: newTargetNetwork })),
  authStatus: 'loading',
  setAuthStatus: (newStatus: 'loading' | 'unauthenticated' | 'authenticated') =>
    set(() => ({ authStatus: newStatus })),
}));
