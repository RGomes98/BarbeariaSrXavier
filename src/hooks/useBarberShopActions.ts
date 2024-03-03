import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Employee, Haircut } from '@/mock/users';
import type { Session } from '@/helpers/getSession';
import { useStore } from '@/store';

export const useBarberShopActions = () => {
  const updateDatabase = useStore().updateDatabase;
  const database = useStore().database;
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const scheduleEmployee = validateEmployee(searchParams.get('employee'), 'Barber1');
  const paymentMethod = validatePaymentMethod(searchParams.get('payment'), 'card');
  const scheduleDate = validateDate(searchParams.get('date'), new Date());

  const employee = database.find((employee): employee is Employee => {
    return employee.name === scheduleEmployee && employee.role === 'EMPLOYEE';
  });

  const getCurrentSchedule = (hour: number) => {
    return new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate(), hour);
  };

  const scheduleHaircut = (session: Session, haircut: Haircut, scheduleHour: Date) => {
    if (!session) return push('/entrar');

    employee?.schedules.push({
      haircut: haircut,
      status: 'PENDING',
      date: scheduleHour,
      clientId: session.id,
      id: crypto.randomUUID(),
      employeeId: employee.cpf,
      paymentMethod: paymentMethod,
    });

    push('/agendamentos');
    updateDatabase(database);
  };

  return { employee, scheduleDate, paymentMethod, scheduleHaircut, getCurrentSchedule };
};
