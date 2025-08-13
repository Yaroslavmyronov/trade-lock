import { MarketItemPrice } from './MarketItemPrice';
import { UserItemPrice } from './UserItemPrice';

export const ExchangePrice = () => {
  return (
    <div className="flex min-h-[50px] items-center">
      <UserItemPrice />
      <MarketItemPrice />
    </div>
  );
};
