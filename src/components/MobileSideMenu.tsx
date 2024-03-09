import { SignOutButton } from './SignOutButton';
import { Button } from '@/components/ui/button';
import { Session } from '@/helpers/getSession';
import { Menu } from 'lucide-react';
import { Fragment } from 'react';
import { Logo } from './Logo';
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import Link from 'next/link';

export const MobileSideMenu = ({ session }: { session: Session }) => {
  return (
    <Sheet>
      <SheetTrigger className='ml-auto md:hidden' asChild>
        <Button variant='ghost' className='px-2'>
          <Menu size={28} />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <Logo className='text-base' />
          </SheetTitle>
        </SheetHeader>
        <div className='grid gap-4 py-6'>
          {session && (
            <Fragment>
              <Button variant='ghost' className='font-bold'>
                <Link href='/agendamentos'>Agendamentos</Link>
              </Button>
              {session.accountType !== 'USER' && (
                <Button variant='ghost' className='font-bold'>
                  <Link href='/recebidos'>Recebidos</Link>
                </Button>
              )}
            </Fragment>
          )}
          {!session && (
            <Fragment>
              <Button variant='ghost' className='font-bold'>
                <Link href='/entrar'>Entrar</Link>
              </Button>
              <Button className='font-bold'>
                <Link href='/registrar'>Criar conta</Link>
              </Button>
            </Fragment>
          )}
        </div>
        <SheetFooter>{session && <SignOutButton />}</SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
