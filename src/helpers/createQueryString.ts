import type { ReadonlyURLSearchParams } from 'next/navigation';

type CreateQueryString = { key: string; value: string; searchParams: ReadonlyURLSearchParams };

export const createQueryString = ({ searchParams, key, value }: CreateQueryString) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  return String(params);
};
