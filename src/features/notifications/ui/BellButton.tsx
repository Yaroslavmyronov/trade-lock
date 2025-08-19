'use client';
import { NotificationsIcon } from '@/shared';
import { useAccount } from 'wagmi';

interface BellButtonProps {
  unreadCount?: number;
}

export const BellButton = ({ unreadCount = 0 }: BellButtonProps) => {
  const { isConnected, address } = useAccount();
  if (!isConnected || !address) return null;

  return (
    <button className="relative mx-2 inline-flex cursor-pointer items-center justify-center">
      <NotificationsIcon />
      {unreadCount > 0 && (
        <div className="absolute -top-[5px] -right-[7px] flex h-5 w-5 items-center justify-center rounded-full bg-[#FE4539] text-[12px] leading-3 font-normal">
          {unreadCount}
        </div>
      )}
    </button>
  );
};
