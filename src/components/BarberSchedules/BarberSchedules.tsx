'use client';

import { PaymentModal } from '@/components/PaymentModal/PaymentModal';
import { useBarberShopActions } from '@/hooks/useBarberShopActions';
import { formatDate, formatDateShort } from '@/utils/date';
import { Haircut, workingHours } from '@/mock/users';
import { type Session } from '@/helpers/getSession';
import { useMounted } from '@/hooks/useMounted';
import { useModal } from '@/hooks/useModal';
import { Fragment } from 'react';

export const BarberSchedules = ({ haircut, session }: { haircut: Haircut; session: Session }) => {
  const { employee, scheduleDate, paymentMethod, scheduleHaircut, getCurrentSchedule } =
    useBarberShopActions();
  const { modalRef, showModal, hideModal } = useModal();
  const { isMounted } = useMounted();

  return (
    isMounted && (
      <Fragment>
        <div className='mt-4 flex max-w-[500px] flex-col gap-2'>
          <p>Barbeiro Selecionado: {employee?.name}</p>
          <p>Horarios Disponiveis para: {formatDateShort(scheduleDate)}</p>
          <p>Metodo de Pagamento: {paymentMethod}</p>
          {workingHours.map((hour, index) => {
            const isEmployeeBusy = employee?.schedules.some(({ date }) => {
              return date.getTime() === getCurrentSchedule(hour).getTime();
            });

            const handleSchedule = () => {
              if (!isEmployeeBusy && paymentMethod === 'cash') return showModal();
              if (!isEmployeeBusy && session?.role !== 'EMPLOYEE')
                scheduleHaircut(session, haircut, getCurrentSchedule(hour));
            };

            return (
              <button
                className={`${isEmployeeBusy ? 'cursor-default bg-red-600' : 'bg-green-400'}`}
                onClick={handleSchedule}
                key={index}
              >
                Agendar para: {formatDate(getCurrentSchedule(hour))}
              </button>
            );
          })}
        </div>
        <PaymentModal modalRef={modalRef} hideModal={hideModal} />
      </Fragment>
    )
  );
};
