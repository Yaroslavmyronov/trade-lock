import { CustomConnectButton } from '@/features/connect-wallet/ui/CustomConnectButton';
import { NotificationsDropdown } from '@/features/notifications';
import { Logo } from './Logo';
import { Navigation } from './Navigation';

export const Header = () => {
  return (
    <header>
      <div className="outline-2 outline-[#2a2c2e]">
        <div className="flex items-stretch justify-between pr-[15px] text-[1rem]">
          <Logo></Logo>
          <Navigation></Navigation>
          <NotificationsDropdown></NotificationsDropdown>
          <CustomConnectButton></CustomConnectButton>
        </div>
      </div>
    </header>
  );
};
