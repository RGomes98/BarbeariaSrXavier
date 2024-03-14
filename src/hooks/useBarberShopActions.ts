import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import { Employee, PaymentMethod, Status, User } from '@/lib/schemas';
import { createAppointment } from '@/services/CreateAppointment';
import { formatDateGetHour, formatDateShort } from '@/utils/date';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'sonner';

export const useBarberShopActions = (barbers: User[]) => {
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

  const handleCreateAppointment = async (
    haircutId: number,
    sessionId: string,
    employeeId: string,
    status: Status,
    paymentMethod: PaymentMethod,
    scheduleDate: Date,
  ) => {
    const schedule = await createAppointment(
      haircutId,
      sessionId,
      employeeId,
      status,
      paymentMethod,
      scheduleDate,
    );

    if (schedule.status === 'error') toast.error(schedule.message);
    toast.success(
      `${schedule.message} para ${formatDateShort(scheduleDate)} às ${formatDateGetHour(scheduleDate)}h.`,
      { duration: 10000 },
    );
    refresh();
  };

  return {
    employee,
    scheduleDate,
    paymentMethod,
    scheduleEmployee,
    getCurrentSchedule,
    handleCreateAppointment,
    getEmployeeCurrentHourSchedule,
  };
};
