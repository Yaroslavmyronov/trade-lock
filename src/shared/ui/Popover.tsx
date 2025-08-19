'use client';

import { ReactNode, useRef, useState } from 'react';

interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
}

export const Popover = ({ trigger, children }: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className="relative inline-flex cursor-pointer items-center justify-center"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {trigger}
      {open && (
        <div className="absolute top-full -right-1/2 z-50 origin-top-right cursor-default rounded-b-[8px] bg-[rgb(42,44,46)] shadow-lg">
          {children}
        </div>
      )}
    </div>
  );
};
