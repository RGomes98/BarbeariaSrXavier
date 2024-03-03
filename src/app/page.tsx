import { logout } from '@/server-actions/session-action';
import { getSession } from '@/helpers/getSession';
import { haircuts } from '@/mock/haircuts';

import Link from 'next/link';
import { Fragment } from 'react';

export default function Home() {
  const session = getSession();

  return (
    <div className='flex flex-col items-start'>
      {session?.role === 'EMPLOYEE' && (
        <Link href='/recebidos' className='mb-6 bg-slate-500 p-4'>
          Recebidos
        </Link>
      )}
      {session ? (
        <Fragment>
          <form action={logout}>
            <button type='submit' className='mb-6 bg-slate-500 p-4'>
              Sair
            </button>
          </form>
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
