import type { ReadonlyURLSearchParams } from 'next/navigation';

type CreateQueryString = { key: string; value: string; searchParams: ReadonlyURLSearchParams };

type CreateDateInputQueryString = {
  searchParams: ReadonlyURLSearchParams;
  event: React.ChangeEvent<HTMLInputElement>;
};

export const createQueryString = ({ searchParams, key, value }: CreateQueryString) => {
  const params = new URLSearchParams(searchParams);
  params.set(key, value);
  return String(params);
};

export const createDateInputQueryString = ({ event, searchParams }: CreateDateInputQueryString) => {
  const date = `${event.target.value} GMT-3`;
  const queryString = `?${createQueryString({ searchParams, key: 'date', value: date })}`;
  window.history.pushState(null, '', queryString);
};
