import { Timestamp } from 'firebase/firestore';
import { z } from 'zod';

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])[A-Za-z\d!@#$%^&*()-+=]{8,}$/;
const phoneRegex = /^\((?:[1-9]{2})\)\s*(?:9[0-9]{4}-[0-9]{4})$/;
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;

export const accountTypes = ['USER', 'BARBER', 'ADMIN'] as const;
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

export const AccountTypeSchema = z.enum(accountTypes);

export const UserSchema = z.object({
  cpf: z.string(),
  cellphone: z.string(),
  createdAt: z.instanceof(Timestamp),
  name: z.string(),
  accountType: z.literal('USER'),
  email: z.string().email(),
  id: z.string(),
});

export const BarberSchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.instanceof(Timestamp),
  accountType: z.literal('BARBER'),
  email: z.string().email(),
  phone: z.string(),
  cpf: z.string(),
});

export const HaircutSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string(),
  photoUri: z.array(z.string().url()),
});

export const ScheduleSchema = z.object({
  haircut: HaircutSchema,
  date: z.instanceof(Timestamp),
  ispaid: z.boolean(),
  payType: z.string(),
  id: z.string(),
  price: z.number(),
  user: UserSchema.omit({ id: true }),
  barber: BarberSchema.omit({ id: true, accountType: true, createdAt: true }),
});

export const TestSchema = z.array(
  z.object({
    id: z.string(),
    name: z.string(),
    createdAt: z.instanceof(Timestamp),
    accountType: z.literal('BARBER'),
    email: z.string().email(),
    cpf: z.string(),
    appointments: z.array(ScheduleSchema),
  }),
);

const Test2Schema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.instanceof(Timestamp),
  accountType: z.literal('BARBER'),
  email: z.string().email(),
  cpf: z.string(),
  appointments: z.array(ScheduleSchema),
});

export type Test = z.infer<typeof TestSchema>;
export type Test2 = z.infer<typeof Test2Schema>;

export const SchedulesSchema = z.array(ScheduleSchema);
export const HaircutsSchema = z.array(HaircutSchema);
export const BarbersSchema = z.array(BarberSchema);

export type AccountType = z.infer<typeof AccountTypeSchema>;
export type Schedule = z.infer<typeof ScheduleSchema>;
export type Register = z.infer<typeof RegisterSchema>;
export type Haircut = z.infer<typeof HaircutSchema>;
export type Barber = z.infer<typeof BarberSchema>;
export type Login = z.infer<typeof LoginSchema>;
export type User = z.infer<typeof UserSchema>;
