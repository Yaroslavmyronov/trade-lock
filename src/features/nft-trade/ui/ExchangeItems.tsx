import { MarketNFTList } from './MarketNFTList';
import { UserNFTList } from './UserNftList';

export const ExchangeItems = () => {
  return (
    <div className="grow overflow-auto">
      <div className="grid grid-cols-[1fr_1fr] gap-x-2">
        <UserNFTList></UserNFTList>
        <MarketNFTList></MarketNFTList>
      </div>
    </div>
  );
};
