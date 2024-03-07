'use client';

import { useAuthState } from 'react-firebase-hooks/auth';
import { ThemeButton } from '@/components/ThemeButton';
import { auth } from '@/firebaseConfig/firebase';
import { haircuts } from '@/mock/haircuts';
import { signOut } from 'firebase/auth';
import { Fragment } from 'react';

import Link from 'next/link';

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <div className='flex flex-col items-start'>
      <ThemeButton />
      {/* {session?.role === 'EMPLOYEE' && (
        <Link href='/recebidos' className='mb-6 bg-slate-500 p-4'>
          Recebidos
        </Link>
      )} */}
      {user ? (
        <Fragment>
          <button onClick={() => signOut(auth)}>SAIR</button>
          <Link href='/agendamentos' className='mb-6 bg-slate-500 p-4'>
            Agendamentos
          </Link>
        </Fragment>
      ) : (
        <Link href='/entrar' className='mb-6 bg-slate-500 p-4'>
          Entrar
        </Link>
      )}

      {haircuts.map(({ name, id, price }) => {
        return (
          <div key={id} className='flex max-w-[128px] flex-col items-center gap-1 text-center'>
            <p>Corte: {name}</p>
            <p>Preço: {price}</p>
            <Link href={`/corte/${id}`} className='mb-6 bg-green-300 p-4'>
              Agendar
            </Link>
          </div>
        );
      })}
    </div>
  );
}
