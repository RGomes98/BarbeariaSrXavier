import { getHaircutWithRedirect } from '@/services/GetHairCuts';
import { HaircutCarousel } from '@/components/HaircutCarousel';
import { HaircutTable } from '@/components/HaircutTable';
import { getEmployees } from '@/services/getEmployees';
import { getSession } from '@/helpers/getSession';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Fragment } from 'react';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const [haircut, employees, session] = await Promise.all([
    getHaircutWithRedirect(Number(id)),
    getEmployees(),
    getSession(),
  ]);

  haircut.photoUri.push(haircut.photoUri[0]);
  haircut.photoUri.push(haircut.photoUri[0]);

  return (
    <Fragment>
      <Navbar />
      <div className='grid grid-cols-2 justify-items-center gap-20 px-20 pb-20 pt-14 max-2xl:px-8 max-[1350px]:grid-cols-1 max-[1350px]:justify-items-start max-md:gap-6 max-md:px-6 max-md:pb-14 max-md:pt-10'>
        <HaircutCarousel haircut={haircut} />
        <HaircutTable haircut={haircut} session={session} employees={employees} />
      </div>
      <Footer />
    </Fragment>
  );
}
