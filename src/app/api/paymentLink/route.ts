import { type NextRequest, NextResponse } from 'next/server';
import { serverEnv } from '@/lib/env/server';

export async function POST(request: NextRequest) {
  const paymentData = await request.json();

  const options = {
    method: 'POST',
    body: JSON.stringify(paymentData),
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      access_token: serverEnv.ASSAS_SANDBOX_ACCESS_TOKEN,
    },
  };

  const response = await fetch('https://sandbox.asaas.com/api/v3/paymentLinks', options);
  if (!response.ok) return NextResponse.json(response, { status: 500 });

  return NextResponse.json(await response.json(), { status: 200 });
}
