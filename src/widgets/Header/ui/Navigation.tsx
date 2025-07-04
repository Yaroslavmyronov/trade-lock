'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navLinks } from '../model/navigation';

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <nav className="mr-auto ml-4">
      <ul className="flex h-full">
        {navLinks.map(({ title, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li className="px-2" key={href}>
              <Link
                className={`relative flex h-full items-center after:absolute after:bottom-[-2px] after:h-0.5 after:w-0 after:bg-[#836EF9] after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:w-full ${isActive ? 'text-[#836EF9] after:left-0 after:w-full' : 'text-[#fff] after:left-1/2'} after:z-[1]`}
                href={href}
              >
                <div className="mr-2">
                  <Icon></Icon>
                </div>

                <span className="text-[13px] uppercase">{title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
