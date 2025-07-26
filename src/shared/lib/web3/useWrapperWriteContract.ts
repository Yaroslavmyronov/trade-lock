'use client';
import { MutateOptions } from '@tanstack/react-query';
import type { Abi, ExtractAbiFunctionNames } from 'abitype';
import { useState } from 'react';
import toast from 'react-hot-toast';
import {
  Config,
  useAccount,
  useConfig,
  useWriteContract,
  UseWriteContractParameters,
} from 'wagmi';
import { WriteContractErrorType, WriteContractReturnType } from 'wagmi/actions';
import { WriteContractVariables } from 'wagmi/query';
import {
  ConfiguredChainId,
  ContractAbi,
  ContractName,
  simulateContractWriteAndNotifyError,
  UseWriteConfig,
  WrapperWriteContractOptions,
  WrapperWriteContractVariables,
} from '../types/contract';
import { useDeployedContractInfo } from './useDeployedContractInfo';
import { useSelectedNetwork } from './useSelectedNetworks';
import { useTransactor } from './useTransactor';

type WrapperWriteContractReturnType<TContractName extends ContractName> = Omit<
  ReturnType<typeof useWriteContract>,
  'writeContract' | 'writeContractAsync'
> & {
  isMining: boolean;
  writeContractAsync: <
    TFunctionName extends ExtractAbiFunctionNames<
      ContractAbi<TContractName>,
      'nonpayable' | 'payable'
    >,
  >(
    variables: WrapperWriteContractVariables<TContractName, TFunctionName>,
    options?: WrapperWriteContractOptions,
  ) => Promise<WriteContractReturnType | undefined>;
  writeContract: <
    TFunctionName extends ExtractAbiFunctionNames<
      ContractAbi<TContractName>,
      'nonpayable' | 'payable'
    >,
  >(
    variables: WrapperWriteContractVariables<TContractName, TFunctionName>,
    options?: Omit<
      WrapperWriteContractOptions,
      'onBlockConfirmation' | 'blockConfirmations'
    >,
  ) => void;
};

export const useWrapperWriteContract = <TContractName extends ContractName>(
  configOrName: UseWriteConfig<TContractName> | TContractName,
  writeContractParams?: UseWriteContractParameters,
): WrapperWriteContractReturnType<TContractName> => {
  const finalConfig =
    typeof configOrName === 'string'
      ? { contractName: configOrName, writeContractParams, chainId: undefined }
      : (configOrName as UseWriteConfig<TContractName>);
  const {
    contractName,
    chainId,
    writeContractParams: finalWriteContractParams,
  } = finalConfig;

  const wagmiConfig = useConfig();

  const { chain: accountChain } = useAccount();
  const writeTx = useTransactor();

  const [isMining, setIsMining] = useState(false);

  const wagmiContractWrite = useWriteContract(finalWriteContractParams);

  const selectedNetwork = useSelectedNetwork(chainId);

  const { data: deployedContractData } = useDeployedContractInfo({
    contractName,
    chainId: selectedNetwork.id as ConfiguredChainId,
  });

  const sendContractWriteAsyncTx = async <
    TFunctionName extends ExtractAbiFunctionNames<
      ContractAbi<TContractName>,
      'nonpayable' | 'payable'
    >,
  >(
    variables: WrapperWriteContractVariables<TContractName, TFunctionName>,
    options?: WrapperWriteContractOptions,
  ) => {
    if (!deployedContractData) {
      toast.error(
        'Target Contract is not deployed, did you forget to run `yarn deploy`?',
      );

      return;
    }

    if (!accountChain?.id) {
      toast.error('Please connect your wallet');
      return;
    }

    if (accountChain?.id !== selectedNetwork.id) {
      toast.error(
        `Wallet is connected to the wrong network. Please switch to ${selectedNetwork.name}`,
      );
      return;
    }

    try {
      setIsMining(true);
      const { blockConfirmations, onBlockConfirmation, ...mutateOptions } =
        options || {};

      const writeContractObject = {
        abi: deployedContractData.abi as Abi,
        address: deployedContractData.address,
        ...variables,
      } as WriteContractVariables<Abi, string, any[], Config, number>;

      if (!finalConfig.disableSimulate) {
        await simulateContractWriteAndNotifyError({
          wagmiConfig,
          writeContractParams: writeContractObject,
        });
      }

      const makeWriteWithParams = () =>
        wagmiContractWrite.writeContractAsync(
          writeContractObject,
          mutateOptions as
            | MutateOptions<
                WriteContractReturnType,
                WriteContractErrorType,
                WriteContractVariables<Abi, string, any[], Config, number>,
                unknown
              >
            | undefined,
        );
      const writeTxResult = await writeTx(makeWriteWithParams, {
        blockConfirmations,
        onBlockConfirmation,
      });

      return writeTxResult;
    } catch (error: any) {
      throw error;
    } finally {
      setIsMining(false);
    }
  };

  const sendContractWriteTx = <
    TContractName extends ContractName,
    TFunctionName extends ExtractAbiFunctionNames<
      ContractAbi<TContractName>,
      'nonpayable' | 'payable'
    >,
  >(
    variables: WrapperWriteContractVariables<TContractName, TFunctionName>,
    options?: Omit<
      WrapperWriteContractOptions,
      'onBlockConfirmation' | 'blockConfirmations'
    >,
  ) => {
    if (!deployedContractData) {
      toast.error(
        'Target Contract is not deployed, did you forget to run `yarn deploy`?',
      );
      return;
    }

    if (!accountChain?.id) {
      toast.error('Please connect your wallet');
      return;
    }

    if (accountChain?.id !== selectedNetwork.id) {
      toast.error(
        `Wallet is connected to the wrong network. Please switch to ${selectedNetwork.name}`,
      );
      return;
    }

    wagmiContractWrite.writeContract(
      {
        abi: deployedContractData.abi as Abi,
        address: deployedContractData.address,
        ...variables,
      } as WriteContractVariables<Abi, string, any[], Config, number>,
      options as
        | MutateOptions<
            WriteContractReturnType,
            WriteContractErrorType,
            WriteContractVariables<Abi, string, any[], Config, number>,
            unknown
          >
        | undefined,
    );
  };

  return {
    ...wagmiContractWrite,
    isMining,
    writeContractAsync: sendContractWriteAsyncTx,
    writeContract: sendContractWriteTx,
  };
};
