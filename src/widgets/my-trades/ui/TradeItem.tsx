import { Arrow2Icon } from '@/shared';
import { shortenAddress } from '@/shared/lib/web3/shortenAddress';

import { Trade } from '@/entities/trade';
import { TradeAccept } from '@/features/trade-accept';
import { TradeReject } from '@/features/trade-reject';
import { useTradeModalStore } from '@/shared/store/useTradeModalStore';
import { TradeOfferItem } from './TradeOfferItem';

interface TradeItemState {
  trade: Trade;
  activeTab: 'Incoming' | 'Sent';
}

export const TradeItem = ({ trade, activeTab }: TradeItemState) => {
  const { open } = useTradeModalStore();

  return (
    <div className="mb-6 pt-6">
      <div className="mb-2 text-lg">
        {activeTab === 'Incoming'
          ? `${shortenAddress(trade.fromAddress)} offers you a trade:`
          : `You offered ${shortenAddress(trade.toAddress)} a trade:`}
      </div>
      <button
        onClick={() =>
          open(
            trade,
            activeTab === 'Incoming' ? (
              <div className="grid grid-cols-2 gap-x-2">
                <TradeReject tradeId={trade.tradeId} />
                <TradeAccept tradeId={trade.tradeId} />
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="mx-2 w-full max-w-[260px] text-[14px] font-medium">
                  <TradeReject tradeId={trade.tradeId} />
                </div>
              </div>
            ),
          )
        }
        className="flex w-full cursor-pointer flex-col rounded-xs bg-[#ffffff0a] p-[9px]"
      >
        <TradeOfferItem
          title={
            activeTab === 'Incoming'
              ? `${shortenAddress(trade.fromAddress)} offers:`
              : `You offered:`
          }
          metadata={trade.fromMetadata}
        ></TradeOfferItem>
        <div className="relative flex flex-1 justify-center">
          <div className="z-[2] mx-[12.5px] inline-flex size-[30px] items-center justify-center rounded-full bg-[#2a2c2e] text-[#fff]">
            <Arrow2Icon width={14} height={24} />
          </div>
          <div className="absolute top-1/2 z-[1] h-[1px] w-full bg-[#3e4044]"></div>
        </div>
        <TradeOfferItem
          title={
            activeTab === 'Incoming'
              ? 'In exchange for:'
              : `${shortenAddress(trade.toAddress)} in exchange for:`
          }
          metadata={trade.toMetadata}
        ></TradeOfferItem>
      </button>
    </div>
  );
};
