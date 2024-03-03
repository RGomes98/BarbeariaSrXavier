import { z } from 'zod';

export const statusOptions = ['PAID', 'PENDING', 'CANCELED', 'CONFIRMED'] as const;
export const workingHours = [8, 9, 10, 11, 12, 14, 15, 16, 17, 18] as const;
export const paymentOptions = ['pix', 'card', 'cash'] as const;

export const haircutSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.coerce.number(),
});

export const paymentMethodSchema = z.enum(paymentOptions);

export const scheduleSchema = z.object({
  id: z.string(),
  clientId: z.string(),
  date: z.coerce.date(),
  employeeId: z.string(),
  haircut: haircutSchema,
  status: z.enum(statusOptions),
  paymentMethod: paymentMethodSchema,
});

export const userDiscriminatedUnionSchema = z.discriminatedUnion('role', [
  z.object({ role: z.literal('USER') }),
  z.object({ role: z.literal('EMPLOYEE'), schedules: z.array(scheduleSchema) }),
]);

export const userSchema = z
  .object({
    cpf: z.string(),
    name: z.string(),
    phone: z.string(),
    password: z.string(),
    email: z.string().email(),
    role: z.enum(['USER', 'EMPLOYEE'] as const),
  })
  .and(userDiscriminatedUnionSchema);

export type PaymentMethod = (typeof paymentOptions)[number];
export type Employee = User & { schedules: Schedule[] };
export type Schedule = z.infer<typeof scheduleSchema>;
export type Status = (typeof statusOptions)[number];
export type Haircut = z.infer<typeof haircutSchema>;
export type User = z.infer<typeof userSchema>;

export const users: User[] = [
  {
    role: 'USER',
    name: 'User1',
    password: 'password',
    cpf: '111.111.111-00',
    email: 'user1@email.com',
    phone: '(24) 99999-1100',
  },
  {
    role: 'USER',
    name: 'User2',
    password: 'password',
    cpf: '111.111.222-00',
    email: 'user2@email.com',
    phone: '(24) 99999-2200',
  },
  {
    role: 'USER',
    name: 'User3',
    password: 'password',
    cpf: '111.111.333-00',
    email: 'user3@email.com',
    phone: '(24) 99999-3300',
  },

  {
    name: 'Barber1',
    role: 'EMPLOYEE',
    password: 'password',
    cpf: '111.111.111-11',
    phone: '(24) 99999-1111',
    email: 'barber1@email.com',
    schedules: [
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 8),
        status: 'CONFIRMED',
        paymentMethod: 'card',
        id: crypto.randomUUID(),
        clientId: '111.111.111-00',
        employeeId: '111.111.111-11',
        haircut: {
          id: '3',
          name: 'Layered Cut',
          description: 'A versatile hairstyle with layers of varying lengths to add volume and texture.',
          price: 60.0,
        },
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 9),
        status: 'CONFIRMED',
        paymentMethod: 'pix',
        id: crypto.randomUUID(),
        clientId: '111.111.222-00',
        employeeId: '111.111.111-11',
        haircut: {
          id: '2',
          name: 'Bob Cut',
          description:
            'A classic short-to-medium hairstyle where hair is typically cut straight around the head.',
          price: 50.0,
        },
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 18),
        status: 'PENDING',
        paymentMethod: 'card',
        id: crypto.randomUUID(),
        clientId: '111.111.333-00',
        employeeId: '111.111.111-11',
        haircut: {
          id: '3',
          name: 'Layered Cut',
          description: 'A versatile hairstyle with layers of varying lengths to add volume and texture.',
          price: 60.0,
        },
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 16),
        status: 'CONFIRMED',
        paymentMethod: 'cash',
        id: crypto.randomUUID(),
        clientId: '111.111.222-00',
        employeeId: '111.111.111-11',
        haircut: {
          id: '2',
          name: 'Bob Cut',
          description:
            'A classic short-to-medium hairstyle where hair is typically cut straight around the head.',
          price: 50.0,
        },
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 12),
        status: 'PENDING',
        paymentMethod: 'cash',
        id: crypto.randomUUID(),
        clientId: '111.111.111-00',
        employeeId: '111.111.111-11',
        haircut: {
          id: '1',
          name: 'Pixie Cut',
          description: 'Short hairstyle where hair is cropped close to the head.',
          price: 40.0,
        },
      },
    ],
  },
  {
    name: 'Barber2',
    role: 'EMPLOYEE',
    password: 'password',
    cpf: '111.111.111-22',
    phone: '(24) 99999-2222',
    email: 'barber2@email.com',
    schedules: [
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 15),
        status: 'CANCELED',
        paymentMethod: 'pix',
        id: crypto.randomUUID(),
        clientId: '111.111.111-00',
        employeeId: '111.111.111-22',
        haircut: {
          id: '2',
          name: 'Bob Cut',
          description:
            'A classic short-to-medium hairstyle where hair is typically cut straight around the head.',
          price: 50.0,
        },
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate(), 10),
        status: 'PAID',
        paymentMethod: 'pix',
        id: crypto.randomUUID(),
        clientId: '111.111.333-00',
        employeeId: '111.111.111-22',
        haircut: {
          id: '1',
          name: 'Pixie Cut',
          description: 'Short hairstyle where hair is cropped close to the head.',
          price: 40.0,
        },
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 12),
        status: 'PENDING',
        paymentMethod: 'cash',
        id: crypto.randomUUID(),
        clientId: '111.111.333-00',
        employeeId: '111.111.111-22',
        haircut: {
          id: '3',
          name: 'Layered Cut',
          description: 'A versatile hairstyle with layers of varying lengths to add volume and texture.',
          price: 60.0,
        },
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 8),
        status: 'PENDING',
        paymentMethod: 'card',
        id: crypto.randomUUID(),
        clientId: '111.111.111-00',
        employeeId: '111.111.111-22',
        haircut: {
          id: '1',
          name: 'Pixie Cut',
          description: 'Short hairstyle where hair is cropped close to the head.',
          price: 40.0,
        },
      },
      {
        date: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 1, 14),
        status: 'PENDING',
        paymentMethod: 'pix',
        id: crypto.randomUUID(),
        clientId: '111.111.111-00',
        employeeId: '111.111.111-22',
        haircut: {
          id: '1',
          name: 'Pixie Cut',
          description: 'Short hairstyle where hair is cropped close to the head.',
          price: 40.0,
        },
      },
    ],
  },
];
