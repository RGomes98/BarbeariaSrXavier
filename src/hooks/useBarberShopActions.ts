import { validateDate, validateEmployee, validatePaymentMethod } from '@/helpers/validateSearchParams';
import { useRouter, useSearchParams } from 'next/navigation';
import type { Employee, Haircut, Status } from '@/mock/users';
import { type Session } from '@/helpers/getSession';
import { useStore } from '@/store';
import { getBarbers } from '@/services/getBarbers';
import { useEffect, useState } from 'react';
import { AccountType, UserData } from '@/models/UserData';
import { createAppointment } from '@/services/CreateAppointment';
import { PayType } from '@/models/Appointment';

export const useBarberShopActions = () => {
  const [employee, setEmployee] = useState<Employee>();
  const updateDatabase = useStore().updateDatabase;
  const database = useStore().database;
  const searchParams = useSearchParams();
  const { push } = useRouter();

  const scheduleEmployee = validateEmployee(searchParams.get('employee'), '');
  const paymentMethod = validatePaymentMethod(searchParams.get('payment'), 'CARD');
  const scheduleDate = validateDate(searchParams.get('date'), new Date());

  useEffect(() => {
    getCurrentBarbers();
  }, []);

  async function getCurrentBarbers() {
    const barbers = await getBarbers();
    let emp = barbers.find((employee): employee is Employee => {
      return employee.name === scheduleEmployee && employee.role === 'EMPLOYEE';
    });
    setEmployee(emp);
  }

  const getCurrentSchedule = (hour: number) => {
    return new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate(), hour);
  };

  const getEmployeeCurrentHourSchedule = (hour: number) => {
    return employee?.schedules.find(({ date }) => {
      return date.getTime() === getCurrentSchedule(hour).getTime();
    });
  };

  const scheduleHaircut = (session: Session, haircut: Haircut, scheduleHour: Date, status: Status, userData : UserData) => {
    let id = ""
    if(session != null) id = session.id;
    employee?.schedules.push({
      clientId: id,
      status: status,
      haircut: haircut,
      date: scheduleHour,
      id: crypto.randomUUID(),
      employeeId: employee.cpf,
      paymentMethod: paymentMethod,
    });

    //push('/agendamentos');
    console.log(employee);
    //if(employee != undefined){
      createAppointment(employee, haircut, userData, PayType.PIX, scheduleHour);
    //}
    //updateDatabase(database);
  };


  return {
    employee,
    scheduleDate,
    paymentMethod,
    scheduleHaircut,
    getCurrentSchedule,
    getEmployeeCurrentHourSchedule,
  };
};
