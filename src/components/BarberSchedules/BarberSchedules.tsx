'use client';

import { useBarberShopActions } from '@/hooks/useBarberShopActions';
import { Fragment, RefObject, createRef, useRef } from 'react';
import { formatDate, formatDateShort } from '@/utils/date';
import { Haircut, workingHours } from '@/mock/users';
import { type Session } from '@/helpers/getSession';
import { Modal } from '@/components/Modal/Modal';
import { useMounted } from '@/hooks/useMounted';

export const BarberSchedules = ({ haircut, session }: { haircut: Haircut; session: Session }) => {
  const {
    employee,
    scheduleDate,
    paymentMethod,
    scheduleHaircut,
    getCurrentSchedule,
    getEmployeeCurrentHourSchedule,
  } = useBarberShopActions();
  const { isMounted } = useMounted();

  const dialogRefs = useRef<RefObject<HTMLDialogElement>[]>(workingHours.map(() => createRef()));

  return (
    isMounted && (
      <Fragment>
        <div className='mt-4 flex max-w-[500px] flex-col gap-2'>
          <p>Barbeiro Selecionado: {employee?.name}</p>
          <p>Horarios Disponiveis para: {formatDateShort(scheduleDate)}</p>
          <p>Metodo de Pagamento: {paymentMethod}</p>
          {workingHours.map((hour, index) => {
            const currentHourSchedule = getEmployeeCurrentHourSchedule(hour);
            const isEmployeeBusy = currentHourSchedule;
            const modalRef = dialogRefs.current[index];

            const handleScheduleHaircut = () => {
              scheduleHaircut(session, haircut, getCurrentSchedule(hour), 'PENDING');
            };

            const handleScheduleBreak = () => {
              scheduleHaircut(session, haircut, getCurrentSchedule(hour), 'BREAK');
            };

            const handleShowModal = () => {
              if (isEmployeeBusy) return;
              modalRef.current?.showModal();
            };

            const handleHideModal = () => {
              modalRef.current?.close();
            };

            return (
              <Fragment key={index}>
                <button
                  onClick={handleShowModal}
                  className={`${isEmployeeBusy ? 'cursor-default bg-red-600' : 'bg-green-400'}`}
                >
                  {!isEmployeeBusy
                    ? `Agendar para: ${formatDate(getCurrentSchedule(hour))}`
                    : (currentHourSchedule.status === 'BREAK' && 'HORARIO DE ALMOÇO') || 'HORARIO RESERVADO'}
                </button>
                <Modal modalRef={modalRef}>
                  {paymentMethod === 'CASH' && (
                    <Fragment>
                      <h1>Pagar agendamentos com dinheiro na hora</h1>
                      <button onClick={handleHideModal}>Fechar</button>
                      <button onClick={handleScheduleHaircut}>Confirmar</button>
                    </Fragment>
                  )}
                  {session?.role === 'EMPLOYEE' && (
                    <Fragment>
                      <h1>Deseja Marcar esse horario como horario de almoço?</h1>
                      <button onClick={handleHideModal}>Fechar</button>
                      <button onClick={handleScheduleBreak}>Confirmar</button>
                    </Fragment>
                  )}
                  {paymentMethod !== 'CASH' && session?.role !== 'EMPLOYEE' && (
                    <Fragment>
                      <h1>Deseja Confirmar com o agendamento?</h1>
                      <button onClick={handleHideModal}>Fechar</button>
                      <button onClick={handleScheduleHaircut}>Confirmar</button>
                    </Fragment>
                  )}
                </Modal>
              </Fragment>
            );
          })}
        </div>
      </Fragment>
    )
  );
};
