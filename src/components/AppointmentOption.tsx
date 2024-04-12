import { formatDateGetWeekAndDay, formatDateGetHour, formatDateShort, formatDateGetDay } from '@/utils/date';
import { handleReCaptchaVerifyResponse } from '@/helpers/handleReCaptchaVerifyResponse';
import { Haircut, ScheduleForm as ScheduleFormType, User } from '@/lib/schemas';
import { formatScheduleStatus, getScheduleStatusColor } from '@/utils/caption';
import { createAppointment } from '@/services/client-side/createAppointment';
import { useBarberShopActions } from '@/hooks/useBarberShopActions';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { TableCell, TableRow } from '@/components/ui/table';
import { type Session } from '@/helpers/getSession';
import { AppointmentForm } from './AppointmentForm';
import { useMounted } from '@/hooks/useMounted';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';
import { toast } from 'sonner';

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

export const AppointmentOption = ({
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
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { isMounted } = useMounted();
  const { push } = useRouter();

  const {
    dateParam,
    paymentParam,
    scheduleDate,
    isFormActive,
    paymentMethod,
    employeeParam,
    appointmentData,
    isPaymentActive,
    scheduleEmployee,
    selectedEmployee,
    setIsFormActive,
    getCurrentSchedule,
    setIsPaymentActive,
    setAppointmentData,
    handleCreateAppointmentLink,
    getEmployeeCurrentHourSchedule,
  } = useBarberShopActions(employees, haircut);

  const isScheduleNotActive = hour < new Date().getHours() && new Date() >= new Date(scheduleDate);
  const currentHourSchedule = getEmployeeCurrentHourSchedule(hour);
  const isEmployeeBusy =
    currentHourSchedule?.status !== 'CANCELED' && currentHourSchedule?.status !== undefined;

  const handleScheduleHaircut = async () => {
    if (!session || !selectedEmployee || isEmployeeBusy || isScheduleNotActive) return;

    const appointmentLink = await handleCreateAppointmentLink(haircut.id, paymentMethod);
    if (appointmentLink.status === 'error') return toast.error(appointmentLink.message);

    toast.success(appointmentLink.message);

    setAppointmentData({
      paymentMethod,
      isDone: false,
      type: 'REGULAR',
      status: 'PENDING',
      userId: session.id,
      haircutId: haircut.id,
      employeeId: selectedEmployee.id,
      appointmentDate: getCurrentSchedule(hour),
      paymentLink: appointmentLink.data.paymentLink,
      appointmentId: appointmentLink.data.appointmenId,
    });
  };

  const handleScheduleBreak = async () => {
    if (!session || !selectedEmployee || isEmployeeBusy || isScheduleNotActive) return;

    const appointmentLink = await handleCreateAppointmentLink(haircut.id, paymentMethod);
    if (appointmentLink.status === 'error') return toast.error(appointmentLink.message);

    toast.success(appointmentLink.message);

    setAppointmentData({
      paymentMethod,
      isDone: false,
      type: 'REGULAR',
      status: 'BREAK',
      userId: session.id,
      haircutId: haircut.id,
      employeeId: selectedEmployee.id,
      appointmentDate: getCurrentSchedule(hour),
      paymentLink: appointmentLink.data.paymentLink,
      appointmentId: appointmentLink.data.appointmenId,
    });
  };

  const handleScheduleHaircutSessionless = async (formData: ScheduleFormType) => {
    if (!executeRecaptcha || !selectedEmployee || isEmployeeBusy || isScheduleNotActive) return;
    const { cpf, name, phone } = formData;

    const reCaptchaToken = await executeRecaptcha('createSessionlessAppointment');
    const { isHuman, message } = await handleReCaptchaVerifyResponse(reCaptchaToken);
    if (!isHuman) return toast.error(message);

    const appointmentLink = await handleCreateAppointmentLink(haircut.id, paymentMethod);
    if (appointmentLink.status === 'error') return toast.error(appointmentLink.message);

    toast.success(appointmentLink.message);

    setAppointmentData({
      cpf,
      name,
      phone,
      paymentMethod,
      isDone: false,
      status: 'PENDING',
      type: 'SESSIONLESS',
      haircutId: haircut.id,
      employeeId: selectedEmployee.id,
      appointmentDate: getCurrentSchedule(hour),
      paymentLink: appointmentLink.data.paymentLink,
      appointmentId: appointmentLink.data.appointmenId,
    });
  };

  const handleShowModal = () => {
    if (!dateParam || !paymentParam || !employeeParam) {
      toast.error('Para completar o agendamento, selecione o profissional, a data e o método de pagamento.');
      return;
    }

    setIsFormActive(true);
  };

  const handleCreateAppointment = async () => {
    if (!appointmentData) return;

    const appointmentResponse = await createAppointment(appointmentData);
    if (appointmentResponse.status === 'error') return toast.error(appointmentResponse.message);

    toast.success(appointmentResponse.message);
    setTimeout(() => push(appointmentData.paymentLink), 3000);
  };

  return (
    <Fragment>
      <AlertDialog open={isFormActive}>
        <TableRow
          className={`relative cursor-pointer hover:border-t hover:brightness-110 max-sm:text-xs hover:${getScheduleStatusColor(!isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')} ${getScheduleStatusColor(!isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')}`}
        >
          <TableCell className='max-sm:py-2.5'>
            {formatDateGetHour(String(getCurrentSchedule(hour)))}h
          </TableCell>
          <TableCell className='max-md:hidden'>
            {formatDateGetWeekAndDay(String(getCurrentSchedule(hour)))}
          </TableCell>
          <TableCell className='md:hidden'>{formatDateGetDay(String(getCurrentSchedule(hour)))}</TableCell>
          <TableCell className='font-medium max-md:hidden'>
            {formatScheduleStatus('long', !isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')}
          </TableCell>
          <TableCell className='font-medium md:hidden'>
            {formatScheduleStatus('short', !isScheduleNotActive ? currentHourSchedule?.status : 'DISABLED')}
          </TableCell>
          <TableCell className='text-right'>{scheduleEmployee}</TableCell>
          {(!isEmployeeBusy || !isScheduleNotActive) && isMounted && (
            <AlertDialogTrigger onClick={handleShowModal} className='absolute inset-0 h-full w-full' />
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
                `Tem certeza de que deseja definir o horário ${formatDateShort(String(getCurrentSchedule(hour)))} às ${formatDateGetHour(String(getCurrentSchedule(hour)))}h como o seu horário de almoço?`}
              {paymentMethod === 'CASH' &&
                (session?.accountType === 'USER' || !session) &&
                `Tem certeza de que deseja pagar pelo agendamento com dinheiro no momento da visita para o horário ${formatDateShort(String(getCurrentSchedule(hour)))} às ${formatDateGetHour(String(getCurrentSchedule(hour)))}h?`}
              {paymentMethod !== 'CASH' &&
                (session?.accountType === 'USER' || !session) &&
                `Tem certeza de que deseja confirmar o agendamento para o horário ${formatDateShort(String(getCurrentSchedule(hour)))} às ${formatDateGetHour(String(getCurrentSchedule(hour)))}h?`}
              {!session && (
                <AppointmentForm handleScheduleHaircutSessionless={handleScheduleHaircutSessionless} />
              )}
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
      <AlertDialog open={isPaymentActive}>
        <AlertDialogContent className='max-[550px]:max-w-[90%]'>
          <AlertDialogHeader>
            <AlertDialogTitle>Finalizar Reserva</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            Estamos quase prontos! Agora, basta prosseguir com o pagamento para finalizar sua reserva.
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsPaymentActive(false)}>Cancelar Reserva</AlertDialogCancel>
            <AlertDialogAction onClick={handleCreateAppointment}>Efetuar Pagamento</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Fragment>
  );
};
