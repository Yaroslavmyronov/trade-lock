export type SortOption = {
  label: string;
  sort: string;
  order: 'asc' | 'desc';
};

export const sortOptions: SortOption[] = [
  { label: 'Relevance Ascending', sort: 'id', order: 'asc' },
  { label: 'Relevance Descending', sort: 'id', order: 'desc' },
  { label: 'Price Ascending', sort: 'price', order: 'asc' },
  { label: 'Price Descending', sort: 'price', order: 'desc' },
  { label: 'Alphabeticaly: A-Z', sort: 'name', order: 'asc' },
  { label: 'Alphabeticaly: Z-A', sort: 'name', order: 'desc' },
];

export const defaultSortOption: SortOption = sortOptions[0];
