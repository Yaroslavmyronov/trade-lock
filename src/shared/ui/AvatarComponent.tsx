'use client';

import { blo } from 'blo';

interface AvatarComponentInterface {
  address: `0x${string}` | undefined;
  ensImage?: string;
  size: number;
}

export const AvatarComponent = ({
  address,
  ensImage,
  size,
}: AvatarComponentInterface) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img
    className="rounded-full"
    src={ensImage || blo(address as `0x${string}`)}
    width={size}
    height={size}
    alt={`${address} avatar`}
  />
);
