import { PaymentMethodPicker } from './PaymentMethodPicker';
import { EmployeePicker } from './EmployeePicker';
import { DatePicker } from './DatePicker';
import { User } from '@/lib/schemas';

export const HaircutOptions = ({ employees }: { employees: User[] }) => {
  return (
    <div className='flex justify-between gap-6 align-middle max-md:flex-wrap'>
      <DatePicker />
      <PaymentMethodPicker />
      <EmployeePicker employees={employees} />
    </div>
  );
};
