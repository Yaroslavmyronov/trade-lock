'use client';

import { Market } from '@/widgets/Market';
import { UserSide } from './ui/UserSide';

export const TradePage = () => {
  return (
    <div className="relative flex h-full shrink grow flex-col bg-[#1d1f20]">
      <div className="flex shrink grow border-t-2 border-[#2a2c2e]">
        <UserSide />
        <Market />
      </div>
    </div>
  );
};
