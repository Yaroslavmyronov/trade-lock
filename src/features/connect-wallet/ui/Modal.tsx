import React from 'react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const Modal: React.FC<ModalProps> = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg">
        <h2 className="mb-2 text-xl font-semibold">Подтвердите вход</h2>
        <p className="mb-4 text-gray-600">
          Пожалуйста, подпишите сообщение в кошельке для продолжения.
        </p>
        <div className="flex justify-center gap-3">
          <button
            onClick={onConfirm}
            className="rounded bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Подписать
          </button>
          <button
            onClick={onClose}
            className="rounded bg-gray-200 px-4 py-2 text-gray-700 transition hover:bg-gray-300"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};
