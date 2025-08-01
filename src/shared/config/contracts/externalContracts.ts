import { GenericContractsDeclaration } from '@/shared/lib/types/contract';
import { MarketplaceABI } from 'Marketplace';

const externalContracts = {
  10143: {
    Marketplace: {
      address: '0x570413264Fb80dcEA4b35bd364dA54320f61fDB9',
      abi: MarketplaceABI,
    },
  },
} as const;

export default externalContracts satisfies GenericContractsDeclaration;
