import { Nft } from '@/entities/nfts/types';
import { FailIcon, Preloader, SuccessIcon } from '@/shared';
import { getNftId } from '../model/NFT';

interface NftListStatusProps {
  nfts: Nft[];
  statuses: Record<string, 'idle' | 'loading' | 'success' | 'error'>;
}

export const NftListStatus = ({ nfts, statuses }: NftListStatusProps) => {
  return (
    <div className="py-4">
      <div className="flex flex-col rounded-[4px] border border-[rgb(42,44,46)] bg-[rgb(20,20,21)] md:overflow-hidden">
        <div className="flex flex-col overflow-hidden border-none !bg-transparent text-[#fff]">
          <div className="p-3">
            <div className="flex items-center justify-between gap-x-2 text-sm">
              <span className="w-full">{`${nfts.length > 1 ? 'Items' : 'Item'} Summary`}</span>
              <span className="shrink-0 text-[rgb(133,127,148)]">
                {nfts.length} {nfts.length > 1 ? 'items' : 'item'}
              </span>
            </div>
          </div>
          <ul className="flex flex-col overflow-y-auto break-words">
            {nfts.map((nft) => {
              const id = getNftId(nft);
              const status = statuses[id] || 'idle';
              return (
                <li
                  key={id}
                  className="border-t border-[rgb(42,44,46)] px-3 py-3"
                >
                  <div className="flex items-center justify-between gap-x-2 py-1 text-[#fff]">
                    <div className="flex items-center gap-x-2 overflow-hidden">
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded">
                        <img
                          className="size-full overflow-hidden object-contain"
                          src={
                            nft.imageOriginal ||
                            '/images/no-media-available.jpg'
                          }
                          alt={nft.name}
                        />
                      </div>
                      <div className="w-full pr-1 font-[500]">
                        <div className="text-sm">{nft.name}</div>
                      </div>
                    </div>
                    <div className="ml-auto flex shrink-0 items-center justify-center gap-x-2 pr-2 opacity-40">
                      {status === 'loading' && <Preloader />}
                      {status === 'success' && (
                        <div className="border-[rgb(65,231,138)] fill-[rgb(13,51,35)]">
                          <SuccessIcon width={20} height={20} />
                        </div>
                      )}
                      {status === 'error' && (
                        <div className="text-red-500">
                          <FailIcon width={20} height={20} />
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};
