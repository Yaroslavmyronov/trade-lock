'use client';
import { Propose } from '@/features';

import { NftResponse } from '@/entities/nfts/types';
import { FilterPanel } from '@/features/filter-panel';
import { SellButton } from '@/features/nft-sell';
import { Counter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';
import { usePropose } from '@/shared/store/usePropose';

import { useSelectedNfts } from '@/shared/store/useSelectedNfts';
import { ProfilePrice } from './ProfilePrice';
import { UserNfts } from './UserNfts';

export const Inventory = ({
  filter,
  nftsData,
}: {
  filter: 'sell' | 'trade';
  nftsData: NftResponse;
}) => {
  const { selectedNfts, clearAll, toggleSelect, removeItem } =
    useSelectedNfts();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  return (
    <div
      className={`size-full ${filter === 'sell' && opened === 'user' ? 'pl-[385px]' : ''}`}
    >
      <div className="relative flex min-h-full max-w-full grow flex-col px-5">
        <FilterPanel panel="user" close={close} opened={opened} open={open} />
        <ProfilePrice nftsData={nftsData} />
        <UserNfts
          selectedNfts={selectedNfts}
          toggleSelect={toggleSelect}
          removeItem={removeItem}
          nftsData={nftsData}
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
          selectedNfts={selectedNfts}
          nftsData={nftsData}
        />
        {filter === 'sell' && (
          <div className="flex pb-4">
            <SellButton
              nftsData={nftsData}
              selectedNfts={selectedNfts}
            ></SellButton>
            {/* <SellButton nftsData={nftsData} selectedIds={selectedIds} /> */}
          </div>
        )}
      </div>
    </div>
  );
};
