import { tradeApi } from '@/entities/trade/api/incomingTradeApi';
import { Preloader } from '@/shared';
import { useQuery } from '@tanstack/react-query';
import { TradeItem } from './TradeItem';

export const Sent = () => {
  const { data, isLoading, error, isPlaceholderData } = useQuery(
    tradeApi.getListQueryOptions('outgoing'),
  );

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
          activeTab="Sent"
          trade={trade}
          key={trade.tradeId}
        ></TradeItem>
      ))}
    </div>
  );
};
