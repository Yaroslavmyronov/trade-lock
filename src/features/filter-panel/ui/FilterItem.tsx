interface FilterItemProps {
  title: string;
  children: React.ReactNode;
}

const FilterItem = ({ title, children }: FilterItemProps) => {
  return (
    <div className="pt-1 pr-3 pb-1 pl-3">
      <div className="pb-2">{title}</div>
      {children}
    </div>
  );
};

export default FilterItem;
