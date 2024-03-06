export const formatPhoneNumber = (input: string) => {
  const phone = input.replace(/\D/g, '');
  let formattedPhone = '';

  if (phone.length > 0) formattedPhone = `(${phone}`;
  if (phone.length > 2) formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  if (phone.length > 7) formattedPhone = `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;

  return formattedPhone;
};
