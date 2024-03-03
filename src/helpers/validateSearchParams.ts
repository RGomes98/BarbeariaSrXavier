import { type PaymentMethod, paymentMethodSchema } from '@/mock/users';
import { z } from 'zod';

export const validateDate = (param: string | null, defaultDate: Date) => {
  const date = z.coerce.date().safeParse(param);
  if (!param || !date.success) return defaultDate;
  return date.data;
};

export const validateEmployee = (param: string | null, defaultEmployee: string) => {
  const employee = z.coerce.string().trim().min(1).safeParse(param);
  if (!param || !employee.success) return defaultEmployee;
  return employee.data;
};

export const validatePaymentMethod = (param: string | null, defaultPaymentMethod: PaymentMethod) => {
  const employee = paymentMethodSchema.safeParse(param);
  if (!param || !employee.success) return defaultPaymentMethod;
  return employee.data;
};
