import { getSession } from '@/helpers/getSession';
import { MobileSideMenu } from './MobileSideMenu';
import { SignOutButton } from './SignOutButton';
import { Button } from './ui/button';
import { Fragment } from 'react';

import Link from 'next/link';

export const NavigationMenu = async () => {
  const session = await getSession();

  return (
    <Fragment>
      <div className='ml-auto flex items-center gap-2 max-md:hidden'>
        {session && (
          <Fragment>
            <SignOutButton />
            {session.accountType !== 'USER' && (
              <Button variant='ghost'>
                <Link href='/recebidos'>Recebidos</Link>
              </Button>
            )}
            <Button variant='ghost'>
              <Link href='/agendamentos'>Agendamentos</Link>
            </Button>
          </Fragment>
        )}
        {!session && (
          <Fragment>
            <Button variant='ghost'>
              <Link href='/entrar'>Entrar</Link>
            </Button>
            <Button variant='ghost'>
              <Link href='/registrar'>Criar conta</Link>
            </Button>
          </Fragment>
        )}
      </div>
      <MobileSideMenu session={session} />
    </Fragment>
  );
};
