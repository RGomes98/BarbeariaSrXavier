import { MobileSideMenu } from './MobileSideMenu';
import { Button } from './ui/button';
import { Fragment } from 'react';

import Link from 'next/link';

export const NavigationMenu = () => {
  let isLoggedIn = false;
  let session = 'USER';

  return (
    <Fragment>
      <div className='ml-auto flex items-center max-md:hidden'>
        {isLoggedIn && (
          <Fragment>
            <Button variant='ghost'>
              <Link href='/sair'>Sair</Link>
            </Button>
            {session === 'ADMIN' && (
              <Button variant='ghost'>
                <Link href='/recebidos'>Recebidos</Link>
              </Button>
            )}
            <Button variant='ghost'>
              <Link href='/agendamentos'>Agendamentos</Link>
            </Button>
          </Fragment>
        )}
        {!isLoggedIn && (
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
      <MobileSideMenu isLoggedIn={isLoggedIn} session={session} />
    </Fragment>
  );
};
