'use client';

import { MouseEventHandler, ReactNode } from 'react';

interface ModalButtonProps {
  children: ReactNode;
  disabled?: boolean;
  bgColor?: string;
  hoverColor?: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const ModalButton = ({
  children,
  disabled = false,
  bgColor = '#836EF9',
  hoverColor = '#7A5DF5',
  onClick,
}: ModalButtonProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`inline-flex h-[40px] w-full cursor-pointer items-center justify-center rounded px-3 py-0 text-sm text-white transition disabled:cursor-not-allowed disabled:opacity-40 ${bgColor ? `bg-[${bgColor}]` : ''} ${hoverColor ? `hover:bg-[${hoverColor}]` : ''} `}
  >
    {children}
  </button>
);
