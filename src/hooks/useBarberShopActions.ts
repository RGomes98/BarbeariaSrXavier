import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import type { Haircut, Status } from '@/mock/users';
import { type Session } from '@/helpers/getSession';

import { useSearchParams } from 'next/navigation';
import { UserData } from '@/models/UserData';
import { Barber } from '@/lib/schemas';

export const useBarberShopActions = (barbers: Barber[]) => {
  const searchParams = useSearchParams();

  const paymentMethod = validatePaymentMethod(searchParams.get('payment'), 'CARD');
  const scheduleDate = validateDate(searchParams.get('date'), new Date());
  const validEmployees = barbers.map(({ name }) => name);
  const scheduleEmployee = validateEmployee(searchParams.get('employee'), validEmployees, validEmployees[0]);

  const employee = barbers.find(({ name }) => name === scheduleEmployee);

  const getCurrentSchedule = (hour: number) => {
    return new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate(), hour);
  };

  const getEmployeeCurrentHourSchedule = (hour: number) => {
    // return employee?.schedules.find(({ date }) => {
    //   return date.getTime() === getCurrentSchedule(hour).getTime();
    // });
  };

  const scheduleHaircut = (
    session: Session,
    haircut: Haircut,
    scheduleHour: Date,
    status: Status,
    userData: UserData,
  ) => {
    // createAppointment(employee, haircut, userData, PayType.PIX, scheduleHour);
  };

  return {
    scheduleDate,
    paymentMethod,
    scheduleHaircut,
    getCurrentSchedule,
    getEmployeeCurrentHourSchedule,
  };
};
