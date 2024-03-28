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
  const isAtDashboard = path === '/dashboard';
  const isAtHome = path === '/';

  return (
    <div className='ml-auto flex items-center gap-2 max-md:hidden'>
      {!isAtHome && (
        <Button variant='outline'>
          <Link href='/'>Voltar</Link>
        </Button>
      )}
      {session && (
        <Fragment>
          {!isAtDashboard && (session.accountType === 'ADMIN' || session.accountType === 'EMPLOYEE') && (
            <Button variant='outline'>
              <Link href='/dashboard'>Dashboard</Link>
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
