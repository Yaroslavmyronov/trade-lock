interface HeaderButtonProps {
  title: string;
  onTabChange: () => void;
  activeTab: 'Incoming' | 'Sent' | 'History';
}

export const HeaderButton = ({
  activeTab,
  title,
  onTabChange,
}: HeaderButtonProps) => {
  const isActive = activeTab === title;
  return (
    <button
      onClick={onTabChange}
      className={`relative cursor-pointer p-6 text-[12px] uppercase after:absolute after:bottom-[-2px] after:z-[1] after:h-0.5 after:w-0 after:bg-[#836EF9] after:transition-all after:duration-300 after:ease-out hover:after:left-0 hover:after:w-full ${isActive ? 'text-[#836EF9] after:left-0 after:w-full' : 'text-[#fff] after:left-1/2'}`}
    >
      <span>{title}</span>
    </button>
  );
};
