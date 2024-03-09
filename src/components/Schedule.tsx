'use client';

import { useScheduleActions } from '@/hooks/useScheduleActions';
import type { Session } from '@/helpers/getSession';
import { useMounted } from '@/hooks/useMounted';
import { useRouter } from 'next/navigation';
import { formatDate } from '@/utils/date';
import { useEffect } from 'react';

export const Schedule = ({ session, scheduleId }: { session: Session; scheduleId: string }) => {
  const { getSchedule, updateScheduleStatus } = useScheduleActions(session);
  const { isMounted } = useMounted();
  const { push } = useRouter();

  const schedule = getSchedule(scheduleId);

  // useEffect(() => {
  //   if (isMounted && !schedule) push('/');
  // }, [push, schedule, isMounted]);

  return isMounted ? (
    <div className='flex flex-col gap-4 '>
      <p>Cliente: {schedule?.clientId}</p>
      <p>Status: {schedule?.status}</p>
      <p>Data: {formatDate(schedule?.date || new Date())}</p>
      <p>Corte: {schedule?.haircut.name}</p>
      <p>Descrição: {schedule?.haircut.description}</p>
      <p>Preço: {schedule?.haircut.price}</p>
      <p>Metodo de Pagamento: {schedule?.paymentMethod}</p>
      {schedule?.status === 'PENDING' && (
        <button onClick={() => updateScheduleStatus('CANCELED', schedule.id)}>Cancelar</button>
      )}
      {schedule?.status === 'PENDING' && (
        <button onClick={() => updateScheduleStatus('CONFIRMED', schedule.id)}>Confirmar</button>
      )}
      {schedule?.status === 'PENDING' && schedule.paymentMethod === 'CASH' && (
        <button onClick={() => updateScheduleStatus('PAID', schedule.id)}>Pago</button>
      )}
    </div>
  ) : null;
};
