'use client';
import { Filter, Filters, Refresh, Search, Sort } from '@/shared';
import { useRef } from 'react';

interface FilterPanelProps {
  opened: 'market' | 'user' | null;
  open: (panel: 'market' | 'user') => void;
  close: (panel: 'market' | 'user') => void;
}

export const FilterPanel = ({ opened, open, close }: FilterPanelProps) => {
  const portalContainerRef = useRef<HTMLDivElement | null>(null);

  const handleClick = () => {
    if (opened === 'user') {
      close('user');
    } else {
      open('user');
    }
  };

  return (
    <div>
      <div ref={portalContainerRef} className="relative">
        <div className="my-4 flex overflow-hidden">
          <Filter active={opened === 'user'} onClick={handleClick} />
          <Search />
          {opened === 'user' && (
            <Filters opened={opened} onClose={() => close('user')} />
          )}
          <Refresh />
          <Sort portalContainer={portalContainerRef} />
        </div>
      </div>
    </div>
  );
};
