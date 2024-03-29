import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createDateInputQueryString, createSelectInputQueryString } from '@/helpers/createQueryString';
import { formatDateGetDayAndYear, formatToDateTime, isNotWithinThirtyDaysRange } from '@/utils/date';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { validateDate, validateStatus } from '@/helpers/validateSearchParams';
import { formatScheduleCaption } from '@/utils/caption';
import { useSearchParams } from 'next/navigation';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from './ui/calendar';
import { statuses } from '@/lib/schemas';
import { ptBR } from 'date-fns/locale';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export const AppointmentsTableFilters = () => {
  const searchParams = useSearchParams();
  const date = validateDate(searchParams.get('date'), String(new Date()));
  const status = validateStatus(searchParams.get('status'), 'PENDING');

  const statusPlaceholder = searchParams.get('status') ? formatScheduleCaption(status) : 'Selecionar Status';
  const datePlaceholder = searchParams.get('date') ? formatDateGetDayAndYear(date) : 'Selecionar Data';

  return (
    <div className='flex gap-2 max-[865px]:w-full max-sm:flex-col'>
      <div className='flex w-[200px] flex-col gap-2 max-[865px]:w-[50%] max-md:w-full'>
        <Select
          onValueChange={(status) =>
            createSelectInputQueryString({ inputKey: 'status', selectInput: status, searchParams })
          }
        >
          <SelectTrigger>
            <SelectValue placeholder={statusPlaceholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {statuses.map((status) => {
                return (
                  <SelectItem key={status} value={status}>
                    {formatScheduleCaption(status)}
                  </SelectItem>
                );
              })}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='flex w-[220px] flex-col gap-2  max-[865px]:w-[50%] max-md:w-full'>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className={cn('justify-start text-left font-normal')}>
              <CalendarIcon className='mr-2 h-4 w-4' />
              {datePlaceholder}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-auto p-0' align='start'>
            <Calendar
              mode='single'
              initialFocus
              locale={ptBR}
              selected={new Date(date)}
              disabled={(date) => isNotWithinThirtyDaysRange(date)}
              onSelect={(date) =>
                createDateInputQueryString({ dateInput: formatToDateTime(date), searchParams })
              }
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
