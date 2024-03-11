import { createSelectInputQueryString } from '@/helpers/createQueryString';
import { validateEmployee } from '@/helpers/validateSearchParams';
import { useSearchParams } from 'next/navigation';
import { Employee } from '@/mock/users';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const EmployeePicker = ({ employees }: { employees: Employee['name'][] }) => {
  const searchParams = useSearchParams();
  const paymentMethod = validateEmployee(searchParams.get('employee'), 'Barber1');

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
            {employees.map((employeeOption) => {
              return (
                <SelectItem key={employeeOption} value={employeeOption}>
                  {employeeOption}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
