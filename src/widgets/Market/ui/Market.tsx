import { Propose } from '@/features';

import { FilterPanel } from '@/features/market';
import { MarketCounter } from '@/shared';
import { useFilters } from '@/shared/store/useFilters';
import { useMarketSelectedCards } from '@/shared/store/useMarketSelectedCards';
import { usePropose } from '@/shared/store/usePropose';
import { MarketNfts } from './MarketNfts';

export type CardData = {
  id: number;
  title: string;
};

export const Market = () => {
  const cardsData: CardData[] = [
    { id: 17, title: '#17' },
    { id: 18, title: '#18' },
    { id: 19, title: '#19' },
    { id: 20, title: '#20' },
    { id: 21, title: '#21' },
    { id: 22, title: '#22' },
    { id: 23, title: '#23' },
    { id: 24, title: '#24' },
    { id: 25, title: '#25' },
    { id: 26, title: '#26' },
    { id: 27, title: '#27' },
    { id: 28, title: '#28' },
    { id: 29, title: '#29' },
    { id: 30, title: '#30' },
    { id: 31, title: '#31' },
    { id: 32, title: '#32' },
    { id: 33, title: '#33' },
    { id: 34, title: '#34' },
    { id: 35, title: '#35' },
    { id: 36, title: '#36' },
    { id: 37, title: '#37' },
    { id: 38, title: '#38' },
    { id: 39, title: '#39' },
    { id: 40, title: '#40' },
    { id: 41, title: '#41' },
    { id: 42, title: '#42' },
    { id: 43, title: '#43' },
    { id: 44, title: '#44' },
    { id: 45, title: '#45' },
    { id: 46, title: '#46' },
    { id: 47, title: '#47' },
    { id: 48, title: '#48' },
  ];

  const { selectedIds, clearAll, toggleSelect, removeItem } =
    useMarketSelectedCards();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();

  return (
    <div
      className={`flex size-full flex-row ${opened === 'market' && 'pr-[385px]'}`}
    >
      <div className="relative flex max-w-full grow flex-col px-5">
        <FilterPanel close={close} opened={opened} open={open} />
        <MarketNfts
          selectedIds={selectedIds}
          toggleSelect={toggleSelect}
          cardsData={cardsData}
          removeItem={removeItem}
        />
        <MarketCounter
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
          cardsData={cardsData}
        />
      </div>
    </div>
  );
};
