import { Nft } from '@/entities/nfts/types';
import { getNftId } from '../model/NFT';
import { nftPriceChange, nftPrices } from '../types';
import { SellNFT } from './SellNFT';

interface ListingFormProps {
  nfts: Nft[];
  prices: nftPrices;
  handlePriceChange: nftPriceChange;
}

export const ListingForm = ({
  nfts,
  prices,
  handlePriceChange,
}: ListingFormProps) => {
  return (
    <div className="py-4">
      <ul className="flex flex-col gap-y-3.5 pt-3.5 md:gap-y-4 md:pt-6">
        {nfts.map((nft) => {
          const id = getNftId(nft);
          return (
            <SellNFT
              key={id}
              nft={nft}
              prices={prices}
              handlePriceChange={handlePriceChange}
            />
          );
        })}
      </ul>
    </div>
  );
};
