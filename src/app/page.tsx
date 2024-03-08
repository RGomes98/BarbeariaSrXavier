'use client';

import { HaircutGrid } from '@/components/HaircutGrid';
import { Navbar } from '@/components/Navbar';
import { Input } from '@/components/ui/input';
import { Fragment, useState } from 'react';
import { Search } from 'lucide-react';

export default function Home() {
  const [search, setSearch] = useState('');

  return (
    <Fragment>
      <Navbar />
      <div className='flex flex-col items-start px-16 pb-20 pt-12 max-md:px-6 max-md:pb-12 max-md:pt-8'>
        <div className='mb-6 flex w-full justify-between gap-6 max-md:mb-4 max-sm:flex-col'>
          <h1 className='text-4xl font-semibold max-md:text-3xl'>Cortes</h1>
          <div className='relative flex max-w-96 items-center max-sm:max-w-full'>
            <Input
              onChange={(event) => setSearch(event.target.value)}
              placeholder='Pesquisar...'
              className='w-full'
            />
            <Search className='absolute right-3 size-5 opacity-70' />
          </div>
        </div>
        <HaircutGrid search={search} />
      </div>
    </Fragment>
  );
}
