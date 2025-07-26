'use client';
import { getConfig } from '@/shared/config/wagmi/wagmiConfig';
import toast from 'react-hot-toast';
import {
  Hash,
  SendTransactionParameters,
  TransactionReceipt,
  WalletClient,
} from 'viem';
import { Config, useWalletClient } from 'wagmi';
import { getPublicClient } from 'wagmi/actions';
import { SendTransactionMutate } from 'wagmi/query';

import { getBlockExplorerTxLink } from '@/shared/config/wagmi/chains/networks';
import { TransactorFuncOptions } from '../types/contract';
import { getParsedError } from './getParsedError';

type TransactionFunc = (
  tx:
    | (() => Promise<Hash>)
    | Parameters<SendTransactionMutate<Config, undefined>>[0],
  options?: TransactorFuncOptions,
) => Promise<Hash | undefined>;

/**
 * Custom notification content for TXs.
 */
const TxnNotification = ({
  message,
  blockExplorerLink,
}: {
  message: string;
  blockExplorerLink?: string;
}) => {
  return (
    <div className={`ml-1 flex cursor-default flex-col`}>
      <p className="my-0">{message}</p>
      {blockExplorerLink && blockExplorerLink.length > 0 ? (
        <a
          href={blockExplorerLink}
          target="_blank"
          rel="noreferrer"
          className="link block"
        >
          check out transaction
        </a>
      ) : null}
    </div>
  );
};

export const useTransactor = (
  _walletClient?: WalletClient,
): TransactionFunc => {
  let walletClient = _walletClient;
  const { data } = useWalletClient();

  // console.log('data', data);
  if (walletClient === undefined && data) {
    walletClient = data;
  }

  const result: TransactionFunc = async (tx, options) => {
    console.log('walletClient', walletClient);
    if (!walletClient) {
      toast.error('Cannot access account');
      console.error('⚡️ ~ file: useTransactor.tsx ~ error');
      return;
    }

    let notificationId = null;
    let transactionHash: Hash | undefined = undefined;
    let transactionReceipt: TransactionReceipt | undefined;
    let blockExplorerTxURL = '';
    try {
      const network = await walletClient.getChainId();
      // Get full transaction from public client
      const config = getConfig();
      const publicClient = getPublicClient(config);

      notificationId = toast.loading(
        <TxnNotification message="Awaiting for user confirmation" />,
      );
      if (typeof tx === 'function') {
        // Tx is already prepared by the caller
        const result = await tx();
        transactionHash = result;
      } else if (tx != null) {
        transactionHash = await walletClient.sendTransaction(
          tx as SendTransactionParameters,
        );
      } else {
        throw new Error('Incorrect transaction passed to transactor');
      }
      toast.remove(notificationId);

      blockExplorerTxURL = network
        ? getBlockExplorerTxLink(network, transactionHash)
        : '';

      notificationId = toast.loading(
        <TxnNotification
          message="Waiting for transaction to complete."
          blockExplorerLink={blockExplorerTxURL}
        />,
      );

      transactionReceipt = await publicClient.waitForTransactionReceipt({
        hash: transactionHash,
        confirmations: options?.blockConfirmations,
      });
      toast.remove(notificationId);

      if (transactionReceipt.status === 'reverted')
        throw new Error('Transaction reverted');

      toast.success(
        <TxnNotification
          message="Transaction completed successfully!"
          blockExplorerLink={blockExplorerTxURL}
        />,
        {
          icon: '🎉',
        },
      );

      if (options?.onBlockConfirmation)
        options.onBlockConfirmation(transactionReceipt);
    } catch (error: any) {
      if (notificationId) {
        toast.remove(notificationId);
      }
      console.error('⚡️ ~ file: useTransactor.ts ~ error', error);
      const message = getParsedError(error);

      // if receipt was reverted, show notification with block explorer link and return error
      if (transactionReceipt?.status === 'reverted') {
        toast.error(
          <TxnNotification
            message={message}
            blockExplorerLink={blockExplorerTxURL}
          />,
        );
        throw error;
      }

      toast.error(message);
      throw error;
    }

    return transactionHash;
  };

  return result;
};
