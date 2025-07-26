import { nftStatus, NftStatus } from '@/entities/nfts/types';
import { getNftId } from '../model/NFT';

interface NFTsApprovalProps {
  nftStatuses: nftStatus[];
}

const getStatusStyles = (status: NftStatus) => {
  switch (status) {
    case NftStatus.UNKNOWN:
      return 'bg-gray-800';
    case NftStatus.PENDING:
      return 'bg-orange-300';
    case NftStatus.APPROVED:
      return 'bg-green-600';
    case NftStatus.REJECTED:
      return 'bg-red-600';
    default:
      return 'bg-gray-800';
  }
};

export const NFTsApproval = ({ nftStatuses }: NFTsApprovalProps) => {
  return (
    <div className="space-y-4 pt-3">
      {nftStatuses.map((item, index) => (
        <div
          key={getNftId(item.nft) || index}
          className="flex items-center justify-between rounded-lg p-4"
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className={`h-2 w-2 rounded-full ${getStatusStyles(item.status)}`}
              />

              <div>
                <h3 className="font-semibold">{item.nft.name}</h3>
                <p className="text-sm text-gray-500">#{item.nft.tokenId}</p>
              </div>
            </div>

            <img
              src={item.nft.imageOriginal}
              alt={item.nft.name}
              className="h-16 w-16 rounded-lg object-cover"
            />
          </div>
        </div>

      ))}
    </div>
  );
};
