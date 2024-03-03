import { type NextRequest, NextResponse } from 'next/server';
import { getSession } from './helpers/getSession';

export function middleware(request: NextRequest) {
  let session = getSession();

  if (request.nextUrl.pathname.startsWith('/entrar')) {
    if (session) return NextResponse.redirect(new URL('/', request.url));
  }

  if (request.nextUrl.pathname.startsWith('/agendamentos')) {
    if (!session) return NextResponse.redirect(new URL('/entrar', request.url));
  }

  if (['/agendamento/', '/recebidos'].some((path) => request.nextUrl.pathname.startsWith(path))) {
    if (!session || session.role !== 'EMPLOYEE') return NextResponse.redirect(new URL('/', request.url));
  }
}
