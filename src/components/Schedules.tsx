'use client';

import { useScheduleActions } from '@/hooks/useScheduleActions';
import type { Session } from '@/helpers/getSession';
import { useMounted } from '@/hooks/useMounted';
import { formatDate } from '@/utils/date';

import Link from 'next/link';

export const Schedules = ({ session }: { session: Session }) => {
  const { getSchedules } = useScheduleActions(session);
  const { isMounted } = useMounted();

  return (
    <div className='flex flex-col gap-4 '>
      {isMounted &&
        getSchedules()?.map(({ id, haircut, date, status, clientId, paymentMethod }) => {
          return session?.accountType !== 'USER' ? (
            <Link key={id} href={`/agendamento/${id}`} className='bg-slate-500 '>
              <p>Corte: {haircut.name}</p>
              <p>Preço: {haircut.price}</p>
              <p>Data: {formatDate(date)}</p>
              <p>Status {status}</p>
              <div>Cliente: {clientId}</div>
              <div>Metodo de Pagamento: {paymentMethod}</div>
            </Link>
          ) : (
            <div key={id} className='bg-slate-500 '>
              <p>Corte: {haircut.name}</p>
              <p>Preço: {haircut.price}</p>
              <p>Data: {formatDate(date)}</p>
              <p>Status {status}</p>
            </div>
          );
        })}
    </div>
  );
};
