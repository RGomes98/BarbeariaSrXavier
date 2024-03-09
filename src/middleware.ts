import { type NextRequest, NextResponse } from 'next/server';
import { User } from './lib/schemas';

export async function middleware(request: NextRequest) {
  const session = request.cookies.get('session');
  if (!session) return NextResponse.redirect(new URL('/entrar', request.url));

  const userAuthentication = await fetch(`${request.nextUrl.origin}/api/auth`, {
    headers: { Cookie: `session=${session.value}` },
  });

  if (userAuthentication.status !== 200) return NextResponse.redirect(new URL('/entrar', request.url));

  if (['/agendamento/', '/recebidos'].some((path) => request.nextUrl.pathname.startsWith(path))) {
    const user: User = await userAuthentication.json();

    const isNotAuthorizedUser = !['ADMIN', 'BARBER'].some((accountType) => accountType === user.accountType);
    if (isNotAuthorizedUser) return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = { matcher: ['/recebidos', '/agendamentos', '/agendamento/:path*'] };
