'use client';

import { Arrow2Icon, ArrowIcon, AvatarComponent } from '@/shared';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { Connector, useDisconnect } from 'wagmi';

import { useTradesModalStore } from '@/shared/store/useTradesModalStore';
import { LogOutIcon } from './icons/LogOutIcon';

interface UserMenuProps {
  address: `0x${string}` | undefined;
  ensAvatar?: string;
  connector?: Connector;
  shortAddress: string;
}

export const UserMenu = ({
  address,
  ensAvatar,
  connector,
  shortAddress,
}: UserMenuProps) => {
  const { disconnect } = useDisconnect();
  const { open: openTradesModal } = useTradesModalStore();
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
    <div className="relative h-full" ref={menuRef}>
      <button className="h-full" onClick={() => setIsOpen(!isOpen)}>
        <div className="inline-flex h-10 cursor-pointer items-center justify-center gap-1 bg-[rgb(42,44,46)] px-4 text-sm font-medium whitespace-nowrap no-underline disabled:pointer-events-none">
          <div className="flex items-center gap-2 text-sm">
            <div className="relative inline-block shrink-0">
              <div className="">
                <AvatarComponent
                  address={address}
                  ensImage={ensAvatar ?? undefined}
                  size={24}
                ></AvatarComponent>
              </div>
              <div className="bg-bg-additional-3 absolute right-[-3px] bottom-[-3px] flex size-3 flex-col items-center justify-center overflow-hidden rounded-[3px] p-0">
                {connector?.icon ? (
                  <Image
                    width={12}
                    height={12}
                    alt={connector.name ?? 'Wallet'}
                    src={connector.icon.trim()}
                  />
                ) : (
                  <div className="size-3 animate-pulse rounded-full bg-gray-400" />
                )}
              </div>
            </div>
            <span className="text-sm leading-normal font-normal">
              {shortAddress}
            </span>
          </div>
          <div
            className={`ease-out-quint fill-current transition duration-150 ${isOpen ? 'rotate-180' : ''}`}
          >
            <ArrowIcon />
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-50 flex max-h-full max-w-screen min-w-[110px]">
          <div className="mt-4 h-full max-h-[800px] w-48 max-w-[300px] min-w-[200px] rounded-xs bg-[rgb(42,44,46)] shadow-lg ring-1 ring-black/5">
            <div className="py-2">
              <div>
                <button
                  onClick={() => openTradesModal('Incoming')}
                  className="flex h-[36px] w-full cursor-pointer items-center px-4 text-[13px] hover:bg-[rgba(0,0,0,.1)]"
                >
                  <span className="flex items-center">
                    <div className="mr-4 text-[#836EF9]">
                      <Arrow2Icon />
                    </div>
                    My trades
                  </span>
                </button>
                <button
                  onClick={() => {
                    try {
                      disconnect();
                      // cookieStorage.removeItem('wagmi.store');
                    } catch (error) {
                      console.log('disconnect error', error);
                    }
                  }}
                  className="flex h-[36px] w-full cursor-pointer items-center px-4 text-[13px] hover:bg-[rgba(0,0,0,.1)]"
                >
                  <span className="flex items-center">
                    <div className="mr-4 text-[#836EF9]">
                      <LogOutIcon />
                    </div>
                    Log out
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
