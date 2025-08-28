'use client';
import { apiFetch } from '@/shared/api/fetchInstance';
import { useGlobalState } from '@/shared/store/useGlobalState';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { UserRejectedRequestError } from 'viem';
import { createSiweMessage } from 'viem/siwe';
import { useAccount, useSignMessage } from 'wagmi';

type AuthState = {
  status: 'idle' | 'signing' | 'verifying';
  errorMessage?: string;
  nonce?: string;
};

export const useEthereumAuth = () => {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { setAuthStatus } = useGlobalState();

  const [{ status, ...state }, setState] = useState<AuthState>({
    status: 'idle',
  });

  //Pre-fetch nonce when hooks initialization
  const onceRef = useRef(false);
  const getNonce = useCallback(async () => {
    try {
      const { data: nonce } = await apiFetch('/auth/nonce');
      setState((x) => ({ ...x, nonce }));
    } catch {
      setState((x) => ({
        ...x,
        errorMessage: 'Failed to prepare authentication',
        status: 'idle',
      }));
      toast.error('Failed to prepare authentication');
    }
  }, []);

  useEffect(() => {
    if (onceRef.current) return;
    onceRef.current = true;
    getNonce();
  }, [getNonce]);

  const signIn = useCallback(async () => {
    try {
      if (!address || !chainId || !state.nonce) {
        return;
      }

      setState((x) => ({
        ...x,
        errorMessage: undefined,
        status: 'signing',
      }));

      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce: state.nonce,
      });

      let signature: string;

      try {
        signature = await signMessageAsync({ message });
      } catch (error) {
        // If the user canceled the signature - this is not an error
        if (error instanceof UserRejectedRequestError) {
          toast.error('Signature request was rejected by user');
          return setState((x) => ({
            ...x,
            status: 'idle',
          }));
        }

        toast.error('Failed to sign message');
        return setState((x) => ({
          ...x,
          errorMessage: 'Failed to sign message',
          status: 'idle',
        }));
      }

      setState((x) => ({ ...x, status: 'verifying' }));

      try {
        await apiFetch('/auth/verify', {
          method: 'POST',
          body: JSON.stringify({ message, signature }),
        });
        setAuthStatus('authenticated');
        return true;
      } catch {
        toast.error('Failed to verify signature');
        return setState((x) => ({
          ...x,
          errorMessage: 'Failed to verify signature',
          status: 'idle',
        }));
      }
    } catch {
      toast.error('An unexpected error occurred');
      setState({
        errorMessage: 'An unexpected error occurred',
        status: 'idle',
      });
    }
  }, [address, chainId, state.nonce, setAuthStatus, signMessageAsync]);

  const signOut = useCallback(async () => {
    try {
      await apiFetch('auth/logout');
    } catch (e) {
      console.error('Logout error:', e);
    }
    setAuthStatus('unauthenticated');
  }, [setAuthStatus]);

  return {
    signIn,
    signOut,
    status,
    errorMessage: state.errorMessage,
    nonce: state.nonce,
  };
};
