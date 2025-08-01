export type Wallet = {
  id: string;
  name: string;
  icon: string;
  rdns: string;
  detected: boolean;
  type: 'eip6963' | 'legacy';
  provider: unknown | null;
};
