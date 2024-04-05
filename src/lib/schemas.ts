import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])[A-Za-z\d!@#$%^&*()-+=]{8,}$/;
const phoneRegex = /^\((?:[1-9]{2})\)\s*(?:9[0-9]{4}-[0-9]{4})$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;
export const statuses = ['PAID', 'BREAK', 'PENDING', 'CANCELED'] as const;
export const appointmentTypes = ['REGULAR', 'SESSIONLESS'] as const;
export const accountTypes = ['USER', 'EMPLOYEE', 'ADMIN'] as const;
export const paymentMethods = ['PIX', 'CASH', 'CARD'] as const;

export const LoginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
  password: z.string().min(8, { message: 'Senha deve ter pelo menos 8 caracteres.' }),
});

export const CardSchema = z.object({
  holderName: z.string().trim().min(1, { message: 'Nome inválido.' }),
  expiryMonth: z.number().int().min(1).max(12),
  expiryYear: z.number().int().min(new Date().getFullYear()),
  cvv: z.string().min(3).max(4),
  number: z.string().min(16).max(16),
});

export const RegisterSchema = z
  .object({
    name: z.string().trim().min(1, { message: 'Nome inválido.' }),
    phone: z.string().regex(phoneRegex, { message: 'Telefone inválido.' }),
    email: z.string().email({ message: 'E-mail inválido.' }),
    password: z.string().regex(passwordRegex, {
      message:
        'Senha deve ter 8 caracteres e incluir letras maiúsculas, minúsculas, números e caracteres especiais.',
    }),
    confirmPassword: z.string().trim().min(1, { message: 'É necessário confirmar a senha.' }),
    cpf: z.string().regex(cpfRegex, { message: 'CPF inválido.' }),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: 'As senhas não coincidem.',
    path: ['confirmPassword'],
  });

export const ScheduleFormSchema = z.object({
  cpf: z.string().regex(cpfRegex, { message: 'CPF inválido.' }),
  name: z.string().trim().min(1, { message: 'Nome inválido.' }),
  phone: z.string().regex(phoneRegex, { message: 'Telefone inválido.' }),
});

export const HaircutSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  photoUri: z.array(z.string().url()),
});

export const ScheduleSchema = z.object({
  id: z.string().uuid(),
  haircutId: z.number(),
  employeeId: z.string(),
  status: z.enum(statuses),
  scheduleDate: z.coerce.date(),
  type: z.enum(appointmentTypes),
  paymentMethod: z.enum(paymentMethods),
});

export const scheduleDiscriminatedUnionSchema = z.discriminatedUnion('type', [
  z.object({ type: z.literal('REGULAR'), userId: z.string() }),
  z.object({ type: z.literal('SESSIONLESS') }).merge(ScheduleFormSchema),
]);

export const AppointmentSchema = z
  .object({
    id: z.string().uuid(),
    haircutId: z.number(),
    employeeId: z.string(),
    status: z.enum(statuses),
    scheduleDate: z.string(),
    type: z.enum(appointmentTypes),
    paymentMethod: z.enum(paymentMethods),
  })
  .and(scheduleDiscriminatedUnionSchema);

export const userDiscriminatedUnionSchema = z.discriminatedUnion('accountType', [
  z.object({ accountType: z.literal('USER') }),
  z.object({ accountType: z.literal('ADMIN'), schedules: z.array(AppointmentSchema).optional() }),
  z.object({ accountType: z.literal('EMPLOYEE'), schedules: z.array(AppointmentSchema).optional() }),
]);

export const UserSchema = z
  .object({
    id: z.string(),
    cpf: z.string(),
    name: z.string(),
    cellphone: z.string(),
    email: z.string().email(),
    createdAt: z.coerce.date(),
    accountType: z.enum(accountTypes),
  })
  .and(userDiscriminatedUnionSchema);

export const FormattedAppointmentDataSchema = z.object({
  clientName: z.string(),
  employeeId: z.string(),
  haircutName: z.string(),
  haircutPrice: z.number(),
  employeeName: z.string(),
  appointmentId: z.string(),
  appointmentDate: z.string(),
  appointmentStatus: z.string(),
  paymentMethod: z.enum(paymentMethods),
});

export const paymentLinkTokenSchema = z.object({
  data: z.object({ h: z.number(), a: z.string() }),
});

export const FormattedAppointmentsDataSchema = z.array(FormattedAppointmentDataSchema);
export const AppointmentsSchema = z.array(AppointmentSchema);
export const paymentMethodSchema = z.enum(paymentMethods);
export const SchedulesSchema = z.array(ScheduleSchema);
export const AccountTypeSchema = z.enum(accountTypes);
export const HaircutsSchema = z.array(HaircutSchema);
export const UsersSchema = z.array(UserSchema);

export type PaymentMethod = (typeof paymentMethods)[number];
export type Roles = (typeof accountTypes)[number];
export type Status = (typeof statuses)[number];

export type FormattedAppointmentData = z.infer<typeof FormattedAppointmentDataSchema>;
export type ScheduleForm = z.infer<typeof ScheduleFormSchema>;
export type AccountType = z.infer<typeof AccountTypeSchema>;
export type Appointment = z.infer<typeof AppointmentSchema>;
export type Employee = User & { schedules: Schedule[] };
export type Schedule = z.infer<typeof ScheduleSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type Haircut = z.infer<typeof HaircutSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type Card = z.infer<typeof CardSchema>;
export type User = z.infer<typeof UserSchema>;
