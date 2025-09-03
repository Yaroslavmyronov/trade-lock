interface FilterItemProps {
  title: string;
  children: React.ReactNode;
}

const FilterItem = ({ title, children }: FilterItemProps) => {
  return (
    <div className="px-5 pt-1 pr-3">
      <div>{title}</div>
      {children}
    </div>
  );
};

export default FilterItem;
