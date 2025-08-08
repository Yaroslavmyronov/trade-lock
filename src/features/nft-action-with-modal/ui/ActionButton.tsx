'use client';

import { ReactNode } from 'react';

interface ActionButtonProps {
  icon: ReactNode;
  label: string;
  subLabel?: string;
  disabled?: boolean;
  onClick: () => void;
}

export const ActionButton = ({
  icon,
  label,
  subLabel,
  disabled,
  onClick,
}: ActionButtonProps) => (
  <div className="mx-1.5">
    <button
      className="flex min-h-[48px] min-w-[160px] cursor-pointer items-center justify-start rounded-[2px] bg-[#836EF9] px-3 disabled:cursor-not-allowed disabled:opacity-40"
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      <span className="ml-2.5 flex flex-col text-left">
        <span className="leading-3.5">{label}</span>
        {subLabel && (
          <span className="text-[12px] leading-3 opacity-80">{subLabel}</span>
        )}
      </span>
    </button>
  </div>
);
