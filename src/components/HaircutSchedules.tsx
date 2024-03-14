'use client';

import { formatDateGetWeekAndDay, formatDateGetHour, formatDateShort, formatDateGetDay } from '@/utils/date';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatScheduleStatus, getScheduleStatusColor } from '@/utils/caption';
import { useBarberShopActions } from '@/hooks/useBarberShopActions';
import { Haircut, User, workingHours } from '@/lib/schemas';
import { type Session } from '@/helpers/getSession';
import { HaircutOptions } from './HaircutOptions';
import { useMounted } from '@/hooks/useMounted';

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

export const HaircutSchedules = ({
  haircut,
  session,
  employees,
}: {
  haircut: Haircut;
  session: Session;
  employees: User[];
}) => {
  const {
    employee,
    scheduleDate,
    paymentMethod,
    scheduleEmployee,
    getCurrentSchedule,
    handleCreateAppointment,
    getEmployeeCurrentHourSchedule,
  } = useBarberShopActions(employees);
  const { isMounted } = useMounted();

  return (
    <div className='mt-auto flex h-full w-full max-w-[700px] flex-col justify-center gap-14 max-[1350px]:max-w-none max-md:gap-8'>
      <span className='font-raleway text-3xl font-medium max-md:text-2xl'>
        Horários de {formatDateShort(scheduleDate)}
      </span>
      <HaircutOptions employees={employees} />
      <Table>
        <TableHeader className='pointer-events-none'>
          <TableRow className='max-md:text-xs'>
            <TableHead>Hora</TableHead>
            <TableHead>Dia</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Profissional</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workingHours.map((hour, index) => {
            const isScheduleNotActive = hour < new Date().getHours() && new Date() >= scheduleDate;
            const currentHourSchedule = getEmployeeCurrentHourSchedule(hour);
            const isEmployeeBusy = currentHourSchedule;

            const handleScheduleHaircut = async () => {
              if (!session || !employee) return;

              handleCreateAppointment(
                haircut.id,
                session.id,
                employee.id,
                'PENDING',
                paymentMethod,
                getCurrentSchedule(hour),
              );
            };

            const handleScheduleBreak = async () => {
              if (!session || !employee) return;

              handleCreateAppointment(
                haircut.id,
                session.id,
                employee.id,
                'BREAK',
                paymentMethod,
                getCurrentSchedule(hour),
              );
            };

            return (
              <AlertDialog key={index}>
                <TableRow
                  className={`relative cursor-pointer hover:border-t hover:brightness-110 max-md:text-xs hover:${getScheduleStatusColor(!isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')} ${getScheduleStatusColor(!isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')}`}
                >
                  <TableCell className='max-md:py-3'>
                    {formatDateGetHour(getCurrentSchedule(hour))}h
                  </TableCell>
                  <TableCell className='max-md:hidden'>
                    {formatDateGetWeekAndDay(getCurrentSchedule(hour))}
                  </TableCell>
                  <TableCell className='md:hidden'>{formatDateGetDay(getCurrentSchedule(hour))}</TableCell>
                  <TableCell className='font-medium max-md:hidden'>
                    {formatScheduleStatus(
                      'long',
                      !isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED',
                    )}
                  </TableCell>
                  <TableCell className='font-medium md:hidden'>
                    {formatScheduleStatus(
                      'short',
                      !isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED',
                    )}
                  </TableCell>
                  <TableCell className='text-right'>{scheduleEmployee}</TableCell>
                  {(!isEmployeeBusy || !isScheduleNotActive) && isMounted && (
                    <AlertDialogTrigger className='absolute inset-0' />
                  )}
                </TableRow>
                <AlertDialogContent className='max-[550px]:max-w-[90%]'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {(session?.accountType === 'ADMIN' || session?.accountType === 'EMPLOYEE') &&
                        'Horário de Almoço'}
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
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    {(session?.accountType === 'ADMIN' || session?.accountType === 'EMPLOYEE') && (
                      <AlertDialogAction onClick={handleScheduleBreak}>
                        Definir como Horário de Almoço
                      </AlertDialogAction>
                    )}
                    {paymentMethod === 'CASH' && (session?.accountType === 'USER' || !session) && (
                      <AlertDialogAction onClick={handleScheduleHaircut}>
                        Pagar com Dinheiro
                      </AlertDialogAction>
                    )}
                    {paymentMethod !== 'CASH' && (session?.accountType === 'USER' || !session) && (
                      <AlertDialogAction onClick={handleScheduleHaircut}>
                        Confirmar Agendamento
                      </AlertDialogAction>
                    )}
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
