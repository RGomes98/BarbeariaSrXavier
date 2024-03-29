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
          <div className='flex flex-col gap-1'>
            <h1 className='w-full font-raleway text-4xl font-medium max-md:text-3xl'>Barbearia Clássica</h1>
            <p className='text-base  font-light max-md:text-sm'>
              Cortes Tradicionais e Atendimento Personalizado
            </p>
          </div>
          <SearchBar />
        </div>
        <HaircutGrid haircuts={haircuts} />
      </div>
      <Footer />
    </Fragment>
  );
}
