import { createSelectInputQueryString } from '@/helpers/createQueryString';
import { validateEmployee } from '@/helpers/validateSearchParams';
import { useSearchParams } from 'next/navigation';
import { User } from '@/lib/schemas';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const EmployeePicker = ({ employees }: { employees: User[] }) => {
  const searchParams = useSearchParams();
  const validEmployees = employees.map(({ name }) => name);
  const paymentMethod = validateEmployee(searchParams.get('employee'), validEmployees, validEmployees[0]);

  return (
    <div className='flex w-[190px] flex-col gap-2 max-[1350px]:w-[33%] max-md:w-full'>
      <span>Escolha do Profissional</span>
      <Select
        onValueChange={(employee) =>
          createSelectInputQueryString({ inputKey: 'employee', selectInput: employee, searchParams })
        }
      >
        <SelectTrigger>
          <SelectValue placeholder={paymentMethod} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {employees.map((employee) => {
              return (
                <SelectItem key={employee.name} value={employee.name}>
                  {employee.name}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
