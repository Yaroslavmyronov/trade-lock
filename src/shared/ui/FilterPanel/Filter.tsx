import { FilterIcon } from './icons/FilterIcon';

interface FilterProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  active: boolean;
}

export const Filter = ({ onClick, active }: FilterProps) => {
  return (
    <div className="mr-1 select-none">
      <button
        onClick={onClick}
        className={`relative inline-flex h-[48px] min-w-[48px] cursor-pointer items-center justify-center overflow-hidden bg-[#2a2c2e] hover:inset-shadow-[0_70px_#0000001a] ${
          active ? 'text-[#836EF9]' : 'text-[#fff]'
        }`}
      >
        <FilterIcon />
      </button>
    </div>
  );
};
