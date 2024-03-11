'use client';

import { PaymentMethodPicker } from './PaymentMethodPicker';
import type { PaymentMethod } from '@/mock/users';
import { EmployeePicker } from './EmployeePicker';
import { DatePicker } from './DatePicker';
import { useEffect, useState } from 'react';
import { getBarber, getBarbers } from '@/services/getBarbers';
import { UserData } from '@/models/UserData';

export const HaircutOptions = () => {
  const paymentMethods = ['PIX', 'CASH', 'CARD'] as PaymentMethod[];
  const [employees, setEmployees] = useState<string[]>([]);

  useEffect(() => {
    getCurrentBarbers()   
  }, []);

  async function getCurrentBarbers() {
    const barbers = await getBarbers();
    let arr = barbers.map((barber: UserData) => barber.name)
    setEmployees(arr)
  }

  return (
    <div className='flex justify-between gap-6 align-middle max-md:flex-wrap'>
      <DatePicker />
      <PaymentMethodPicker paymentMethods={paymentMethods} />
      <EmployeePicker employees={employees} />
    </div>
  );
};
