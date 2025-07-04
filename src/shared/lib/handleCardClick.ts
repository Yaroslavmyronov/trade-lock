export const handleCardClick = (
  id: number,
  isSelected: boolean,
  toggleSelect: (id: number) => void,
  removeItem: (id: number) => void,
) => {
  if (!isSelected) {
    toggleSelect(id);
  } else {
    removeItem(id);
  }
};
