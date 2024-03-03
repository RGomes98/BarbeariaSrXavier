'use client';

import { createQueryString } from '@/helpers/createQueryString';
import { validateDate } from '@/helpers/validateSearchParams';
import { useSearchParams } from 'next/navigation';
import { formatToDateTime } from '@/utils/date';

import Link from 'next/link';

export const BarberSelectMenu = () => {
  const searchParams = useSearchParams();
  const date = validateDate(searchParams.get('date'), new Date());

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const date = `${event.target.value} GMT-3`;
    const queryString = `?${createQueryString({ searchParams, key: 'date', value: date })}`;
    window.history.pushState(null, '', queryString);
  };

  return (
    <div className='flex gap-4 px-4'>
      <input onChange={handleDateChange} value={formatToDateTime(date)} type='date' />
      <Link
        className='bg-slate-500 p-2 text-white'
        href={`?${createQueryString({ searchParams, key: 'employee', value: 'Barber1' })}`}
      >
        Barber 1
      </Link>
      <Link
        className='bg-slate-500 p-2 text-white'
        href={`?${createQueryString({ searchParams, key: 'employee', value: 'Barber2' })}`}
      >
        Barber 2
      </Link>
      <div className='flex gap-4 px-4'>
        <Link
          className='bg-slate-500 p-2 text-white'
          href={`?${createQueryString({ searchParams, key: 'payment', value: 'pix' })}`}
        >
          PIX
        </Link>
        <Link
          className='bg-slate-500 p-2 text-white'
          href={`?${createQueryString({ searchParams, key: 'payment', value: 'card' })}`}
        >
          Cartão de credito
        </Link>
        <Link
          className='bg-slate-500 p-2 text-white'
          href={`?${createQueryString({ searchParams, key: 'payment', value: 'cash' })}`}
        >
          Dinheiro
        </Link>
      </div>
    </div>
  );
};
