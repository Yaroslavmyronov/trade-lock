'use client';

import { useModal } from '@/shared/lib/useModal';
import { ReactNode } from 'react';
import { ActionButton } from './ActionButton';

type ModalComponentType<T> = React.ComponentType<
  T & {
    isOpen: boolean;
    onClose: () => void;
  }
>;

interface ActionWithModalProps<
  TAdditionalProps extends Record<string, unknown> = Record<string, never>,
> {
  icon: ReactNode;
  label: string;
  subLabel?: string;
  disabled?: boolean;
  ModalComponent: ModalComponentType<TAdditionalProps>;
  modalProps?: TAdditionalProps;
}

export const ActionWithModal = <
  TAdditionalProps extends Record<string, unknown> = Record<string, never>,
>({
  icon,
  label,
  subLabel,
  disabled,
  ModalComponent,
  modalProps,
}: ActionWithModalProps<TAdditionalProps>) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <ActionButton
        icon={icon}
        label={label}
        subLabel={subLabel}
        disabled={disabled}
        onClick={open}
      />
      <ModalComponent
        {...(modalProps as TAdditionalProps)}
        isOpen={isOpen}
        onClose={close}
      />
    </>
  );
};
