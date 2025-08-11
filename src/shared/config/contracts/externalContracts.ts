import { GenericContractsDeclaration } from '@/shared/lib/types/contract';
import { MarketplaceABI } from 'Marketplace';

const externalContracts = {
  10143: {
    Marketplace: {
      address: '0x7D8b883A19EF765b6dbbf96AF84953885f8753B8',
      abi: MarketplaceABI,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
