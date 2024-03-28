import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatToDateTime, isNotWithinThirtyDaysRange } from '@/utils/date';
import { createDateInputQueryString } from '@/helpers/createQueryString';
import { validateDate } from '@/helpers/validateSearchParams';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ptBR } from 'date-fns/locale';
import { cn } from '@/lib/utils';

export const DatePicker = () => {
  const searchParams = useSearchParams();
  const date = validateDate(searchParams.get('date'), String(new Date()));

  return (
    <div className='flex w-full flex-col gap-2 max-md:w-full'>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant='outline' className={cn('justify-start text-left font-normal')}>
            <CalendarIcon className='mr-2 h-4 w-4' />
            Data do Agendamento
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
  );
};
