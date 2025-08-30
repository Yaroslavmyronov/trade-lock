'use client';
import { useEffect, useRef, useState } from 'react';

import { CloseIcon } from '@/shared/icons';
import { SearchIcon } from './icons/SearchIcon';

interface SearchProps {
  setSearchText: (text: string) => void;
}

export const Search = ({ setSearchText }: SearchProps) => {
  const [isActive, setIsActive] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsActive(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={`relative mr-1 inline-flex h-[48px] w-[48px] cursor-pointer items-center justify-center overflow-hidden rounded-[2px] border border-[#2a2c2e] bg-[#2a2c2e] transition-all duration-300 ease-in-out ${isActive ? 'min-w-[255px] border-[#836EF9] text-[#836EF9]' : 'min-w-[166px] text-[#fff]'}`}
    >
      <button
        onClick={() => {
          if (!isActive) {
            setIsActive(true);
          } else {
            inputRef.current?.focus();
          }
        }}
        className="absolute top-0 left-[-1px] z-[2] flex h-[48px] w-[48px] cursor-pointer items-center justify-center text-[#fff]"
      >
        <SearchIcon />
      </button>
      <label
        className="inline-flex w-0 items-center overflow-hidden"
        htmlFor=""
      >
        <input
          ref={inputRef}
          onFocus={() => setIsActive(true)}
          className="absolute left-0 h-full max-w-full appearance-none border-none pr-[10px] pl-[48px] text-[#fff] outline-0 transition-all duration-300 ease-in-out"
          placeholder="Search profile"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button
          onClick={() => {
            setIsActive(false);
            if (inputRef.current) {
              inputRef.current.value = '';
            }
          }}
          className={`absolute top-1/2 right-0 flex h-full w-[48px] cursor-pointer items-center justify-center text-current opacity-0 transition-all duration-300 ease-in-out ${isActive ? 'translate-y-[-50%] scale-100 opacity-100' : 'translate-y-[-50%] scale-0 opacity-0'}`}
        >
          <CloseIcon width={24} height={24} />
        </button>
      </label>
    </div>
  );
};
