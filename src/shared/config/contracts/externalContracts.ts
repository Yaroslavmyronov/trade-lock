import { GenericContractsDeclaration } from '@/shared/lib/types/contract';
import { MarketplaceABI } from 'Marketplace';
import { Address } from 'viem';

const externalContracts = {
  10143: {
    Marketplace: {
      address: process.env.NEXT_PUBLIC_MARKETPLACE_ADDRESS as Address,
      abi: MarketplaceABI,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
