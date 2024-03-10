import { NavigationMenu } from '@/components/NavigationMenu';
import { HaircutGrid } from '@/components/HaircutGrid';
import { ThemeButton } from '@/components/ThemeButton';
import { getHaircuts } from '@/services/GetHairCuts';
import { SearchBar } from '@/components/SearchBar';
import { Navbar } from '@/components/Navbar';
import { Logo } from '@/components/Logo';
import { Fragment } from 'react';

export default async function Home() {
  const haircuts = await getHaircuts();

  return (
    <Fragment>
      <Navbar>
        <Logo className='text-base' />
        <NavigationMenu />
        <ThemeButton />
      </Navbar>
      <div className='flex flex-col items-start px-16 pb-20 pt-12 max-md:px-6 max-md:pb-12 max-md:pt-8'>
        <div className='mb-6 flex w-full justify-between gap-6 max-md:mb-4 max-sm:flex-col'>
          <h1 className='text-4xl font-semibold max-md:text-3xl'>Cortes</h1>
          <SearchBar />
        </div>
        <HaircutGrid haircuts={haircuts} />
      </div>
    </Fragment>
  );
}
