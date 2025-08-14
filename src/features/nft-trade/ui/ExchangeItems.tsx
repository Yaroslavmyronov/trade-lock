import { MarketNFTList } from './MarketNFTList';
import { UserNFTList } from './UserNFTList';

export const ExchangeItems = () => {
  return (
    <div className="grow overflow-auto">
      <div className="grid grid-cols-[1fr_1fr] gap-x-2">
        <UserNFTList />
        <MarketNFTList />
      </div>
    </div>
  );
};
