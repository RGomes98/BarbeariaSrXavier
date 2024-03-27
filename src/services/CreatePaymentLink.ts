import { Haircut, PaymentMethod } from '@/lib/schemas';

export const createPaymentLink = async (paymentType: PaymentMethod, hairCut: Haircut) => {
  const paymentOptions = {
    billingType: paymentType === 'PIX' ? 'PIX' : 'CREDIT_CARD',
    chargeType: 'DETACHED',
    name: hairCut.name,
    description: hairCut.description,
    dueDateLimitDays: 10,
    value: hairCut.price,
    notificationEnabled: false,
  };

  const response = await fetch('/api/paymentLink', { method: 'POST', body: JSON.stringify(paymentOptions) });
  const paymentData = await response.json(); //Link de pagamendo com as informações (id,tipo...);
  console.log(paymentData);

  if (!response.ok) {
    return {
      status: 'error',
      paymentLink: undefined,
      message:
        'Ops! Parece que algo deu errado ao criar o link de pagamento. Por favor, tente novamente mais tarde.',
    } as const;
  }

  return {
    status: 'success',
    paymentLink: paymentData.url,
    message: 'Link de pagamento criado com sucesso!',
  } as const;
};
