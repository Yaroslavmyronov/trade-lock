import type { StreamProvider } from '@metamask/providers';
import { useEffect, useState } from 'react';

interface EIP6963ProviderInfo {
  uuid: string;
  name: string;
  icon: string;
  rdns: string;
}

interface EIP6963ProviderDetail {
  info: EIP6963ProviderInfo;
  provider: StreamProvider;
}

export const useEIP6963 = () => {
  const [providers, setProviders] = useState<
    Map<string, EIP6963ProviderDetail>
  >(new Map());

  useEffect(() => {
    const handleAnnouncement = (event: CustomEvent<EIP6963ProviderDetail>) => {
      setProviders((prev) => {
        const updated = new Map(prev);
        updated.set(event.detail.info.uuid, event.detail);
        return updated;
      });
    };

    window.addEventListener(
      'eip6963:announceProvider',
      handleAnnouncement as EventListener,
    );

    window.dispatchEvent(new CustomEvent('eip6963:requestProvider'));

    return () => {
      window.removeEventListener(
        'eip6963:announceProvider',
        handleAnnouncement as EventListener,
      );
    };
  }, []);

  return Array.from(providers.values());
};
