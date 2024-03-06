export const formatCPF = (input: string) => {
  const cpf = input.replace(/\D/g, '');
  let formattedCpf = '';

  if (cpf.length > 0) formattedCpf = cpf;
  if (cpf.length > 3) formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3)}`;
  if (cpf.length > 6) formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6)}`;
  if (cpf.length > 9)
    formattedCpf = `${cpf.slice(0, 3)}.${cpf.slice(3, 6)}.${cpf.slice(6, 9)}-${cpf.slice(9)}`;

  return formattedCpf;
};
