'use client';

// import { createDateInputQueryString, createQueryString } from '@/helpers/createQueryString';
// import { formatDate, formatDateShort, formatToDateTime } from '@/utils/date';
// import { useScheduleActions } from '@/hooks/useScheduleActions';
import { Session } from '@/helpers/getSession';
import { Fragment } from 'react';

// import Link from 'next/link';

export const ReceivedSchedules = ({ session }: { session: Session }) => {
  // const { searchParams, scheduleEmployee, scheduleDate, filterAllSchedules } = useScheduleActions(session);

  return (
    <Fragment>
      {/* <div className='flex gap-4 px-4'>
        <input
          onChange={(event) => createDateInputQueryString({ event, searchParams })}
          value={formatToDateTime(scheduleDate)}
          type='date'
        />
        <Link
          className='bg-slate-500 p-2 text-white'
          href={`?${createQueryString({ searchParams, key: 'employee', value: 'Barber1' })}`}
        >
          Barber 1
        </Link>
        <Link
          className='bg-slate-500 p-2 text-white'
          href={`?${createQueryString({ searchParams, key: 'employee', value: 'Barber2' })}`}
        >
          Barber 2
        </Link>
        <Link className='bg-slate-500 p-2 text-white' href='/recebidos'>
          Limpar
        </Link>
      </div>
      <p>Filtrando por data: {formatDateShort(scheduleDate)}</p>
      <p>Filtrando por Barbeiro: {scheduleEmployee || 'Todos'}</p>
      <div className='flex flex-col gap-4'>
        {filterAllSchedules().map(({ id, clientId, employeeId, status, paymentMethod, date, haircut }) => {
          return (
            <Link href={`/agendamento/${id}`} key={id} className='bg-slate-300'>
              <p>Barbeiro: {employeeId}</p>
              <p>Cliente: {clientId}</p>
              <p>Status: {status}</p>
              <p>Meio de pagamento: {paymentMethod}</p>
              <p>Data: {formatDate(date)}</p>
              <p>Corte: {haircut.name}</p>
              <p>Preço: {haircut.price}</p>
            </Link>
          );
        })}
      </div> */}
    </Fragment>
  );
};
