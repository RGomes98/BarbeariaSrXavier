import { formatDateGetWeekAndDay, formatDateGetHour, formatDateShort, formatDateGetDay } from '@/utils/date';
import { Haircut, ScheduleForm as ScheduleFormType, User } from '@/lib/schemas';
import { formatScheduleStatus, getScheduleStatusColor } from '@/utils/caption';
import { useBarberShopActions } from '@/hooks/useBarberShopActions';
import { TableCell, TableRow } from '@/components/ui/table';
import { type Session } from '@/helpers/getSession';
import { useMounted } from '@/hooks/useMounted';
import { ScheduleForm } from './ScheduleForm';
import { Fragment } from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

export const TableContent = ({
  hour,
  haircut,
  session,
  employees,
}: {
  hour: number;
  haircut: Haircut;
  session: Session;
  employees: User[];
}) => {
  const {
    employee,
    scheduleDate,
    isFormActive,
    paymentMethod,
    setIsFormActive,
    scheduleEmployee,
    getCurrentSchedule,
    handleCreateAppointment,
    getEmployeeCurrentHourSchedule,
  } = useBarberShopActions(employees);

  const { isMounted } = useMounted();

  const isScheduleNotActive = hour < new Date().getHours() && new Date() >= scheduleDate;
  const currentHourSchedule = getEmployeeCurrentHourSchedule(hour);
  const isEmployeeBusy =
    currentHourSchedule?.status !== 'CANCELED' && currentHourSchedule?.status !== undefined;

  const handleScheduleHaircut = () => {
    if (!session || !employee || isEmployeeBusy || isScheduleNotActive) return;

    handleCreateAppointment({
      paymentMethod,
      type: 'REGULAR',
      status: 'PENDING',
      userId: session.id,
      haircutId: haircut.id,
      employeeId: employee.id,
      appointmentDate: getCurrentSchedule(hour),
    });
  };

  const handleScheduleBreak = () => {
    if (!session || !employee || isEmployeeBusy || isScheduleNotActive) return;

    handleCreateAppointment({
      paymentMethod,
      type: 'REGULAR',
      status: 'BREAK',
      userId: session.id,
      haircutId: haircut.id,
      employeeId: employee.id,
      appointmentDate: getCurrentSchedule(hour),
    });
  };

  const handleScheduleHaircutSessionless = (formData: ScheduleFormType) => {
    if (!employee || isEmployeeBusy || isScheduleNotActive) return;
    const { cpf, name, phone } = formData;

    handleCreateAppointment({
      cpf,
      name,
      phone,
      paymentMethod,
      status: 'PENDING',
      type: 'SESSIONLESS',
      haircutId: haircut.id,
      employeeId: employee.id,
      appointmentDate: getCurrentSchedule(hour),
    });
  };

  return (
    <AlertDialog open={isFormActive}>
      <TableRow
        className={`relative cursor-pointer hover:border-t hover:brightness-110 max-md:text-xs hover:${getScheduleStatusColor(!isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')} ${getScheduleStatusColor(!isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')}`}
      >
        <TableCell className='max-md:py-3'>{formatDateGetHour(getCurrentSchedule(hour))}h</TableCell>
        <TableCell className='max-md:hidden'>{formatDateGetWeekAndDay(getCurrentSchedule(hour))}</TableCell>
        <TableCell className='md:hidden'>{formatDateGetDay(getCurrentSchedule(hour))}</TableCell>
        <TableCell className='font-medium max-md:hidden'>
          {formatScheduleStatus('long', !isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')}
        </TableCell>
        <TableCell className='font-medium md:hidden'>
          {formatScheduleStatus('short', !isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')}
        </TableCell>
        <TableCell className='text-right'>{scheduleEmployee}</TableCell>
        {(!isEmployeeBusy || !isScheduleNotActive) && isMounted && (
          <AlertDialogTrigger
            onClick={() => setIsFormActive(true)}
            className='absolute inset-0 h-full w-full'
          />
        )}
      </TableRow>
      <AlertDialogContent className='max-[550px]:max-w-[90%]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {(session?.accountType === 'ADMIN' || session?.accountType === 'EMPLOYEE') && 'Horário de Almoço'}
            {paymentMethod === 'CASH' &&
              (session?.accountType === 'USER' || !session) &&
              'Pagamento em Dinheiro'}
            {paymentMethod !== 'CASH' &&
              (session?.accountType === 'USER' || !session) &&
              'Confirmar Agendamento'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {(session?.accountType === 'ADMIN' || session?.accountType === 'EMPLOYEE') &&
              `Tem certeza de que deseja definir o horário ${formatDateShort(getCurrentSchedule(hour))} às ${formatDateGetHour(getCurrentSchedule(hour))} como o seu horário de almoço?`}
            {paymentMethod === 'CASH' &&
              (session?.accountType === 'USER' || !session) &&
              'Tem certeza de que deseja pagar pelo agendamento com dinheiro no momento da visita?'}
            {paymentMethod !== 'CASH' &&
              (session?.accountType === 'USER' || !session) &&
              `Tem certeza de que deseja confirmar o agendamento para o horário ${formatDateShort(getCurrentSchedule(hour))} às ${formatDateGetHour(getCurrentSchedule(hour))}?`}
            {!session && <ScheduleForm handleScheduleHaircutSessionless={handleScheduleHaircutSessionless} />}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsFormActive(false)}>Cancelar</AlertDialogCancel>
          {(session?.accountType === 'ADMIN' || session?.accountType === 'EMPLOYEE') && (
            <AlertDialogAction onClick={handleScheduleBreak}>
              Definir como Horário de Almoço
            </AlertDialogAction>
          )}
          {paymentMethod === 'CASH' && (
            <Fragment>
              {session?.accountType === 'USER' && (
                <AlertDialogAction onClick={handleScheduleHaircut}>Pagar com Dinheiro</AlertDialogAction>
              )}
              {!session && (
                <AlertDialogAction type='submit' form='sessionless'>
                  Pagar com Dinheiro
                </AlertDialogAction>
              )}
            </Fragment>
          )}
          {paymentMethod !== 'CASH' && (
            <Fragment>
              {session?.accountType === 'USER' && (
                <AlertDialogAction onClick={handleScheduleHaircut}>Confirmar Agendamento</AlertDialogAction>
              )}
              {!session && (
                <AlertDialogAction type='submit' form='sessionless'>
                  Confirmar Agendamento
                </AlertDialogAction>
              )}
            </Fragment>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
