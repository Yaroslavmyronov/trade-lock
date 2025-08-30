import { tradeApi } from '@/entities/trade/api/incomingTradeApi';
import { Preloader } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { TradeItem } from './TradeItem';

export const Incoming = () => {
  const { data, isLoading, error, isPlaceholderData } = useQuery(
    tradeApi.getListQueryOptions('incoming'),
  );

  console.log('Incoming', data);
  // const { items, loading, error, lastElementRef, isFirstLoad, hasMore, data } =
  //   usePaginatedFetch<Trade>('/market/trades?direction=incoming', 1, 20);

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center text-[#836EF9]">
        <Preloader width={80} height={80} border={5}></Preloader>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex size-full items-center justify-center">
        <span>No trades found</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[600px] p-3">
      {data.map((trade) => (
        <TradeItem
          activeTab="Incoming"
          trade={trade}
          key={trade.tradeId}
        ></TradeItem>
      ))}
    </div>
  );
};
