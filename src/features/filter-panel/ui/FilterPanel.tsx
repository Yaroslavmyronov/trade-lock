'use client';
import { Filter, Filters, Refresh, Search, Sort } from '@/shared';
import { useRef } from 'react';

interface FilterPanelProps {
  panel: 'market' | 'user';
  opened: 'market' | 'user' | null;
  open: (panel: 'market' | 'user') => void;
  close: (panel: 'market' | 'user') => void;
}

export const FilterPanel = ({
  panel,
  opened,
  open,
  close,
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
          <Refresh />
          <Sort />
        </div>
      </div>
    </div>
  );
};
