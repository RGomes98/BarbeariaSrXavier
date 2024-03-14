import { HaircutCarousel } from '@/components/HaircutCarousel';
import { HaircutSchedules } from '@/components/HaircutSchedules';
import { getEmployees } from '@/services/getEmployees';
import { getHaircut } from '@/services/GetHairCuts';
import { getSession } from '@/helpers/getSession';
import { Navbar } from '@/components/Navbar';
import { Fragment } from 'react';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const haircut = await getHaircut(Number(id));
  const employees = await getEmployees();
  const session = await getSession();

  haircut.photoUri.push(haircut.photoUri[0]);
  haircut.photoUri.push(haircut.photoUri[0]);

  return (
    <Fragment>
      <Navbar />
      <div className='grid grid-cols-2 justify-items-center gap-20 px-20 pb-16 pt-14 max-2xl:px-8 max-[1350px]:grid-cols-1 max-[1350px]:justify-items-start max-md:gap-6 max-md:px-6 max-md:pt-10'>
        <HaircutCarousel haircut={haircut} />
        <HaircutSchedules haircut={haircut} session={session} employees={employees} />
      </div>
    </Fragment>
  );
}
