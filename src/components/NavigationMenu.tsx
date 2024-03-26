import { NavigationButtons } from './NavigationButtons';
import { getSession } from '@/helpers/getSession';
import { MobileSideMenu } from './MobileSideMenu';
import { Fragment } from 'react';

export const NavigationMenu = async () => {
  const session = await getSession();

  return (
    <Fragment>
      <NavigationButtons session={session} />
      <MobileSideMenu session={session} />
    </Fragment>
  );
};
