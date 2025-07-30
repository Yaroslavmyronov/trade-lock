'use client';
import { Nft } from '@/entities/nfts/types';
import { MarketIcon } from '@/shared';
import { useState } from 'react';
import { SellModal } from './SellModal';

interface SellButtonProps {
  selectedNfts: Nft[];
}

export const SellButton = ({ selectedNfts }: SellButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const sellPrice = selectedNfts.reduce((sum, nft) => sum + nft.lastPrice, 0);

  const noSelectedNfts = selectedNfts.length === 0;

  return (
    <>
      <div className="mx-1.5">
        <button
          className="flex min-h-[48px] min-w-[160px] cursor-pointer items-center justify-center rounded-[2px] bg-[#836EF9] px-3 disabled:cursor-not-allowed disabled:opacity-40"
          disabled={noSelectedNfts}
          onClick={() => setIsOpen(true)}
        >
          <MarketIcon />
          <span className="ml-2.5 flex flex-col text-left">
            <span className="leading-3.5">Sell now</span>
            <span className="text-[12px] leading-3 opacity-80">
              {sellPrice.toFixed(4)} MON
            </span>
          </span>
        </button>
      </div>
      {isOpen && (
        <SellModal
          selectedNfts={selectedNfts}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      )}
    </>
  );
};
