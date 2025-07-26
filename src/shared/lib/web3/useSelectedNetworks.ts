'use client';
import {
  ChainWithAttributes,
  NETWORKS_EXTRA_DATA,
} from '@/shared/config/wagmi/chains/networks';
import dappConfig from 'dapp.config';

import { useGlobalStateChain } from '@/shared/store/useGlobalStateChain';
import { ConfiguredChainId } from '../types/contract';

/**
 * Given a chainId, retrives the network object from `scaffold.config`,
 * if not found default to network set by `useTargetNetwork` hook
 */
export function useSelectedNetwork(
  chainId?: ConfiguredChainId,
): ChainWithAttributes {
  const globalTargetNetwork = useGlobalStateChain(
    ({ targetNetwork }) => targetNetwork,
  );
  const targetNetwork = dappConfig.targetNetworks.find(
    (targetNetwork) => targetNetwork.id === chainId,
  );

  if (targetNetwork) {
    return { ...targetNetwork, ...NETWORKS_EXTRA_DATA[targetNetwork.id] };
  }

  return globalTargetNetwork;
}
