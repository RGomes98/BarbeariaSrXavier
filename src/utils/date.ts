export const formatToDateTime = (date: Date) => {
  const [day, month, year] = Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo',
    month: '2-digit',
    year: 'numeric',
    day: '2-digit',
  })
    .format(date)
    .split('/');

  return [year, day, month].join('-');
};

export const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    minute: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    year: 'numeric',
    day: 'numeric',
    month: 'long',
  }).format(date);
};

export const formatDateShort = (date: Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    weekday: 'short',
    year: 'numeric',
    day: 'numeric',
    month: 'short',
  }).format(date);
};
