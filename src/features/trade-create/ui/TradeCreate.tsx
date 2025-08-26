import { MarketNftResponse, UserNftResponse } from '@/entities/nfts/types';
import { ModalButton, Preloader } from '@/shared';
import { useNftApproval } from '@/shared/lib/web3/useNftApproval';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';
import { useMarketSelectedNfts } from '@/shared/store/useMarketSelectedNfts';
import { useSelectedNfts } from '@/shared/store/useSelectedNfts';
import { useTradeModalStore } from '@/shared/store/useTradeModalStore';
import { useState } from 'react';
import { Address } from 'viem';

interface TradeCreateProps {
  selectedUserNfts: UserNftResponse;
  selectedMarketNfts: MarketNftResponse;
}

export const TradeCreate = ({
  selectedUserNfts,
  selectedMarketNfts,
}: TradeCreateProps) => {
  const { writeContractAsync, isMining } =
    useWrapperWriteContract('Marketplace');
  const { close } = useTradeModalStore();
  const { clearAll: clearMarket } = useMarketSelectedNfts();
  const { clearAll: clearUser } = useSelectedNfts();

  const { approveNfts, approveStatuses } = useNftApproval(
    process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as Address,
  );

  const [tradeCreated, setTradeCreated] = useState(false);

  const recipientAddress = selectedMarketNfts[0]?.sellerAddress;
  const tokenIdsFrom = selectedUserNfts.map((nft) => BigInt(nft.tokenId));
  const nftContractsFrom = selectedUserNfts.map((nft) => nft.contractAddress);
  const listingIdsTo = selectedMarketNfts.map((nft) => BigInt(nft.listingId));

  const handleTrade = async () => {
    await approveNfts(selectedUserNfts);
    try {
      await writeContractAsync({
        functionName: 'createTrade',
        args: [recipientAddress, tokenIdsFrom, nftContractsFrom, listingIdsTo],
      });
      clearMarket();
      clearUser();
      setTradeCreated(true);
    } catch (e) {
      console.error('Trade error:', e);
    }
  };

  const isApproving = Object.values(approveStatuses).some(
    (status) => status === 'loading',
  );

  return (
    <div className="mx-auto flex max-w-[500px] items-center justify-center">
      <div className="mx-2 w-full max-w-[260px] text-[14px] font-medium">
        {!tradeCreated ? (
          <ModalButton disabled={isApproving || isMining} onClick={handleTrade}>
            {isApproving || isMining ? <Preloader /> : 'Create Trade'}
          </ModalButton>
        ) : (
          <ModalButton onClick={close}>Done</ModalButton>
        )}
      </div>
    </div>
  );
};
