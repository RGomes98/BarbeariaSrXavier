import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import { createAppointment } from '@/services/CreateAppointment';
import type { Haircut, Status } from '@/mock/users';
import { type Session } from '@/helpers/getSession';
import { useSearchParams } from 'next/navigation';
import { PayType } from '@/models/Appointment';
import { Timestamp } from 'firebase/firestore';
import { UserData } from '@/models/UserData';
import { Test } from '@/lib/schemas';

export const useBarberShopActions = (barbers: Test) => {
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
    return employee?.appointments.find(({ date }) => {
      const timeObj = new Timestamp(date.seconds, date.nanoseconds);
      return timeObj.toDate().getTime() === getCurrentSchedule(hour).getTime();
    });
  };

  const scheduleHaircut = (
    session: Session,
    haircut: Haircut,
    scheduleHour: Date,
    status: Status,
    userData: UserData,
  ) => {
    createAppointment(haircut, userData, PayType.PIX, scheduleHour, employee);
  };

  return {
    scheduleDate,
    paymentMethod,
    scheduleHaircut,
    scheduleEmployee,
    getCurrentSchedule,
    getEmployeeCurrentHourSchedule,
  };
};
