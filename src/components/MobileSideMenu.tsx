'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SignOutButton } from './SignOutButton';
import { Button } from '@/components/ui/button';
import { Session } from '@/helpers/getSession';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';

import Link from 'next/link';

export const MobileSideMenu = ({ session }: { session: Session }) => {
  const path = usePathname();

  const isAtSchedules = path === '/agendamentos';
  const isAtDashboard = path === '/dashboard';
  const isAtHome = path === '/';

  return (
    <Sheet>
      <SheetTrigger className='ml-auto md:hidden' asChild>
        <Button variant='ghost' className='px-2'>
          <Menu size={28} />
        </Button>
      </SheetTrigger>
      <SheetContent className='mt-auto flex flex-col'>
        <SheetHeader>
          <SheetTitle>
            <Logo className='text-xl max-[425px]:text-lg' />
          </SheetTitle>
        </SheetHeader>
        <div className='mt-auto grid py-6'>
          {!isAtHome && (
            <Button variant='outline' className='mb-4 py-6'>
              <Link href='/'>Voltar</Link>
            </Button>
          )}
          {session && (
            <div className='flex flex-col justify-center gap-4'>
              {isAtDashboard && (
                <Button variant='outline' className='py-6'>
                  <Link href='#'>Editar Cortes</Link>
                </Button>
              )}
              {!isAtDashboard && (session.accountType === 'ADMIN' || session.accountType === 'EMPLOYEE') && (
                <Button variant='outline' className='py-6'>
                  <Link href='/dashboard'>Dashboard</Link>
                </Button>
              )}
              {!isAtSchedules && (
                <Button variant='outline' className='py-6'>
                  <Link href='/agendamentos'>Agendamentos</Link>
                </Button>
              )}
              <SignOutButton className='py-6' />
            </div>
          )}
          {!session && (
            <div className='flex flex-col justify-center gap-4'>
              <Button variant='outline' className='py-6'>
                <Link href='/entrar'>Entrar</Link>
              </Button>
              <Button className='py-6'>
                <Link href='/registrar'>Criar conta</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
