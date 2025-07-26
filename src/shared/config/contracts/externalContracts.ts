import { GenericContractsDeclaration } from '@/shared/lib/types/contract';
import { MarketplaceABI } from 'Marketplace';

const externalContracts = {
  10143: {
    Marketplace: {
      address: '0xb1BfCa83f6d16928af5d67623627F157c896E7f7',
      abi: MarketplaceABI,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
