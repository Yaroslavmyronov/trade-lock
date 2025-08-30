'use client';
import { Propose } from '@/features';

import { FilterPanel } from '@/features/filter-panel';
import { SellButton } from '@/features/nft-sell';
import { Counter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';
import { usePropose } from '@/shared/store/usePropose';

import { userNftsApi } from '@/entities/nfts/api/userNftsApi';
import { useIntersection } from '@/shared/lib/useIntersection';
import { useSelectedNfts } from '@/shared/store/useSelectedNfts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProfilePrice } from './ProfilePrice';
import { UserNfts } from './UserNfts';

export const Inventory = ({ filter }: { filter: 'sell' | 'trade' }) => {
  const { selectedNfts, clearAll, toggleSelect, removeItem } =
    useSelectedNfts();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  const {
    data: userNftsResponse,
    error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    refetch,
  } = useInfiniteQuery({
    ...userNftsApi.getListInfiniteQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

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
        <FilterPanel
          refresh={refetch}
          isRefresh={isRefetching}
          panel="user"
          close={close}
          opened={opened}
          open={open}
        />
        <ProfilePrice
          nftAmount={userNftsResponse?.nftAmount ?? 0}
          totalValue={userNftsResponse?.totalValue ?? 0}
          loading={isLoading}
        />
        <UserNfts
          selectedNfts={selectedNfts}
          toggleSelect={toggleSelect}
          removeItem={removeItem}
          nftsData={userNftsResponse?.response ?? null}
          cursorRef={cursorRef}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
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
            <SellButton
              clearAll={clearAll}
              selectedNfts={selectedNfts}
            ></SellButton>
          </div>
        )}
      </div>
    </div>
  );
};
