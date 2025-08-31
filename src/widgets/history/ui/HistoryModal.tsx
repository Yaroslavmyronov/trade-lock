'use client';
import { historyApi } from '@/entities/history/api/historyApi';
import { useHistoryModalStore } from '@/shared/store/useHistoryModalStore';
import { Modal } from '@/shared/ui/Modal';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Body } from './Body';
import { Header } from './Header';

export const HistoryModal = () => {
  const { isOpen, close } = useHistoryModalStore();
  const [page, setPage] = useState(1);
  const {
    data: historyData,
    isLoading,
    isError,
    error,
    isPlaceholderData,
  } = useQuery(historyApi.getListQueryOptions(page));

  const handlePageChange = (page: number) => {
    setPage(page);
  };

  return (
    <Modal isOpen={isOpen} onClose={close}>
      <div className="flex h-screen w-full max-w-[1200px] items-center justify-center">
        <div className="flex h-[98vh] max-h-[1000px] w-full flex-col rounded-[4px] bg-[#2a2c2e]">
          <Header close={close}></Header>
          <Body
            isLoading={isLoading}
            error={error}
            isError={isError}
            isPlaceholderData={isPlaceholderData}
            handlePageChange={handlePageChange}
            page={page}
            totalPages={historyData?.totalPages || 0}
            history={historyData?.history || []}
          ></Body>
        </div>
      </div>
    </Modal>
  );
};
