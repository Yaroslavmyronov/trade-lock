'use client';
import { Propose } from '@/features';

import { MarketNftResponse } from '@/entities/nfts/types';
import { FilterPanel } from '@/features/filter-panel';
import { BuyButton } from '@/features/nft-buy';
import { TradeButton } from '@/features/nft-trade';
import { MarketCounter } from '@/shared';
import { usePaginatedFetch } from '@/shared/lib/usePaginatedFetch';
import { useFilters } from '@/shared/store/useFilters';
import { useMarketSelectedNfts } from '@/shared/store/useMarketSelectedNfts';
import { usePropose } from '@/shared/store/usePropose';
import { useSelectedNfts } from '@/shared/store/useSelectedNfts';
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
  const { items: marketNfts } = usePaginatedFetch(
    '/api/market-nfts',
    1,
    20,
    undefined,
    initialNfts,
  );

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
