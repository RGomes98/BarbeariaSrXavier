'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Page() {
  const { push } = useRouter();

  useEffect(() => {
    push('/');
  }, [push]);

  return null;
}