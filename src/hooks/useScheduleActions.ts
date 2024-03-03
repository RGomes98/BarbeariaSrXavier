import { Session } from '@/helpers/getSession';
import { validateDate, validateEmployee } from '@/helpers/validateSearchParams';
import { Employee, Status } from '@/mock/users';
import { useStore } from '@/store';
import { useSearchParams } from 'next/navigation';

export const useScheduleActions = (session: Session) => {
  const updateDatabase = useStore().updateDatabase;
  const searchParams = useSearchParams();
  const database = useStore().database;

  const scheduleEmployee = validateEmployee(searchParams.get('employee'), '');
  const scheduleDate = validateDate(searchParams.get('date'), new Date());

  const filterAllSchedules = () => {
    return database
      .filter(
        (employee): employee is Employee =>
          employee.role === 'EMPLOYEE' && employee.name === (scheduleEmployee || employee.name),
      )
      .reduce<Employee['schedules']>((arr, { schedules }) => {
        arr.push(...schedules.filter(({ date }) => date.getDate() === scheduleDate.getDate()));
        return arr;
      }, []);
  };

  const updateScheduleStatus = (status: Status, scheduleId: string) => {
    const schedule = database
      .find((employee): employee is Employee => employee.cpf === session?.id)
      ?.schedules.find(({ id }) => id === scheduleId);

    if (!schedule) return;

    switch (status) {
      case 'PAID':
        schedule.status = 'PAID';
        break;
      case 'CANCELED':
        schedule.status = 'CANCELED';
        break;
      case 'CONFIRMED':
        schedule.status = 'CONFIRMED';
        break;
    }

    updateDatabase(database);
  };

  const getSchedule = (scheduleId: string) => {
    return database
      .find((employee): employee is Employee => employee.cpf === session?.id)
      ?.schedules.find(({ id }) => id === scheduleId);
  };

  const getSchedules = () => {
    if (session?.role === 'USER') {
      return database
        .filter((employee): employee is Employee => employee.role === 'EMPLOYEE')
        .reduce<Employee['schedules']>((arr, { schedules }) => {
          arr.push(...schedules.filter(({ clientId }) => clientId === session.id));
          return arr;
        }, []);
    }

    if (session?.role === 'EMPLOYEE') {
      return database.find((employee): employee is Employee => {
        return employee.cpf === session.id && employee.role === 'EMPLOYEE';
      })?.schedules;
    }
  };

  return {
    searchParams,
    scheduleDate,
    scheduleEmployee,
    getSchedule,
    getSchedules,
    updateScheduleStatus,
    filterAllSchedules,
  };
};
