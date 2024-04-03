import { type NextRequest, NextResponse } from 'next/server';
import { paymentLinkTokenSchema } from '@/lib/schemas';
import { serverEnv } from '@/lib/env/server';
import { verify } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const token = request.nextUrl.searchParams.get('token');
    if (!token) return NextResponse.json({ message: 'missing token' }, { status: 400 });

    const decodedToken = paymentLinkTokenSchema.parse(verify(token, serverEnv.JWT_SECRET));
    //Mudar o status do agendamento usando o token

    return NextResponse.redirect(new URL(`corte/${decodedToken.data.haircutId}`, request.nextUrl.origin));
  } catch (error) {
    if (!(error instanceof Error)) throw error;
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
