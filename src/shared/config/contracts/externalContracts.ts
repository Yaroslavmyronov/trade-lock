import { GenericContractsDeclaration } from '@/shared/lib/types/contract';
import { MarketplaceABI } from 'Marketplace';

const externalContracts = {
  10143: {
    Marketplace: {
      address: '0x2fe3AA6c023608b6F3D94b6Ec91fae1382de61c8',
      abi: MarketplaceABI,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
