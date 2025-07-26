import { Nft } from '@/entities/nfts/types';
import { getNftId } from '../model/NFT';
import { nftPrices } from '../types';

interface SellNFTsSummary {
  nfts: Nft[];
  prices: nftPrices;
}

export const SellNFTsSummary = ({ nfts, prices }: SellNFTsSummary) => {
  const totalPrice = nfts.reduce(
    (sum, nft) => sum + Number(prices[getNftId(nft)]) || 0,
    0,
  );

  return (
    <div className="sticky top-0 flex flex-col gap-3 pt-3 bg-[#35373a]">
      <div className="flex items-center justify-between">
        <div>Summary</div>
        <div className="flex items-center gap-3">
          <div>Total NFTs: {nfts.length}</div>
          <div>Total Price: {totalPrice} MON</div>
        </div>
      </div>
      <div className="h-[1px] w-full bg-white"></div>
    </div>
  );
};
