import { Arrow2Icon } from '@/shared';
import { shortenAddress } from '@/shared/lib/web3/shortenAddress';

import { Trade } from '@/entities/trade';
import { TradeAccept } from '@/features/trade-accept';
import { TradeReject } from '@/features/trade-reject';
import { useTradeModalStore } from '@/shared/store/useTradeModalStore';
import { TradeOfferItem } from './TradeOfferItem';

export const TradeItem = ({ trade }: { trade: Trade }) => {
  const { open } = useTradeModalStore();
  return (
    <div className="mb-6 pt-6">
      <div className="mb-2 text-lg">
        {`${shortenAddress(trade.fromAddress)} offers you a trade:`}
      </div>
      <button
        onClick={() =>
          open(
            trade,
            <>
              <TradeReject tradeId={trade.tradeId}></TradeReject>
              <TradeAccept tradeId={trade.tradeId}></TradeAccept>
            </>,
          )
        }
        className="flex w-full cursor-pointer flex-col rounded-xs bg-[#ffffff0a] p-[9px]"
      >
        <TradeOfferItem
          title={`${shortenAddress(trade.fromAddress)} offers:`}
          metadata={trade.fromMetadata}
        ></TradeOfferItem>
        <div className="relative flex flex-1 justify-center">
          <div className="z-[2] mx-[12.5px] inline-flex size-[30px] items-center justify-center rounded-full bg-[#2a2c2e] text-[#fff]">
            <Arrow2Icon width={14} height={24} />
          </div>
          <div className="absolute top-1/2 z-[1] h-[1px] w-full bg-[#3e4044]"></div>
        </div>
        <TradeOfferItem
          title="In exchange for:"
          metadata={trade.toMetadata}
        ></TradeOfferItem>
      </button>
    </div>
  );
};
