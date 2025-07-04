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
    if (opened === 'market') {
      close('market');
    } else {
      open('market');
    }
  };

  return (
    <div>
      <div ref={portalContainerRef} className="relative">
        <div className="my-4 flex overflow-hidden">
          <Filter active={opened === 'market'} onClick={handleClick} />
          <Search />
          {opened === 'market' && (
            <div>
              <Filters opened={opened} onClose={() => close('market')} />
            </div>
          )}
          <Refresh />
          <Sort portalContainer={portalContainerRef} />
        </div>
      </div>
    </div>
  );
};
