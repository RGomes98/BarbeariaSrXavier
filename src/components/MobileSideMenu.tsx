import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { SignOutButton } from './SignOutButton';
import { Button } from '@/components/ui/button';
import { Session } from '@/helpers/getSession';
import { Menu } from 'lucide-react';
import { Logo } from './Logo';

import Link from 'next/link';

export const MobileSideMenu = ({ session }: { session: Session }) => {
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
          {session && (
            <div className='flex flex-col justify-center gap-4'>
              <Button variant='ghost' className='py-6 font-bold'>
                <Link href='/agendamentos'>Agendamentos</Link>
              </Button>
              {session.accountType !== 'USER' && (
                <Button variant='ghost' className='py-6 font-bold'>
                  <Link href='/recebidos'>Recebidos</Link>
                </Button>
              )}
              <SignOutButton />
            </div>
          )}
          {!session && (
            <div className='flex flex-col justify-center gap-4'>
              <Button variant='ghost' className='py-6 font-bold'>
                <Link href='/entrar'>Entrar</Link>
              </Button>
              <Button className='py-6 font-bold'>
                <Link href='/registrar'>Criar conta</Link>
              </Button>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
