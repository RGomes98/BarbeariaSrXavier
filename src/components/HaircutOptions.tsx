'use client';

import { PaymentMethodPicker } from './PaymentMethodPicker';
import type { PaymentMethod } from '@/mock/users';
import { EmployeePicker } from './EmployeePicker';
import { DatePicker } from './DatePicker';

export const HaircutOptions = () => {
  const paymentMethods = ['PIX', 'CASH', 'CARD'] as PaymentMethod[];
  const employees = ['Barber1', 'Barber2'];

  return (
    <div className='flex justify-between gap-6 align-middle max-md:flex-wrap'>
      <DatePicker />
      <PaymentMethodPicker paymentMethods={paymentMethods} />
      <EmployeePicker employees={employees} />
    </div>
  );
};
