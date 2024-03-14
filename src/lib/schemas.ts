import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])[A-Za-z\d!@#$%^&*()-+=]{8,}$/;
const phoneRegex = /^\((?:[1-9]{2})\)\s*(?:9[0-9]{4}-[0-9]{4})$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export const workingHours = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18] as const;
export const statuses = ['PAID', 'PENDING', 'CANCELED', 'BREAK'] as const;
export const accountTypes = ['USER', 'EMPLOYEE', 'ADMIN'] as const;
export const paymentMethods = ['PIX', 'CASH', 'CARD'] as const;

export const LoginSchema = z.object({
  email: z.string().email({ message: 'E-mail inválido.' }),
  password: z.string().min(8, { message: 'Senha deve ter pelo menos 8 caracteres.' }),
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

export const HaircutSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  photoUri: z.array(z.string().url()),
});

export const ScheduleSchema = z.object({
  userId: z.string(),
  id: z.string().uuid(),
  haircutId: z.number(),
  employeeId: z.string(),
  status: z.enum(statuses),
  scheduleDate: z.coerce.date(),
  paymentMethod: z.enum(paymentMethods),
});

export const userDiscriminatedUnionSchema = z.discriminatedUnion('accountType', [
  z.object({ accountType: z.literal('USER') }),
  z.object({ accountType: z.literal('EMPLOYEE'), schedules: z.array(ScheduleSchema).optional() }),
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

export const paymentMethodSchema = z.enum(paymentMethods);
export const SchedulesSchema = z.array(ScheduleSchema);
export const AccountTypeSchema = z.enum(accountTypes);
export const HaircutsSchema = z.array(HaircutSchema);
export const UsersSchema = z.array(UserSchema);

export type PaymentMethod = (typeof paymentMethods)[number];
export type Roles = (typeof accountTypes)[number];
export type Status = (typeof statuses)[number];

export type AccountType = z.infer<typeof AccountTypeSchema>;
export type Employee = User & { schedules: Schedule[] };
export type Schedule = z.infer<typeof ScheduleSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type Haircut = z.infer<typeof HaircutSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type User = z.infer<typeof UserSchema>;
