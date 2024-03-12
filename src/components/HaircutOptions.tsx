import { PaymentMethodPicker } from './PaymentMethodPicker';
import { EmployeePicker } from './EmployeePicker';
import { DatePicker } from './DatePicker';
import { Barber } from '@/lib/schemas';

export const HaircutOptions = ({ barbers }: { barbers: Barber[] }) => {
  return (
    <div className='flex justify-between gap-6 align-middle max-md:flex-wrap'>
      <DatePicker />
      <PaymentMethodPicker />
      <EmployeePicker barbers={barbers} />
    </div>
  );
};
