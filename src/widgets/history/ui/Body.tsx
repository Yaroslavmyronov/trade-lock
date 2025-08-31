import { History } from '@/entities/history/model/type';
import { CopyIcon, Pagination, Preloader } from '@/shared';

import dayjs from 'dayjs';
import { useState } from 'react';
import { Hash } from 'viem';
import { SuccessIcon } from './SuccessIcon';

const headers = [
  'Date & Time',
  'Operation',
  'From',
  'To',
  'Transaction',
  'Status',
];

interface BodyProps {
  history: History[];
  page: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  isPlaceholderData: boolean;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

export const Body = ({
  history,
  handlePageChange,
  page,
  totalPages,
  isPlaceholderData,
  isLoading,
  isError,
  error,
}: BodyProps) => {
  const [copied, setCopied] = useState<Record<string, boolean>>({});
  const formatDate = (date: string) =>
    dayjs(date).format('MMM D, YYYY, h:mm A');
  const formatted = (status: string) =>
    status.replace(/([A-Z])/g, ' $1').trim();

  const handleCopy = async (text: Hash) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied((prev) => ({ ...prev, [text]: true }));
      setTimeout(() => {
        setCopied((prev) => ({ ...prev, [text]: false }));
      }, 1000);
    } catch (error) {
      console.error('Error copy: ', error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex size-full items-center justify-center text-[#836EF9]">
        <Preloader width={80} height={80} border={5}></Preloader>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex size-full items-center justify-center text-[#836EF9]">
        <p>Error: {error?.message}</p>
      </div>
    );
  }

  return (
    <div className="size-full overflow-auto">
      <div className="mx-auto mt-5 max-w-[650px]">
        <div className="table-row min-h-[35px] items-center">
          {headers.map((title) => (
            <div
              key={title}
              className="table-cell h-16 max-w-[120px] border-b border-[#3e4044] px-4 py-3 text-center align-middle text-xs"
            >
              {title}
            </div>
          ))}
        </div>

        {history.map((item, index) => (
          <div
            key={index}
            className={`table-row min-h-[35px] items-center text-[11px] leading-3.5 font-normal ${isPlaceholderData ? 'opacity-50' : ''} ${index % 2 === 0 ? 'bg-[#ffffff0a]' : ''}`}
          >
            <div className="table-cell h-16 min-w-[95px] px-4 py-1 align-middle opacity-50">
              <p>{formatDate(item.metadata.timestamp)}</p>
            </div>
            <div className="table-cell h-16 min-w-[95px] px-4 py-1 align-middle">
              <p>
                {item.listings !== null
                  ? formatted(item.listings.status)
                  : formatted(item.trade?.status)}
              </p>
            </div>
            <div className="table-cell h-16 min-w-[95px] px-4 py-1 align-middle">
              <span className="block max-w-[60px] truncate">
                {item.listings !== null
                  ? item.listings.sellerAddress
                  : item.trade?.from.address}
              </span>
            </div>
            <div className="table-cell h-16 min-w-[95px] px-4 py-1 align-middle">
              <span className="block max-w-[60px] truncate">
                {item.listings !== null
                  ? item.listings.buyerAddress
                  : item.trade?.to.address}
              </span>
            </div>
            <div className="table-cell h-16 min-w-[95px] px-4 py-1 align-middle">
              <div
                onClick={() => handleCopy(item.metadata.transactionHash)}
                className="flex cursor-pointer items-center"
              >
                <span className="max-w-[60px] truncate">
                  {item.metadata.transactionHash}
                </span>
                {copied[item.metadata.transactionHash] ? (
                  <SuccessIcon></SuccessIcon>
                ) : (
                  <CopyIcon width={12} height={12} />
                )}
              </div>
            </div>
            <div className="table-cell h-16 min-w-[95px] px-4 py-1 align-middle">
              <div
                className={`flex items-center before:mr-2 before:size-2 before:rounded-full ${item.status === 'Success' ? 'text-[#8dd294] before:bg-[#8dd294]' : item.status === 'Pending' ? 'text-[#ffb661] before:bg-[#ffb661]' : 'text-[#ff6464] before:bg-[#ff6464]'}`}
              >
                {item.status}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full pt-[30px] text-center">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        ></Pagination>
      </div>
    </div>
  );
};
