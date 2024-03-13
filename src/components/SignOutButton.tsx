'use client';

import { SignOut } from '@/services/SignOut';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';

export const SignOutButton = () => {
  const { refresh } = useRouter();

  return (
    <Button onClick={() => SignOut(() => refresh())} className='w-full'>
      Sair
    </Button>
  );
};
