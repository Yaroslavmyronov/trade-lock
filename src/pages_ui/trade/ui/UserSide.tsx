import { Propose } from '@/features';
import { FilterPanel } from '@/features/user';
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

const cardsData: CardData[] = [
  { id: 1, title: '#1' },
  { id: 2, title: '#2' },
  { id: 3, title: '#3' },
  { id: 4, title: '#4' },
  { id: 5, title: '#5' },
  { id: 6, title: '#6' },
  { id: 7, title: '#7' },
  { id: 8, title: '#8' },
  { id: 9, title: '#9' },
  { id: 10, title: '#10' },
  { id: 11, title: '#11' },
  { id: 12, title: '#12' },
  { id: 13, title: '#13' },
  { id: 14, title: '#14' },
  { id: 15, title: '#15' },
  { id: 16, title: '#16' },
];

export const UserSide = () => {
  const { selectedIds, clearAll, toggleSelect, removeItem } =
    useSelectedCards();
  const { opened, open, close } = useFilters();
  const { toggle, isOpen } = usePropose();
  return (
    <div className="flex h-full w-full max-w-[437px] min-w-[437px] flex-col bg-[#17191a]">
      <div className="relative flex min-h-full max-w-full grow flex-col px-5">
        <FilterPanel close={close} opened={opened} open={open} />
        <ProfilePrice />
        <UserNfts
          selectedIds={selectedIds}
          toggleSelect={toggleSelect}
          removeItem={removeItem}
          cardsData={cardsData}
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
          cardsData={cardsData}
        />
      </div>
    </div>
  );
};
