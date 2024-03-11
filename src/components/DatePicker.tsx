import { createDateInputQueryString, createQueryString } from '@/helpers/createQueryString';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { formatToDateTime, isNotWithinThirtyDaysRange } from '@/utils/date';
import { validateDate } from '@/helpers/validateSearchParams';
import { CalendarIcon } from '@radix-ui/react-icons';
import { Calendar } from '@/components/ui/calendar';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ptBR } from 'date-fns/locale';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

export const DatePicker = () => {
  const searchParams = useSearchParams();
  const date = validateDate(searchParams.get('date'), new Date());

  return (
    <div className='flex w-[200px] flex-col gap-2 max-[1350px]:w-[33%] max-md:w-full'>
      <span>Data do Agendamento</span>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant={'outline'} className={cn('justify-start text-left font-normal')}>
            <CalendarIcon className='mr-2 h-4 w-4' />
            {format(date, 'PPP', { locale: ptBR })}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={date}
            disabled={(date) => isNotWithinThirtyDaysRange(date)}
            onSelect={(date) =>
              createDateInputQueryString({ dateInput: formatToDateTime(date), searchParams })
            }
            initialFocus
            locale={ptBR}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
