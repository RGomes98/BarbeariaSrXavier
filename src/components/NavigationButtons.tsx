'use client';

import { SignOutButton } from './SignOutButton';
import { Session } from '@/helpers/getSession';
import { usePathname } from 'next/navigation';
import { Button } from './ui/button';
import { Fragment } from 'react';

import Link from 'next/link';

export const NavigationButtons = ({ session }: { session: Session }) => {
  const path = usePathname();

  const isAtSchedules = path === '/agendamentos';
  const isAtReceived = path === '/recebidos';
  const isAtHome = path === '/';

  return (
    <div className='ml-auto flex items-center gap-2 max-md:hidden'>
      {session && (
        <Fragment>
          {!isAtHome && (
            <Button variant='outline'>
              <Link href='/'>Voltar</Link>
            </Button>
          )}
          {!isAtReceived && (session.accountType === 'ADMIN' || session.accountType === 'EMPLOYEE') && (
            <Button variant='outline'>
              <Link href='/recebidos'>Recebidos</Link>
            </Button>
          )}
          {!isAtSchedules && (
            <Button variant='outline'>
              <Link href='/agendamentos'>Agendamentos</Link>
            </Button>
          )}
          <SignOutButton />
        </Fragment>
      )}
      {!session && (
        <Fragment>
          <Button variant='outline'>
            <Link href='/entrar'>Entrar</Link>
          </Button>
          <Button variant='outline'>
            <Link href='/registrar'>Criar conta</Link>
          </Button>
        </Fragment>
      )}
    </div>
  );
};
