'use client';
import { ArrowIcon } from '@/shared';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface SortProps {
  portalContainer: React.RefObject<HTMLDivElement | null>;
}

export const Sort = ({ portalContainer }: SortProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={menuRef} className="relative select-none">
      <div>
        {/* menu */}
        {isOpen &&
          portalContainer.current &&
          createPortal(
            <div className="absolute right-0 bottom-[-36px] z-20 flex max-h-full max-w-screen min-w-[110px]">
              <div className="mt-4 h-full max-h-[800px] w-48 max-w-[300px] min-w-[200px] rounded-xs bg-[rgb(42,44,46)] shadow-lg ring-1 ring-black/5">
                <div className="py-2">
                  <div>
                    <button className="flex h-[36px] w-full cursor-pointer items-center px-4 text-[13px] hover:bg-[rgba(0,0,0,.1)]">
                      <span className="flex items-center">
                        <div className="mr-4 text-[#836EF9]"></div>
                        Log out
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>,
            portalContainer.current,
          )}

        <div className="relative w-[123px]">
          <div
            onClick={() => {
              if (isOpen) {
                setIsOpen(false);
              } else {
                setIsOpen(true);
              }
            }}
            className="relative flex h-[48px] cursor-pointer items-center rounded-[2px] bg-[#35373a] pr-[25px] pl-2 text-[#fff] hover:inset-shadow-[0_70px_#0000001a]"
          >
            <div className="table-cell w-full text-ellipsis whitespace-nowrap">
              <div className="absolute top-[15px] right-[7px]">
                <ArrowIcon />
              </div>

              <div className="flex flex-col">
                <label className="pointer-events-none w-full text-xs text-ellipsis whitespace-nowrap text-[#848484]">
                  Sort by
                </label>
                <span>Relevance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
