import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import { CreateAppointment, createAppointment } from '@/services/CreateAppointment';
import { createPaymentLink } from '@/services/CreatePaymentLink';
import { useRouter, useSearchParams } from 'next/navigation';
import { Employee, PaymentMethod, User } from '@/lib/schemas';
import { getHaircut } from '@/services/GetHairCuts';
import { useState } from 'react';

export const useBarberShopActions = (barbers: User[]) => {
  const [appointmentData, setAppointmentData] = useState<CreateAppointment>();
  const [isPaymentActive, setIsPaymentActive] = useState(false);
  const [isFormActive, setIsFormActive] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const searchParams = useSearchParams();
  const { refresh } = useRouter();

  const scheduleDate = validateDate(searchParams.get('date'), String(new Date()), false);
  const paymentMethod = validatePaymentMethod(searchParams.get('payment'), 'CARD');
  const validEmployees = barbers.map(({ name }) => name);
  const scheduleEmployee = validateEmployee(searchParams.get('employee'), validEmployees, validEmployees[0]);

  const employeeParam = searchParams.get('employee') && scheduleEmployee;
  const paymentParam = searchParams.get('payment') && paymentMethod;
  const dateParam = searchParams.get('date') && scheduleDate;

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
      return new Date(scheduleDate).getTime() === getCurrentSchedule(hour).getTime();
    });
  };

  const handleCreateAppointmentLink = async (haircutId: number, paymentMethod: PaymentMethod) => {
    const haircut = await getHaircut(haircutId);
    const appointmentId = crypto.randomUUID();

    const paymentLinkResponse = await createPaymentLink({
      haircutId: haircut.id,
      haircutName: haircut.name,
      haircutPrice: haircut.price,
      paymentMethod: paymentMethod,
      appointmentId: appointmentId,
      haircutDescription: haircut.description,
    });

    if (paymentLinkResponse.status === 'error') {
      return { status: 'error', message: paymentLinkResponse.message, data: undefined } as const;
    }

    setPaymentUrl(paymentLinkResponse?.paymentLink);
    setIsPaymentActive(true);
    setIsFormActive(false);
    // refresh();

    return {
      status: 'success',
      message: 'Link de pagamento criado com sucesso!',
      data: { appointmenId: appointmentId, paymentLink: paymentLinkResponse.paymentLink } as const,
    } as const;
  };

  return {
    dateParam,
    paymentUrl,
    paymentParam,
    scheduleDate,
    isFormActive,
    employeeParam,
    paymentMethod,
    appointmentData,
    isPaymentActive,
    selectedEmployee,
    scheduleEmployee,
    setIsFormActive,
    setIsPaymentActive,
    getCurrentSchedule,
    setAppointmentData,
    handleCreateAppointmentLink,
    getEmployeeCurrentHourSchedule,
  };
};
