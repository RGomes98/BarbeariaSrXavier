import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import { CreateAppointment, createAppointment } from '@/services/CreateAppointment';
import { formatDateGetHour, formatDateShort } from '@/utils/date';
import { useRouter, useSearchParams } from 'next/navigation';
import { Employee, User } from '@/lib/schemas';
import { useState } from 'react';
import { toast } from 'sonner';

export const useBarberShopActions = (barbers: User[]) => {
  const [isFormActive, setIsFormActive] = useState(false);
  const searchParams = useSearchParams();
  const { refresh } = useRouter();

  const paymentMethod = validatePaymentMethod(searchParams.get('payment'), 'CARD');
  const scheduleDate = validateDate(searchParams.get('date'), new Date());
  const validEmployees = barbers.map(({ name }) => name);

  const scheduleEmployee = validateEmployee(searchParams.get('employee'), validEmployees, validEmployees[0]);
  const employee = barbers.find(
    (employee): employee is Employee =>
      employee.accountType === 'EMPLOYEE' && employee.name === scheduleEmployee,
  );

  const getCurrentSchedule = (hour: number) => {
    return new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate(), hour);
  };

  const getEmployeeCurrentHourSchedule = (hour: number) => {
    return employee?.schedules?.find(({ scheduleDate }) => {
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

    const response = await createAppointment(appointment);

    if (response.status === 'error') {
      setIsFormActive(false);
      toast.error(response.message);
    }

    if (response.status === 'success') {
      refresh();
      setIsFormActive(false);
      toast.success(
        `${response.message} para ${formatDateShort(scheduleDate)} às ${formatDateGetHour(scheduleDate)}h.`,
        { duration: 10000 },
      );
    }
  };

  return {
    employee,
    isFormActive,
    scheduleDate,
    paymentMethod,
    setIsFormActive,
    scheduleEmployee,
    getCurrentSchedule,
    handleCreateAppointment,
    getEmployeeCurrentHourSchedule,
  };
};
