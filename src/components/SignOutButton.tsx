'use client';

import { SignOut } from '@/services/SignOut';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { toast } from 'sonner';

export const SignOutButton = () => {
  const { refresh } = useRouter();

  return (
    <Button
      onClick={() =>
        SignOut(() => {
          refresh();
          toast.error('Sessão encerrada.');
        })
      }
      className='w-full'
    >
      Sair
    </Button>
  );
};
