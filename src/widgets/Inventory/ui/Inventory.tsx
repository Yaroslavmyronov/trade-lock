'use client';
import { Propose } from '@/features';

import { FilterPanel } from '@/features/filter-panel';
import { SellButton } from '@/features/nft-sell';
import { Counter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';
import { usePropose } from '@/shared/store/usePropose';

import { userNftsApi } from '@/entities/nfts/api/userNftsApi';
import { TradeButton } from '@/features/nft-trade';
import { useIntersection } from '@/shared/lib/useIntersection';
import { useMarketSelectedNfts } from '@/shared/store/useMarketSelectedNfts';
import { useSelectedNfts } from '@/shared/store/useSelectedNfts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { ProfilePrice } from './ProfilePrice';
import { UserNfts } from './UserNfts';

export const Inventory = ({ filter }: { filter: 'sell' | 'trade' }) => {
  const {
    selectedNfts: selectedNftsUser,
    clearAll,
    toggleSelect,
    removeItem,
  } = useSelectedNfts();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  const { selectedNfts: selectedNftsMarket } = useMarketSelectedNfts();

  const {
    data: userNftsResponse,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isRefetching,
    status,
    refetch,
  } = useInfiniteQuery({
    ...userNftsApi.getListInfiniteQueryOptions(),
  });

  const cursorRef = useIntersection(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

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
          status={status}
        />
        <UserNfts
          status={status}
          error={error}
          selectedNfts={selectedNftsUser}
          toggleSelect={toggleSelect}
          removeItem={removeItem}
          nftsData={userNftsResponse?.response ?? []}
          cursorRef={cursorRef}
          isFetchingNextPage={isFetchingNextPage}
        />
        <Counter
          isOpen={isOpen}
          toggle={toggle}
          selectedNfts={selectedNftsUser}
          clearAll={clearAll}
        />
        <Propose
          isOpen={isOpen}
          removeItem={removeItem}
          toggleSelect={toggleSelect}
          selectedNfts={selectedNftsUser ?? []}
        />
        {filter === 'sell' && (
          <div className="flex pb-4">
            <SellButton
              clearAll={clearAll}
              selectedNfts={selectedNftsUser}
            ></SellButton>
          </div>
        )}
        {filter === 'trade' && (
          <div className="flex pb-4">
            <TradeButton
              selectedNftsMarket={selectedNftsMarket}
              selectedNftsUser={selectedNftsUser}
            ></TradeButton>
          </div>
        )}
      </div>
    </div>
  );
};
