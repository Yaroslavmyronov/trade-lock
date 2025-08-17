import { ExchangeItems } from './ExchangeItems';
import { ExchangePrice } from './ExchangePrice';

export const TradeModalBody = () => (
  <div className="flex grow flex-col overflow-auto px-6">
    <div className="-mx-6 flex h-full grow flex-col bg-[linear-gradient(to_right,_#2a2c2e_0%,_#2a2c2e_50%,_#1d1f20_50%,_#1d1f20_100%)] px-[15px]">
      <ExchangePrice />
      <ExchangeItems />
    </div>
  </div>
);
