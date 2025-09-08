'use client';
import { Propose } from '@/features';

import { FilterPanel } from '@/features/filter-panel';
import { SellButton } from '@/features/nft-sell';
import { Counter, FloatInput } from '@/shared';
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
import { useState } from 'react';
import { useDebounce } from '@/shared/lib/useDebounce';
import {
  defaultSortOption,
  SortOption,
} from '@/shared/ui/FilterPanel/SortOptions';
import FilterItem from '@/features/filter-panel/ui/FilterItem';

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

  const [sortingOption, setSortingOption] =
    useState<SortOption>(defaultSortOption);
  const [minPriceFilter, setMinPriceFilter] = useState<number | ''>('');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | ''>('');
  const [searchText, setSearchText] = useState<string>('');
  const debouncedSearchText = useDebounce(searchText, 500);

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
    ...userNftsApi.getListInfiniteQueryOptions({
      sort: sortingOption.sort,
      order: sortingOption.order,
      searchText: debouncedSearchText,
      minPrice: minPriceFilter,
      maxPrice: maxPriceFilter,
    }),
  });

  const cursorRef = useIntersection(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  const updateMinPriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (Number(value) < 0) {
      return;
    }

    if (maxPriceFilter && maxPriceFilter < Number(value)) {
      return;
    }

    setMinPriceFilter(value ? Number(value) : '');
  };

  const updateMaxPriceFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (Number(value) < 0) {
      return;
    }

    if (minPriceFilter && value !== '' && minPriceFilter > Number(value)) {
      return;
    }

    setMaxPriceFilter(value ? Number(value) : '');
  };

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
          setSearchText={setSearchText}
          selectedSort={sortingOption}
          setSelectedSort={setSortingOption}
        >
          <FilterItem title="Price">
            <div className="pt-3">
              <form className="flex w-[220px] min-w-full items-center justify-between">
                <div className="mr-1 w-1/2 cursor-pointer">
                  <FloatInput
                    id="price-from"
                    value={minPriceFilter}
                    onChange={updateMinPriceFilter}
                    label="From"
                  ></FloatInput>
                </div>
                <div className="w-1/2 cursor-pointer">
                  <FloatInput
                    id="price-to"
                    value={maxPriceFilter}
                    onChange={updateMaxPriceFilter}
                    label="To"
                  ></FloatInput>
                </div>
              </form>
            </div>
          </FilterItem>
        </FilterPanel>
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
