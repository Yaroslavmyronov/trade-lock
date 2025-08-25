import { Trade } from '@/entities/trade';
import { Preloader } from '@/shared';
import { usePaginatedFetch } from '@/shared/lib/usePaginatedFetch';
import { TradeItem } from './TradeItem';

export const Incoming = () => {
  const { items, loading, error, lastElementRef, isFirstLoad, hasMore, data } =
    usePaginatedFetch<Trade>('/market/trades?direction=incoming', 1, 20);
  console.log('/market/trades', data);
  console.log('/market/trades items', items);

  if (isFirstLoad && loading) {
    return (
      <div className="flex size-full items-center justify-center">
        <Preloader></Preloader>
      </div>
    );
  }

  if (!items) {
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
