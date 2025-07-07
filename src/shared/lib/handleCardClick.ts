export const handleCardClick = (
  id: string,
  isSelected: boolean,
  toggleSelect: (id: string) => void,
  removeItem: (id: string) => void,
) => {
  if (!isSelected) {
    toggleSelect(id);
  } else {
    removeItem(id);
  }
};
