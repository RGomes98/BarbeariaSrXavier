'use client';

import { createDateInputQueryString, createQueryString } from '@/helpers/createQueryString';
import { validateDate } from '@/helpers/validateSearchParams';
import { useSearchParams } from 'next/navigation';
import { formatToDateTime } from '@/utils/date';

import Link from 'next/link';

export const BarberSelectMenu = () => {
  const searchParams = useSearchParams();
  const date = validateDate(searchParams.get('date'), new Date());

  return (
    <div className='flex gap-4 px-4'>
      <input
        onChange={(event) => createDateInputQueryString({ event, searchParams })}
        value={formatToDateTime(date)}
        type='date'
      />
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
          href={`?${createQueryString({ searchParams, key: 'payment', value: 'PIX' })}`}
        >
          PIX
        </Link>
        <Link
          className='bg-slate-500 p-2 text-white'
          href={`?${createQueryString({ searchParams, key: 'payment', value: 'CARD' })}`}
        >
          Cartão de credito
        </Link>
        <Link
          className='bg-slate-500 p-2 text-white'
          href={`?${createQueryString({ searchParams, key: 'payment', value: 'CASH' })}`}
        >
          Dinheiro
        </Link>
      </div>
    </div>
  );
};
