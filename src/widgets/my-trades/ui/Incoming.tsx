import { tradeApi } from '@/entities/trade/api/incomingTradeApi';
import { Preloader } from '@/shared';
import { useIntersection } from '@/shared/lib/useIntersection';
import { useInfiniteQuery } from '@tanstack/react-query';
import { TradeItem } from './TradeItem';

export const Incoming = () => {
  const {
    data: IncomingData,
    error,
    status,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(tradeApi.getListInfiniteQueryOptions('incoming'));

  const cursorRef = useIntersection(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  if (status === 'pending') {
    return (
      <div className="flex size-full items-center justify-center text-[#836EF9]">
        <Preloader width={80} height={80} border={5}></Preloader>
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="flex size-full items-center justify-center">
        <p>Error: {error.message}</p>
      </div>
    );
  }

  if (IncomingData.length === 0) {
    return (
      <div className="flex size-full items-center justify-center">
        <span>No trades found</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[600px] p-3">
      {IncomingData.map((trade) => (
        <TradeItem
          activeTab="Incoming"
          trade={trade}
          key={trade.tradeId}
        ></TradeItem>
      ))}
      {isFetchingNextPage && (
        <div className="flex justify-center py-4 text-[#836EF9]">
          <Preloader width={40} height={40} border={4} />
        </div>
      )}
      <div ref={cursorRef}></div>
    </div>
  );
};
