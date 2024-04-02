import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import { CreateAppointment, createAppointment } from '@/services/CreateAppointment';
import { Employee, Haircut, PaymentMethod, User } from '@/lib/schemas';
import { formatDateGetHour, formatDateShort } from '@/utils/date';
import { createPaymentLink } from '@/services/CreatePaymentLink';
import { useRouter, useSearchParams } from 'next/navigation';
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

  const employee = barbers.find((employee): employee is Employee => {
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
    return employee?.schedules?.find(({ scheduleDate }) => {
      return scheduleDate.getTime() === getCurrentSchedule(hour).getTime();
    });
  };

  const makePayment = async (paymentType: PaymentMethod, hairCut: Haircut) => {
    const response = await createPaymentLink(paymentType, hairCut);
    if (response.status === 'error') return toast.error(response.message);
    setPaymentUrl(response.paymentLink);
    setIsPaymentActive(true);
    setIsFormActive(false);
  };

  const checkIsPaid = async (paymentType: PaymentMethod, hairCut: Haircut) => {
    const response = await createPaymentLink(paymentType, hairCut);
    console.log(response);
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

    const response = await createAppointment(appointment);

    if (response.status === 'error') {
      setIsFormActive(false);
      toast.error(response.message);
    }

    if (response.status === 'success') {
      refresh();
      setIsFormActive(false);
      toast.success(
        `${response.message} para ${formatDateShort(String(appointment.appointmentDate))} às ${formatDateGetHour(String(appointment.appointmentDate))}h.`,
        { duration: 10000 },
      );
    }
  };

  return {
    employee,
    isFormActive,
    isPaymentActive,
    scheduleDate,
    paymentMethod,
    makePayment,
    paymentUrl,
    setIsFormActive,
    setIsPaymentActive,
    checkIsPaid,
    scheduleEmployee,
    getCurrentSchedule,
    handleCreateAppointment,
    getEmployeeCurrentHourSchedule,
  };
};
