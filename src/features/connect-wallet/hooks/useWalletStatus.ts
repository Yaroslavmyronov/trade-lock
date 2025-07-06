import { useEffect, useRef } from 'react';
import { useDisconnect } from 'wagmi';

export function useWalletStatusPolling() {
  const { disconnect } = useDisconnect();

  const cancelledRef = useRef(false);
  const disconnectedOnceRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    disconnectedOnceRef.current = false;

    const checkAccounts = async () => {
      try {
        if (!window.ethereum?.request) return;

        const accounts: string[] = await window.ethereum.request({
          method: 'eth_accounts',
        });

        if (cancelledRef.current || disconnectedOnceRef.current) return;

        if (accounts.length === 0) {
          disconnect();
          disconnectedOnceRef.current = true;
        }
      } catch (error) {
        console.error('Error checking accounts:', error);
      }
    };

    checkAccounts();

    const interval = setInterval(checkAccounts, 2000);

    return () => {
      cancelledRef.current = true;
      clearInterval(interval);
    };
  }, [disconnect]);
}
