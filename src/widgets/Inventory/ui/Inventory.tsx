'use client';
import { Propose } from '@/features';

import { NftResponse } from '@/entities/nfts/types';
import { FilterPanel } from '@/features/filter-panel';
import { SellButton } from '@/features/nft-sell';
import { Counter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';
import { usePropose } from '@/shared/store/usePropose';

import { useFetch } from '@/shared/lib/useFetch';
import { useSelectedNfts } from '@/shared/store/useSelectedNfts';
import { ProfilePrice } from './ProfilePrice';
import { UserNfts } from './UserNfts';

export const Inventory = ({ filter }: { filter: 'sell' | 'trade' }) => {
  const { selectedNfts, clearAll, toggleSelect, removeItem } =
    useSelectedNfts();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();
  const {
    data: nftsData,
    loading,
    error,
  } = useFetch<NftResponse>('/market/get-user-tokens');

  if (error) {
    return (
      <div className="flex size-full items-center justify-center">
        <span>Failed to load NFTs. Please try again.</span>
      </div>
    );
  }

  return (
    <div
      className={`size-full ${filter === 'sell' && opened === 'user' ? 'pl-[385px]' : ''}`}
    >
      <div className="relative flex min-h-full max-w-full grow flex-col px-5">
        <FilterPanel panel="user" close={close} opened={opened} open={open} />
        <ProfilePrice nftsData={nftsData} loading={loading} />
        <UserNfts
          selectedNfts={selectedNfts}
          toggleSelect={toggleSelect}
          removeItem={removeItem}
          nftsData={nftsData}
          loading={loading}
        />
        <Counter
          isOpen={isOpen}
          toggle={toggle}
          selectedNfts={selectedNfts}
          clearAll={clearAll}
        />
        <Propose
          isOpen={isOpen}
          removeItem={removeItem}
          toggleSelect={toggleSelect}
          selectedNfts={selectedNfts ?? []}
        />
        {filter === 'sell' && (
          <div className="flex pb-4">
            <SellButton selectedNfts={selectedNfts}></SellButton>
          </div>
        )}
      </div>
    </div>
  );
};
