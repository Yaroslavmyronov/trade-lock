import { CloseIcon } from '@/shared';
import { HeaderButton } from './HeaderButton';

interface HeaderProps {
  activeTab: 'Incoming' | 'Sent' | 'History';
  onTabChange: (tab: 'Incoming' | 'Sent' | 'History') => void;
  close: () => void;
}

export const Header = ({ close, activeTab, onTabChange }: HeaderProps) => {
  return (
    <div className="flex items-center border-b border-[#3e4044] pr-6">
      <div className="inline-flex">
        <HeaderButton
          activeTab={activeTab}
          onTabChange={() => onTabChange('Incoming')}
          title="Incoming"
        ></HeaderButton>
        <HeaderButton
          activeTab={activeTab}
          onTabChange={() => onTabChange('Sent')}
          title="Sent"
        ></HeaderButton>
        <HeaderButton
          activeTab={activeTab}
          onTabChange={() => onTabChange('History')}
          title="History"
        ></HeaderButton>
      </div>
      <button
        onClick={close}
        className="text-primary disabled:text-disabled ml-auto inline-flex size-8 cursor-pointer items-center justify-center rounded bg-transparent p-0 text-sm transition hover:bg-[rgb(62_56_77/_40%)] active:bg-[rgb(71_64_89/_60%)] disabled:bg-transparent"
      >
        <CloseIcon></CloseIcon>
      </button>
    </div>
  );
};
