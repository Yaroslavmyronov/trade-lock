'use client';
import { Filter, Filters, Refresh, Search, Sort } from '@/shared';
import {
  defaultSortOption,
  SortOption,
} from '@/shared/ui/FilterPanel/SortOptions';
import { useRef } from 'react';

interface FilterPanelProps {
  panel: 'market' | 'user';
  opened: 'market' | 'user' | null;
  open: (panel: 'market' | 'user') => void;
  close: (panel: 'market' | 'user') => void;
  refresh: () => void;
  isRefresh: boolean;

  // Sort
  selectedSort: SortOption;
  setSelectedSort: (option: SortOption) => void;
}

export const FilterPanel = ({
  panel,
  opened,
  open,
  close,
  isRefresh,
  refresh,
  selectedSort,
  setSelectedSort,
}: FilterPanelProps) => {
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (opened === panel) {
      close(panel);
    } else {
      open(panel);
    }
  };

  return (
    <div>
      <div ref={portalContainerRef} className="relative">
        <div className="my-4 flex">
          <Filter active={opened === panel} onClick={handleClick} />
          <Search />
          {opened === panel && (
            <Filters opened={opened} onClose={() => close(panel)} />
          )}
          <Refresh isRefresh={isRefresh} refresh={refresh} />
          <Sort
            selectedSort={selectedSort ?? defaultSortOption}
            setSelectedSort={setSelectedSort ?? (() => { })}
          />
        </div>
      </div>
    </div>
  );
};
