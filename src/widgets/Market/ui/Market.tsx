'use client';
import { Propose } from '@/features';

import { MarketNftResponse } from '@/entities/nfts/types';
import { FilterPanel } from '@/features/filter-panel';
import { BuyButton } from '@/features/nft-buy';
import { FloatInput, MarketCounter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';

import { marketNftsApi } from '@/entities/nfts/api/marketNftsApi';
import FilterItem from '@/features/filter-panel/ui/FilterItem';
import { useDebounce } from '@/shared/lib/useDebounce';
import { useIntersection } from '@/shared/lib/useIntersection';
import { useMarketSelectedNfts } from '@/shared/store/useMarketSelectedNfts';
import { usePropose } from '@/shared/store/usePropose';
import {
  defaultSortOption,
  SortOption,
} from '@/shared/ui/FilterPanel/SortOptions';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { MarketNfts } from './MarketNfts';

export const Market = ({
  initialNfts,
  excludeSelf = false,
}: {
  initialNfts: MarketNftResponse;
  excludeSelf?: boolean;
}) => {
  const {
    selectedNfts: selectedNftsMarket,
    clearAll,
    toggleSelect,
    removeItem,
  } = useMarketSelectedNfts();

  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  // Filter options
  const [searchText, setSearchText] = useState<string>('');
  const [sortingOption, setSortingOption] =
    useState<SortOption>(defaultSortOption);
  const [minPriceFilter, setMinPriceFilter] = useState<number | ''>('');
  const [maxPriceFilter, setMaxPriceFilter] = useState<number | ''>('');

  const debouncedSearchText = useDebounce(searchText, 500);

  const {
    data: marketResponse,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useInfiniteQuery({
    ...marketNftsApi.getListInfiniteQueryOptions({
      sort: sortingOption.sort,
      order: sortingOption.order,
      searchText: debouncedSearchText,
      minPrice: minPriceFilter,
      maxPrice: maxPriceFilter,
      excludeSelf,
    }),
    placeholderData: {
      pages: [{ hasMore: false, items: initialNfts.items, nextCursor: null }],
      pageParams: [''],
    },
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

  // Sort, Order
  // Ask for new market nfts on filter change

  return (
    <div
      className={`flex size-full flex-row ${opened === 'market' && 'pr-[385px]'}`}
    >
      <div className="relative flex max-w-full grow flex-col px-5">
        <FilterPanel
          isRefresh={isRefetching}
          refresh={refetch}
          panel="market"
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
        <MarketNfts
          status={status}
          selectedNfts={selectedNftsMarket}
          toggleSelect={toggleSelect}
          nftsData={marketResponse?.items ?? []}
          removeItem={removeItem}
          cursorRef={cursorRef}
          isFetchingNextPage={isFetchingNextPage}
          error={error}
        />
        <MarketCounter
          isOpen={isOpen}
          toggle={toggle}
          selectedNfts={selectedNftsMarket}
          clearAll={clearAll}
        />
        <Propose
          isOpen={isOpen}
          removeItem={removeItem}
          toggleSelect={toggleSelect}
          selectedNfts={selectedNftsMarket}
        />

        <div className="flex pb-4">
          <BuyButton selectedNftsMarket={selectedNftsMarket}></BuyButton>
        </div>
      </div>
    </div>
  );
};
