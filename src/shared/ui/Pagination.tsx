'use client';

import { ArrowIcon } from '../icons';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  const pages: number[] = [];
  const maxVisible = 10;

  pages.push(1);

  let start = 2;
  let end = maxVisible;

  if (currentPage > maxVisible - 1) {
    start = currentPage - 6;
    end = currentPage + 3;
    if (end > totalPages) {
      end = totalPages;
      start = end - (maxVisible - 1);
    }
  }

  for (let i = start; i <= end; i++) {
    if (i > 1 && i <= totalPages) pages.push(i);
  }

  if (end < totalPages) {
    pages.push(totalPages);
  }

  return (
    <ul className="flex items-center justify-center">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="mx-2.5 size-[34px] cursor-pointer rounded-xs border border-transparent disabled:opacity-30"
      >
        <div className="flex size-full rotate-90 items-center justify-center">
          <ArrowIcon />
        </div>
      </button>

      {pages.map((num) => (
        <li
          key={num}
          onClick={() => onPageChange(num)}
          className={`${
            num === currentPage
              ? 'border-[#836EF9] text-[#836EF9]'
              : 'border-transparent'
          } mx-2.5 size-[34px] cursor-pointer rounded-xs border transition-colors duration-300 hover:text-[#836EF9]`}
        >
          <div className="flex size-full items-center justify-center">
            {num}
          </div>
        </li>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="mx-2.5 size-[34px] rounded-xs border border-transparent transition-colors duration-300 hover:text-[#836EF9] disabled:opacity-30"
      >
        <div className="flex size-full -rotate-90 cursor-pointer items-center justify-center">
          <ArrowIcon />
        </div>
      </button>
    </ul>
  );
};
