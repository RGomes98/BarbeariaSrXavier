import { createSelectInputQueryString } from '@/helpers/createQueryString';
import { validateEmployee } from '@/helpers/validateSearchParams';
import { useSearchParams } from 'next/navigation';
import { Barber, Test } from '@/lib/schemas';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const EmployeePicker = ({ barbers }: { barbers: Test }) => {
  const searchParams = useSearchParams();
  const validEmployees = barbers.map(({ name }) => name);
  const paymentMethod = validateEmployee(searchParams.get('employee'), validEmployees, validEmployees[0]);

  return (
    <div className='flex w-[190px] flex-col gap-2 max-[1350px]:w-[33%] max-md:w-full'>
      <span>Escolha do Profissional</span>
      <Select
        onValueChange={(employeeOption) =>
          createSelectInputQueryString({ inputKey: 'employee', selectInput: employeeOption, searchParams })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={paymentMethod} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {barbers.map((employeeOption) => {
              return (
                <SelectItem key={employeeOption.name} value={employeeOption.name}>
                  {employeeOption.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
