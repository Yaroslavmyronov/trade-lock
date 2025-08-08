'use client';
import { Propose } from '@/features';

import { Nft } from '@/entities/nfts/types';
import { FilterPanel } from '@/features/filter-panel';
import { TradeButton } from '@/features/nft-trade';
import { MarketCounter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';
import { useMarketSelectedCards } from '@/shared/store/useMarketSelectedCards';
import { usePropose } from '@/shared/store/usePropose';
import { MarketNfts } from './MarketNfts';

export const Market = () => {
  const cardsData: Nft[] = [
    {
      contract: `0x45cB182daAB81951062E5826d2692c5738039073`,
      description: 'Zalupa',
      imageOriginal: '',
      kind: '',
      lastPrice: 1,
      name: 'Zalupa',
      tokenId: '1',
    },
    {
      contract: `0x45cB182daAB81951062E5826d2692c5738039073`,
      description: 'Zalupa',
      imageOriginal: '',
      kind: '',
      lastPrice: 2,
      name: 'Zalupa',
      tokenId: '2',
    },
    {
      contract: `0x45cB182daAB81951062E5826d2692c5738039073`,
      description: 'Zalupa',
      imageOriginal: '',
      kind: '',
      lastPrice: 3,
      name: 'Zalupa',
      tokenId: '3',
    },
    {
      contract: `0x45cB182daAB81951062E5826d2692c5738039073`,
      description: 'Zalupa',
      imageOriginal: '',
      kind: '',
      lastPrice: 4,
      name: 'Zalupa',
      tokenId: '4',
    },
    {
      contract: `0x45cB182daAB81951062E5826d2692c5738039073`,
      description: 'Zalupa',
      imageOriginal: '',
      kind: '',
      lastPrice: 5,
      name: 'Zalupa',
      tokenId: '5',
    },
  ];

  const {
    selectedNfts: selectedNftsMarket,
    clearAll,
    toggleSelect,
    removeItem,
  } = useMarketSelectedCards();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  return (
    <div
      className={`flex size-full flex-row ${opened === 'market' && 'pr-[385px]'}`}
    >
      <div className="relative flex max-w-full grow flex-col px-5">
        <FilterPanel panel="market" close={close} opened={opened} open={open} />
        <MarketNfts
          selectedNfts={selectedNftsMarket}
          toggleSelect={toggleSelect}
          nftsData={cardsData}
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
            selectedNftsUser={selectedNftsMarket}
          ></TradeButton>
        </div>
      </div>
    </div>
  );
};
