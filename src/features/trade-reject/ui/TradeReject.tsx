import { Preloader } from '@/shared';
import { useWrapperWriteContract } from '@/shared/lib/web3/useWrapperWriteContract';

export const TradeReject = ({ tradeId }: { tradeId: string }) => {
  const { writeContractAsync, isMining } =
    useWrapperWriteContract('Marketplace');

  const handleAccept = async () => {
    try {
      await writeContractAsync({
        functionName: 'rejectTrade',
        args: [BigInt(tradeId)],
      });
    } catch (e) {
      console.error('Trade error:', e);
    }
  };

  return (
    <button
      disabled={isMining}
      onClick={handleAccept}
      className="text-primary disabled:text-disabled inline-flex h-[40px] cursor-pointer items-center justify-center rounded bg-[#f60f0f] px-3 py-0 text-sm transition disabled:cursor-not-allowed disabled:opacity-40"
    >
      {isMining ? <Preloader /> : 'Reject'}
    </button>
  );
};
