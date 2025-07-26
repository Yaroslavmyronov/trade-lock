import LogoImage from '@public/images/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
  <Link
    href="/"
    title="Home"
    aria-label="Home"
    className="flex h-[3.75rem] w-40 items-center justify-center border-r-2 border-[rgb(42,44,46)]"
  >
    <Image alt="" src={LogoImage}></Image>
  </Link>
);
