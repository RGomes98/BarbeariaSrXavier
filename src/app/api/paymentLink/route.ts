import { type NextRequest, NextResponse } from 'next/server';
import { serverEnv } from '@/lib/env/server';
import { sign } from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const paymentLinkToken = sign(
      { data: { haircutId: data.haircutId, appointmentId: data.appointmentId } },
      serverEnv.JWT_SECRET,
      { expiresIn: '1h' },
    );

    const paymentLinkData = {
      ...data,
      callback: {
        autoRedirect: true,
        successUrl: `${request.nextUrl.origin}/api/success?token=${paymentLinkToken}`,
      },
    };
    

    const token = request.nextUrl.origin.includes('localhost')
      ? serverEnv.ASSAS_SANDBOX_ACCESS_TOKEN
      : serverEnv.ASSAS_PROD_ACCESS_TOKEN;
    const url = request.nextUrl.origin.includes('localhost')
      ? serverEnv.ASSAS_SANDBOX_URL
      : serverEnv.ASSAS_PROD_URL;

    const paymentLinkOptions = {
      method: 'POST',
      body: JSON.stringify(paymentLinkData),
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
        access_token: token,
      },
    };

    // console.log(request.nextUrl.origin)

    const response = await fetch(`${url}/paymentLinks`, paymentLinkOptions);
    console.log(token);
    if (!response.ok) throw new Error();

    return NextResponse.json({ message: 'payment link successfully created' }, { status: 200 });
  } catch (error) {
    if (!(error instanceof Error)) throw error;
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
