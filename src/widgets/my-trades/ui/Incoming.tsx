import { Trade } from '@/entities/trade';
import { Preloader } from '@/shared';
import { usePaginatedFetch } from '@/shared/lib/usePaginatedFetch';
import { TradeItem } from './TradeItem';

export const Incoming = () => {
  const { items, loading, error, lastElementRef, isFirstLoad, hasMore, data } =
    usePaginatedFetch<Trade>('/market/trades?direction=incoming', 1, 20);

  if (isFirstLoad && loading) {
    return (
      <div className="flex size-full items-center justify-center text-[#836EF9]">
        <Preloader width={80} height={80} border={5}></Preloader>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex size-full items-center justify-center">
        <span>No trades found</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[600px] p-3">
      {items.map((trade) => (
        <TradeItem
          activeTab="Incoming"
          trade={trade}
          key={trade.tradeId}
        ></TradeItem>
      ))}
    </div>
  );
};
