'use client';
import { Propose } from '@/features';

import { MarketNftResponse } from '@/entities/nfts/types';
import { FilterPanel } from '@/features/filter-panel';
import { BuyButton } from '@/features/nft-buy';
import { TradeButton } from '@/features/nft-trade';
import { MarketCounter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';

import { marketNftsApi } from '@/entities/nfts/api/marketNftsApi';
import { useIntersection } from '@/shared/lib/useIntersection';
import { useMarketSelectedNfts } from '@/shared/store/useMarketSelectedNfts';
import { usePropose } from '@/shared/store/usePropose';
import { useSelectedNfts } from '@/shared/store/useSelectedNfts';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MarketNfts } from './MarketNfts';

export const Market = ({ initialNfts }: { initialNfts: MarketNftResponse }) => {
  const {
    selectedNfts: selectedNftsMarket,
    clearAll,
    toggleSelect,
    removeItem,
  } = useMarketSelectedNfts();
  const { selectedNfts: selectedNftsUser } = useSelectedNfts();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  const {
    data: marketNfts,
    // error,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    ...marketNftsApi.getListInfiniteQueryOptions(),
    initialData: {
      pages: [initialNfts],
      pageParams: [1],
    },
  });

  const cursorRef = useIntersection(() => {
    fetchNextPage();
  });

  return (
    <div
      className={`flex size-full flex-row ${opened === 'market' && 'pr-[385px]'}`}
    >
      <div className="relative flex max-w-full grow flex-col px-5">
        <FilterPanel panel="market" close={close} opened={opened} open={open} />
        <MarketNfts
          selectedNfts={selectedNftsMarket}
          toggleSelect={toggleSelect}
          nftsData={marketNfts}
          removeItem={removeItem}
          cursorRef={cursorRef}
          isFetchingNextPage={isFetchingNextPage}
          isLoading={isLoading}
          hasNextPage={hasNextPage}
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
          <TradeButton
            selectedNftsMarket={selectedNftsMarket}
            selectedNftsUser={selectedNftsUser}
          ></TradeButton>
          <BuyButton selectedNftsMarket={selectedNftsMarket}></BuyButton>
        </div>
      </div>
    </div>
  );
};
