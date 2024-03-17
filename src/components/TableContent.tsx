import { formatDateGetWeekAndDay, formatDateGetHour, formatDateShort, formatDateGetDay } from '@/utils/date';
import { Haircut, ScheduleForm as ScheduleFormType, User } from '@/lib/schemas';
import { formatScheduleStatus, getScheduleStatusColor } from '@/utils/caption';
import { useBarberShopActions } from '@/hooks/useBarberShopActions';
import { TableCell, TableRow } from '@/components/ui/table';
import { type Session } from '@/helpers/getSession';
import { useMounted } from '@/hooks/useMounted';
import { ScheduleForm } from './ScheduleForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Fragment } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// const form = useForm<Login>({
//   resolver: zodResolver(LoginSchema),
//   defaultValues: { email: '', password: '' },
// });
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
    isPaymentActive,
    paymentMethod,
    makePayment,
    setIsFormActive,
    setIsPaymentActive,
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

    setIsPaymentActive(true);
    setIsFormActive(false)
    makePayment(paymentMethod, haircut)

    // handleCreateAppointment({
    //   paymentMethod,
    //   type: 'REGULAR',
    //   status: 'PENDING',
    //   userId: session.id,
    //   haircutId: haircut.id,
    //   employeeId: employee.id,
    //   appointmentDate: getCurrentSchedule(hour),
    // });
  };

  const handleScheduleBreak = () => {
    if (!session || !employee || isEmployeeBusy || isScheduleNotActive) return;
    setIsPaymentActive(true);
    setIsFormActive(false)

    // handleCreateAppointment({
    //   paymentMethod,
    //   type: 'REGULAR',
    //   status: 'BREAK',
    //   userId: session.id,
    //   haircutId: haircut.id,
    //   employeeId: employee.id,
    //   appointmentDate: getCurrentSchedule(hour),
    // });
  };

  const handleScheduleHaircutSessionless = (formData: ScheduleFormType) => {
    if (!employee || isEmployeeBusy || isScheduleNotActive) return;
    const { cpf, name, phone } = formData;
    setIsPaymentActive(true);
    setIsFormActive(false)

    makePayment(paymentMethod, haircut)


    // handleCreateAppointment({
    //   cpf,
    //   name,
    //   phone,
    //   paymentMethod,
    //   status: 'PENDING',
    //   type: 'SESSIONLESS',
    //   haircutId: haircut.id,
    //   employeeId: employee.id,
    //   appointmentDate: getCurrentSchedule(hour),
    // });
  };

  return (
    <>
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
  
    {
    //alert payment 
    }            

    <AlertDialog  open={isPaymentActive}>
      <AlertDialogContent className='max-[550px]:max-w-[90%]'>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Fazer Pagamento
          </AlertDialogTitle>
       </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsPaymentActive(false)}>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleScheduleBreak}>
             Confirmar Pagamento
            </AlertDialogAction>
            {paymentMethod !== 'CARD' && (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                  <FormField
                    name='email'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormControl>
                          <Input {...field} placeholder='Email' type='email' />
                        </FormControl>
                        <FormMessage className='px-0.5 text-start' />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name='password'
                    control={form.control}
                    render={({ field }) => (
                      <FormItem className='space-y-1'>
                        <FormControl>
                          <Input {...field} placeholder='Senha' type='password' />
                        </FormControl>
                        <FormMessage className='px-0.5 text-start' />
                      </FormItem>
                    )}
                  />
                  <AlertDialogAction type='submit' className='mt-4 w-full font-medium'>
                    Entrar
                  </AlertDialogAction>
                </form>
              </Form>
            )}

        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  );
};
