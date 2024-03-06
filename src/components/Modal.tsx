import type { RefObject } from 'react';

type Modal = { children: React.ReactNode; modalRef: RefObject<HTMLDialogElement> };

export const Modal = ({ children, modalRef }: Modal) => {
  return <dialog ref={modalRef}>{children}</dialog>;
};
