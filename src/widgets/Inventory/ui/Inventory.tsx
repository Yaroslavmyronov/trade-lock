'use client';
import { Propose } from '@/features';

import { NftResponse } from '@/entities/nfts/types';
import { FilterPanel } from '@/features/filter-panel';
import { Counter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';
import { usePropose } from '@/shared/store/usePropose';
import { useSelectedCards } from '@/shared/store/useSelectedCards';
import { ProfilePrice } from './ProfilePrice';
import { UserNfts } from './UserNfts';

export type CardData = {
  id: number;
  title: string;
};

export const Inventory = ({
  filter,
  nftsData,
}: {
  filter: 'sell' | 'trade';
  nftsData: NftResponse;
}) => {
  const { selectedIds, clearAll, toggleSelect, removeItem } =
    useSelectedCards();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  return (
    <div
      className={`size-full ${filter === 'sell' && opened === 'user' ? 'pl-[385px]' : ''}`}
    >
      <div className="relative flex min-h-full max-w-full grow flex-col px-5">
        <FilterPanel panel="user" close={close} opened={opened} open={open} />
        <ProfilePrice />
        <UserNfts
          selectedIds={selectedIds}
          toggleSelect={toggleSelect}
          removeItem={removeItem}
          nftsData={nftsData}
        />
        <Counter
          isOpen={isOpen}
          toggle={toggle}
          selectedIds={selectedIds}
          clearAll={clearAll}
        />
        <Propose
          isOpen={isOpen}
          removeItem={removeItem}
          toggleSelect={toggleSelect}
          selectedIds={selectedIds}
          nftsData={nftsData}
        />
      </div>
    </div>
  );
};
