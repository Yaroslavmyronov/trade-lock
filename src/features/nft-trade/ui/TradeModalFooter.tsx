import { Preloader } from '@/shared';
import { useNftApproval } from '@/shared/lib/web3/useNftApproval';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';
import { useMarketSelectedNfts } from '@/shared/store/useMarketSelectedNfts';
import { useSelectedNfts } from '@/shared/store/useSelectedNfts';

export const TradeModalFooter = () => {
  const { writeContractAsync, isMining } =
    useWrapperWriteContract('Marketplace');
  const { selectedNfts: selectedUserNfts } = useSelectedNfts();
  const { selectedNfts: selectedMarketNfts } = useMarketSelectedNfts();
  const { approveNfts, approveStatuses } = useNftApproval(
    '0x2fe3AA6c023608b6F3D94b6Ec91fae1382de61c8',
  );

  const recipientAddress = selectedMarketNfts[0]?.sellerAddress;
  const tokenIdsFrom = selectedUserNfts.map((nft) => BigInt(nft.tokenId));
  const nftContractsFrom = selectedUserNfts.map((nft) => nft.contractAddress);
  const listingIdsTo = selectedMarketNfts.map((nft) => BigInt(nft.listingId));

  console.log('recipientAddress', recipientAddress);

  const handleTrade = async () => {
    await approveNfts(selectedUserNfts);
    try {
      await writeContractAsync({
        functionName: 'createTrade',
        args: [recipientAddress, tokenIdsFrom, nftContractsFrom, listingIdsTo],
      });
    } catch (e) {
      console.error('Trade error:', e);
    }
  };
  const isApproving = Object.values(approveStatuses).some(
    (status) => status === 'loading',
  );
  return (
    <div className="bg-transparent px-6 py-4">
      <div className="mx-auto flex max-w-[500px] items-center justify-center">
        <div className="mx-2 w-full max-w-[260px] text-[14px] font-medium">
          <button
            disabled={isApproving || isMining}
            onClick={handleTrade}
            className="min-h-[48px] w-full min-w-[200px] cursor-pointer justify-center rounded-xs bg-[#836EF9]"
          >
            {isApproving || isMining ? (
              <Preloader />
            ) : (
              'Proceed to item Deposit'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
