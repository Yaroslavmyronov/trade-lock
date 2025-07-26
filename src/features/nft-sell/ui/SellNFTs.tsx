import { Nft } from '@/entities/nfts/types';
import { SellNFT } from './SellNFT';
import { SellNFTsSummary } from './SellNFTsSummary';
import { getNftId } from '../model/NFT';
import { nftPriceChange, nftPrices } from '../types';

interface SellNFTsProps {
  nfts: Nft[];
  prices: nftPrices;
  handlePriceChange: nftPriceChange;
}

export const SellNFTs = ({
  nfts,
  prices,
  handlePriceChange,
}: SellNFTsProps) => {
  return (
    <>
      <SellNFTsSummary nfts={nfts} prices={prices} />
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
    </>
  );
};
