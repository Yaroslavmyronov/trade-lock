import {
  QueryObserverResult,
  RefetchOptions,
  useQueryClient,
} from '@tanstack/react-query';
import type { ExtractAbiFunctionNames } from 'abitype';
import { useEffect } from 'react';
import { ReadContractErrorType } from 'viem';
import { useBlockNumber, useReadContract } from 'wagmi';

import {
  AbiFunctionReturnType,
  ConfiguredChainId,
  ContractAbi,
  ContractName,
  UseWrapperReadConfig,
} from '../types/contract';
import { useDeployedContractInfo } from './useDeployedContractInfo';
import { useSelectedNetwork } from './useSelectedNetworks';

export const useWrapperReadContract = <
  TContractName extends ContractName,
  TFunctionName extends ExtractAbiFunctionNames<
    ContractAbi<TContractName>,
    'pure' | 'view'
  >,
>({
  contractName,
  functionName,
  args,
  chainId,
  ...readConfig
}: UseWrapperReadConfig<TContractName, TFunctionName>) => {
  const selectedNetwork = useSelectedNetwork(chainId);
  const { data: deployedContract } = useDeployedContractInfo({
    contractName,
    chainId: selectedNetwork.id as ConfiguredChainId,
  });

  const { query: queryOptions, watch, ...readContractConfig } = readConfig;
  // set watch to true by default
  const defaultWatch = watch ?? true;

  const readContractHookRes = useReadContract({
    chainId: selectedNetwork.id,
    functionName,
    address: deployedContract?.address,
    abi: deployedContract?.abi,
    args,
    ...(readContractConfig as any),
    query: {
      enabled: !Array.isArray(args) || !args.some((arg) => arg === undefined),
      ...queryOptions,
    },
  }) as Omit<ReturnType<typeof useReadContract>, 'data' | 'refetch'> & {
    data: AbiFunctionReturnType<ContractAbi, TFunctionName> | undefined;
    refetch: (
      options?: RefetchOptions | undefined,
    ) => Promise<
      QueryObserverResult<
        AbiFunctionReturnType<ContractAbi, TFunctionName>,
        ReadContractErrorType
      >
    >;
  };

  const queryClient = useQueryClient();
  const { data: blockNumber } = useBlockNumber({
    watch: defaultWatch,
    chainId: selectedNetwork.id,
    query: {
      enabled: defaultWatch,
    },
  });

  useEffect(() => {
    if (defaultWatch) {
      queryClient.invalidateQueries({ queryKey: readContractHookRes.queryKey });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockNumber]);

  return readContractHookRes;
};
