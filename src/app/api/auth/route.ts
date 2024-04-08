import { type NextRequest, NextResponse } from 'next/server';
import { GetUserById } from '@/services/GetUserById';
import { cookies } from 'next/headers';
import { auth } from 'firebase-admin';

export async function GET(request: NextRequest) {
  const session = cookies().get('session')?.value;
  if (!session) return NextResponse.json({}, { status: 401 });

  const decodedToken = await auth().verifySessionCookie(session, true);
  if (!decodedToken) return NextResponse.json({}, { status: 401 });

  const response = await GetUserById(decodedToken.uid);
  if (response.status != 200) return NextResponse.json(response.data, { status: response.status });

  return NextResponse.json(response.data, { status: 200 });
}
