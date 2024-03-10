import { BarberSelectMenu } from '@/components/BarberSelectMenu';
import { BarberSchedules } from '@/components/BarberSchedules';
import { getHaircut } from '@/services/GetHairCuts';
import { getSession } from '@/helpers/getSession';
import { Fragment } from 'react';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const haircut = await getHaircut(Number(id));
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
