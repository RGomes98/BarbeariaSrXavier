import { type RefObject } from 'react';

type PaymentModal = {
  modalRef: RefObject<HTMLDialogElement>;
  hideModal: () => void;
};

export const PaymentModal = ({ modalRef, hideModal }: PaymentModal) => {
  return (
    <dialog ref={modalRef}>
      <h1>Agendar pagamentos com dinheiro na hora</h1>
      <button onClick={hideModal}>Close</button>
    </dialog>
  );
};
