import { useRef } from 'react';

export const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);

  const showModal = () => modalRef.current?.showModal();
  const hideModal = () => modalRef.current?.close();

  return { modalRef, showModal, hideModal };
};
