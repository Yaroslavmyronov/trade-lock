import { Inventory } from '@/widgets/Inventory';

export const SellPage = () => {
  return (
    <div className="relative flex h-full shrink grow flex-col bg-[#1d1f20]">
      <div className="flex shrink grow border-t-2 border-[#2a2c2e]">
        <Inventory filter="sell" />
      </div>
    </div>
  );
};
