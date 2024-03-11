import { PaymentMethod, Status } from '@/mock/users';

export const formatPaymentMethod = (paymentMethod: PaymentMethod) => {
  switch (paymentMethod) {
    case 'PIX':
      return 'Pix';
    case 'CASH':
      return 'Dinheiro';
    case 'CARD':
      return 'Cartão de crédito';
  }
};

export const formatScheduleStatus = (style: 'short' | 'long', status?: Status) => {
  switch (status) {
    case 'PAID':
    case 'PENDING':
    case 'CONFIRMED':
      return style === 'long' ? 'Horário reservado' : 'Reservado';
    case 'BREAK':
      return style === 'long' ? 'Horário de almoço' : 'Almoço';
    default:
      return style === 'long' ? 'Horário disponível' : 'Disponível';
  }
};

export const getScheduleStatusColor = (status?: Status) => {
  switch (status) {
    case 'PAID':
    case 'BREAK':
    case 'PENDING':
    case 'CONFIRMED':
      return 'bg-red-500/70 cursor-default pointer-events-none';
    default:
      return 'bg-green-500/70';
  }
};
