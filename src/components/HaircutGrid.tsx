'use client';

import { usePagination } from '@/hooks/usePagination';
import { formatToCurrency } from '@/utils/number';
import { useMounted } from '@/hooks/useMounted';
import { Card } from '@/components/ui/card';
import { useState, Fragment, useEffect } from 'react';
import { haircuts } from '@/mock/haircuts';
import { useStore } from '@/store';

import Image from 'next/image';
import Link from 'next/link';
import { getHairCuts } from '@/services/GetHairCuts';
import { Haircut } from '@/mock/users';

export const HaircutGrid = () => {
  const [data, setData] = useState<Haircut[] | undefined>(haircuts);
  const search = useStore().searchBar;

  useEffect(() => {
    const currentHaircuts = getHairCuts();
    currentHaircuts.then((res) => setData(res));

  }, [search]);

  const filteredData = data.filter(({ name }) => {
    return search.trim().length ? name.toLowerCase().includes(search.toLowerCase()) : name === name;
  });

  const { PaginationSection, CURRENT_PAGE_ITEMS } = usePagination(filteredData);
  const { isMounted } = useMounted();

  return (
    <Fragment>
      {PaginationSection}
      {isMounted && (
        <div className='grid w-full grid-flow-row grid-cols-4 gap-10 py-6 max-xl:grid-cols-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
          {CURRENT_PAGE_ITEMS.length === 0 && <span>Nenhum corte encontrado.</span>}
          {CURRENT_PAGE_ITEMS.map(({ id, name, photoUri, price }, index) => {
            return (
              <Card key={index} className='flex w-full select-none items-start overflow-hidden'>
                <Link href={`corte/${id}`} className='flex w-full transform flex-col gap-4 pb-4'>
                  <div className='relative h-80 w-full rounded-sm'>
                    <Image fill quality={100} src={photoUri[0]} alt='haircut-image' className='object-cover' />
                  </div>
                  <div className='flex items-center justify-between px-4'>
                    <span className='text-xl font-normal'>{name}</span>
                    <span className='font-bold'>{formatToCurrency(price)}</span>
                  </div>
                </Link>
              </Card>
            );
          })}
        </div>
      )}
      {PaginationSection}
    </Fragment>
  );
};
