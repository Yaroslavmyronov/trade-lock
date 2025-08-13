'use client';
import { apiFetch } from '@/shared/api/fetchInstance';
import { useGlobalState } from '@/shared/store/useGlobalState';
import { useCallback, useState } from 'react';
import { createSiweMessage } from 'viem/siwe';
import { useAccount, useSignMessage } from 'wagmi';

export const useEthereumAuth = () => {
  const { address, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { setAuthStatus } = useGlobalState();
  const [isSigning, setIsSigning] = useState(false);

  const signIn = useCallback(async () => {
    try {
      if (!address || !chainId) throw new Error('Wallet not connected');
      setIsSigning(true);
      console.log('signIn');
      const res = await apiFetch('/auth/nonce');
      const nonce = await res.text();

      const message = createSiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in with Ethereum to the app.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });

      const signature = await signMessageAsync({ message });

      setAuthStatus('loading');

      await apiFetch('/auth/verify', {
        method: 'POST',
        body: JSON.stringify({ message, signature }),
      });

      setAuthStatus('authenticated');
    } catch (error) {
      console.error('Sign-in error:', error);
      setAuthStatus('unauthenticated');
    } finally {
      setIsSigning(false);
    }
  }, [address, chainId, setAuthStatus, signMessageAsync]);

  const signOut = useCallback(async () => {
    try {
      await apiFetch('auth/logout');
    } catch (e) {
      console.error('Logout error:', e);
    }
    setAuthStatus('unauthenticated');
  }, []);

  return {
    signIn,
    signOut,
    isSigning,
  };
};
