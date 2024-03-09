import { BarberSelectMenu } from '@/components/BarberSelectMenu';
import { BarberSchedules } from '@/components/BarberSchedules';
import { getSession } from '@/helpers/getSession';
import { haircuts } from '@/mock/haircuts';
import { redirect } from 'next/navigation';
import { Fragment } from 'react';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const haircut = haircuts.find((haircurt) => haircurt.id === id);
  if (!haircut) redirect('/');

  const session = await getSession();

  return (
    <Fragment>
      <h1>{haircut.name}</h1>
      <p>descrição: {haircut.description}</p>
      <p>preço: {haircut.price}</p>
      <BarberSelectMenu />
      <BarberSchedules haircut={haircut} session={session} />
    </Fragment>
  );
}
