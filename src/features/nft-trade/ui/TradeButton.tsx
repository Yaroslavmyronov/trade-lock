'use client';
import { MarketNftResponse, UserNftResponse } from '@/entities/nfts/types';
import { TradeCreate } from '@/features/trade-create';
import { Arrow2Icon } from '@/shared';
import { useTradeModalStore } from '@/shared/store/useTradeModalStore';
import { useAccount } from 'wagmi';
import { createTrade } from '../model/createTrade';

interface TradeButtonProps {
  selectedNftsUser: UserNftResponse;
  selectedNftsMarket: MarketNftResponse;
}

export const TradeButton = ({
  selectedNftsUser,
  selectedNftsMarket,
}: TradeButtonProps) => {
  const noSelectedNfts =
    selectedNftsUser.length === 0 || selectedNftsMarket.length === 0;
  const { open } = useTradeModalStore();
  const { address } = useAccount();
  const trade = createTrade(selectedNftsUser, selectedNftsMarket, address!);

  return (
    <div className="mx-1.5">
      <button
        className="flex min-h-[48px] min-w-[160px] cursor-pointer items-center justify-start rounded-[2px] bg-[#836EF9] px-3 disabled:cursor-not-allowed disabled:opacity-40"
        disabled={noSelectedNfts}
        onClick={() => {
          if (trade)
            open(
              trade,
              <TradeCreate
                selectedNftsUser={selectedNftsUser}
                selectedNftsMarket={selectedNftsMarket}
              ></TradeCreate>,
            );
        }}
      >
        <Arrow2Icon width={24} height={24} />
        <span className="ml-2.5 flex flex-col text-left">
          <span className="leading-3.5">Trade</span>

          <span className="text-[12px] leading-3 opacity-80">
            {selectedNftsUser.length > 0 || selectedNftsMarket.length > 0
              ? `${selectedNftsUser.length} x ${selectedNftsMarket.length} item`
              : ''}
          </span>
        </span>
      </button>
    </div>
  );
};
