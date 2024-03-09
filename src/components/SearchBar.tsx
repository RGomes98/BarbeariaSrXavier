'use client';

import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { useStore } from '@/store';

export const SearchBar = () => {
  const setSearchBar = useStore().setSearchBar;

  return (
    <div className='relative flex max-w-96 items-center max-sm:max-w-full'>
      <Input
        onChange={(event) => setSearchBar(event.target.value)}
        placeholder='Pesquisar...'
        className='w-full'
      />
      <Search className='absolute right-3 size-5 opacity-70' />
    </div>
  );
};
