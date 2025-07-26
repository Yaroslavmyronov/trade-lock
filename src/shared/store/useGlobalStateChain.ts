import dappConfig from 'dapp.config';
import { create } from 'zustand';
import {
  ChainWithAttributes,
  NETWORKS_EXTRA_DATA,
} from '../config/wagmi/chains/networks';

/**
 * Zustand Store
 *
 * You can add global state to the app using this useGlobalState, to get & set
 * values from anywhere in the app.
 *
 * Think about it as a global useState.
 */

type GlobalState = {
  nativeCurrency: {
    price: number;
    isFetching: boolean;
  };
  setNativeCurrencyPrice: (newNativeCurrencyPriceState: number) => void;
  setIsNativeCurrencyFetching: (newIsNativeCurrencyFetching: boolean) => void;
  targetNetwork: ChainWithAttributes;
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) => void;
};

export const useGlobalStateChain = create<GlobalState>((set) => ({
  nativeCurrency: {
    price: 0,
    isFetching: true,
  },
  setNativeCurrencyPrice: (newValue: number): void =>
    set((state) => ({
      nativeCurrency: { ...state.nativeCurrency, price: newValue },
    })),
  setIsNativeCurrencyFetching: (newValue: boolean): void =>
    set((state) => ({
      nativeCurrency: { ...state.nativeCurrency, isFetching: newValue },
    })),
  targetNetwork: {
    ...dappConfig.targetNetworks[0],
    ...NETWORKS_EXTRA_DATA[dappConfig.targetNetworks[0].id],
  },
  setTargetNetwork: (newTargetNetwork: ChainWithAttributes) =>
    set(() => ({ targetNetwork: newTargetNetwork })),
}));
