import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import { CreateAppointment, createAppointment } from '@/services/CreateAppointment';
import { formatDateGetHour, formatDateShort } from '@/utils/date';
import { createPaymentLink } from '@/services/CreatePaymentLink';
import { useRouter, useSearchParams } from 'next/navigation';
import { Employee, User } from '@/lib/schemas';
import { useState } from 'react';
import { toast } from 'sonner';

export const useBarberShopActions = (barbers: User[]) => {
  const [isPaymentActive, setIsPaymentActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const searchParams = useSearchParams();
  const { refresh } = useRouter();

  const paymentMethod = validatePaymentMethod(searchParams.get('payment'), 'CARD');
  const scheduleDate = validateDate(searchParams.get('date'), String(new Date()));
  const validEmployees = barbers.map(({ name }) => name);
  const scheduleEmployee = validateEmployee(searchParams.get('employee'), validEmployees, validEmployees[0]);

  const selectedEmployee = barbers.find((employee): employee is Employee => {
    return (
      (employee.accountType === 'EMPLOYEE' || employee.accountType === 'ADMIN') &&
      employee.name === scheduleEmployee
    );
  });

  const getCurrentSchedule = (hour: number) => {
    return new Date(
      new Date(scheduleDate).getFullYear(),
      new Date(scheduleDate).getMonth(),
      new Date(scheduleDate).getDate(),
      hour,
    );
  };

  const getEmployeeCurrentHourSchedule = (hour: number) => {
    return selectedEmployee?.schedules?.find(({ scheduleDate }) => {
      return scheduleDate.getTime() === getCurrentSchedule(hour).getTime();
    });
  };

  const handleCreateAppointment = async (params: CreateAppointment) => {
    const appointment =
      params.type === 'REGULAR'
        ? {
            type: params.type,
            status: params.status,
            userId: params.userId,
            haircutId: params.haircutId,
            employeeId: params.employeeId,
            paymentMethod: params.paymentMethod,
            appointmentDate: params.appointmentDate,
          }
        : {
            cpf: params.cpf,
            name: params.name,
            type: params.type,
            phone: params.phone,
            status: params.status,
            haircutId: params.haircutId,
            employeeId: params.employeeId,
            paymentMethod: params.paymentMethod,
            appointmentDate: params.appointmentDate,
          };

    const appointmentData = await createAppointment(appointment);
    if (appointmentData.status === 'error') return toast.error(appointmentData.message);

    const paymentLinkResponse = await createPaymentLink(appointmentData.data);
    if (paymentLinkResponse.status === 'error') return toast.error(paymentLinkResponse.message);

    toast.success(
      `${appointmentData.message} para ${formatDateShort(String(appointment.appointmentDate))} às ${formatDateGetHour(String(appointment.appointmentDate))}h.`,
      { duration: 10000 },
    );

    setPaymentUrl('response.paymentLink'); //Mudar para o link
    setIsPaymentActive(true);
    setIsFormActive(false);
    refresh();
  };

  return {
    paymentUrl,
    scheduleDate,
    isFormActive,
    paymentMethod,
    isPaymentActive,
    selectedEmployee,
    scheduleEmployee,
    setIsFormActive,
    setIsPaymentActive,
    getCurrentSchedule,
    handleCreateAppointment,
    getEmployeeCurrentHourSchedule,
  };
};
