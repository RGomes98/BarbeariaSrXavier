import { HaircutGrid } from '@/components/HaircutGrid';
import { getHaircuts } from '@/services/GetHairCuts';
import { SearchBar } from '@/components/SearchBar';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Fragment } from 'react';

export default async function Home() {
  const haircuts = await getHaircuts();

  return (
    <Fragment>
      <Navbar />
      <div className='flex flex-col items-start px-28 pb-20 pt-12 max-xl:px-20 max-md:px-6 max-md:pb-12 max-md:pt-8'>
        <div className='mb-6 flex w-full justify-between gap-6 max-md:mb-4 max-sm:flex-col'>
          <h1 className='font-raleway text-4xl font-semibold uppercase max-md:text-3xl max-sm:order-1'>
            Cortes
          </h1>
          <SearchBar />
        </div>
        <HaircutGrid haircuts={haircuts} />
      </div>
      <Footer />
    </Fragment>
  );
}
