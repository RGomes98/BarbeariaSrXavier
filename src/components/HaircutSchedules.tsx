'use client';

import { formatDateGetWeekAndDay, formatDateGetHour, formatDateShort, formatDateGetDay } from '@/utils/date';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useBarberShopActions } from '@/hooks/useBarberShopActions';
import { getScheduleStatusColor } from '@/utils/caption';
import { Haircut, workingHours } from '@/mock/users';
import { type Session } from '@/helpers/getSession';
import { HaircutOptions } from './HaircutOptions';
import { Test } from '@/lib/schemas';

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
import { useMounted } from '@/hooks/useMounted';
import { AccountType } from '@/models/UserData';

export const HaircutSchedules = ({
  haircut,
  barbers,
  session,
}: {
  haircut: Haircut;
  barbers: Test;
  session: Session;
}) => {
  const {
    scheduleDate,
    paymentMethod,
    scheduleHaircut,
    scheduleEmployee,
    getCurrentSchedule,
    getEmployeeCurrentHourSchedule,
  } = useBarberShopActions(barbers);
  const { isMounted } = useMounted();

  return (
    <div className='mt-auto flex h-full w-full max-w-[700px] flex-col justify-center gap-14 max-[1350px]:max-w-none max-md:gap-8'>
      <span className='font-raleway text-3xl font-medium max-md:text-2xl'>
        Horários de {formatDateShort(scheduleDate)}
      </span>
      <HaircutOptions barbers={barbers} />
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
            const currentHourSchedule = getEmployeeCurrentHourSchedule(hour);
            const isEmployeeBusy = currentHourSchedule;

            const handleScheduleHaircut = () => {
              scheduleHaircut(session, haircut, getCurrentSchedule(hour), 'PENDING', {
                accountType: AccountType.USER,
                name: 'Teste',
                id: '123',
                cpf: '123',
                email: 'teste@teste',
                cellphone: '123',
                createdAt: new Date(),
              });
            };

            const handleScheduleBreak = () => {
              scheduleHaircut(session, haircut, getCurrentSchedule(hour), 'BREAK', {
                accountType: AccountType.USER,
                name: 'Teste',
                id: '123',
                cpf: '123',
                email: 'teste@teste',
                cellphone: '123',
                createdAt: new Date(),
              });
            };

            return (
              <AlertDialog key={index}>
                <TableRow
                  className={`relative cursor-pointer hover:border-t hover:brightness-110 max-md:text-xs ${isEmployeeBusy ? 'bg-red-500/70' : 'bg-green-500/70'}`}
                >
                  <TableCell className='max-md:py-3'>
                    {formatDateGetHour(getCurrentSchedule(hour))}h
                  </TableCell>
                  <TableCell className='max-md:hidden'>
                    {formatDateGetWeekAndDay(getCurrentSchedule(hour))}
                  </TableCell>
                  <TableCell className='md:hidden'>{formatDateGetDay(getCurrentSchedule(hour))}</TableCell>
                  <TableCell className='font-medium max-md:hidden'>
                    {/* {formatScheduleStatus('long', currentHourSchedule?.status)} */}
                  </TableCell>
                  <TableCell className='font-medium md:hidden'>
                    {/* {formatScheduleStatus('short', currentHourSchedule?.status)} */}
                  </TableCell>
                  <TableCell className='text-right'>{scheduleEmployee}</TableCell>
                  {!isEmployeeBusy && isMounted && <AlertDialogTrigger className='absolute inset-0' />}
                </TableRow>
                <AlertDialogContent className='max-[550px]:max-w-[90%]'>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      {(session?.accountType === 'ADMIN' || session?.accountType === 'BARBER') &&
                        'Horário de Almoço'}
                      {paymentMethod === 'CASH' &&
                        (session?.accountType === 'USER' || !session) &&
                        'Pagamento em Dinheiro'}
                      {paymentMethod !== 'CASH' &&
                        (session?.accountType === 'USER' || !session) &&
                        'Confirmar Agendamento'}
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      {(session?.accountType === 'ADMIN' || session?.accountType === 'BARBER') &&
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
                    {(session?.accountType === 'ADMIN' || session?.accountType === 'BARBER') && (
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
