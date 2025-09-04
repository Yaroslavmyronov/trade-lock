import { LoginProvider } from '@/shared/providers/LoginProvider';
import { OnSale } from '@/widgets/on-sale';

export const OnSalePage = () => {
  return (
    <LoginProvider>
      <div className="relative flex h-full shrink grow flex-col bg-[#1d1f20]">
        <div className="flex shrink grow border-t-2 border-[#2a2c2e]">
          <OnSale></OnSale>
        </div>
      </div>
    </LoginProvider>
  );
};
