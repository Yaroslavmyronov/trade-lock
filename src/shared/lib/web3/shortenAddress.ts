import { Address } from 'viem';

export const shortenAddress = (address: Address, start = 6, end = 4) => {
  if (!address) return '';
  return `${address.slice(0, start)}...${address.slice(-end)}`;
};
