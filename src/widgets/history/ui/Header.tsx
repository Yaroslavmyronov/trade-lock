import { CloseIcon } from '@/shared';

interface HeaderProps {
  close: () => void;
}

export const Header = ({ close }: HeaderProps) => {
  return (
    <div className="flex items-center border-b border-[#3e4044] pr-6">
      <div className="inline-flex">
        <div className="relative cursor-pointer p-6 text-[12px] text-[#836EF9] uppercase after:absolute after:bottom-[-2px] after:left-0 after:z-[1] after:h-0.5 after:w-full after:bg-[#836EF9] after:transition-all after:duration-300 after:ease-out">
          <span>History</span>
        </div>
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
