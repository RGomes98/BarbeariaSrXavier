import { addDoc, arrayUnion, collection, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig/firebase';
import { PaymentMethod, Status } from '@/lib/schemas';
import { getHaircut } from './GetHairCuts';

export type CreateAppointment = {
  status: Status;
  haircutId: number;
  employeeId: string;
  appointmentDate: Date;
  paymentMethod: PaymentMethod;
} & ({ type: 'REGULAR'; userId: string } | { cpf: string; name: string; phone: string; type: 'SESSIONLESS' });

export const createAppointment = async (params: CreateAppointment) => {
  const appointment =
    params.type === 'REGULAR'
      ? {
          type: params.type,
          userId: params.userId,
          status: params.status,
          id: crypto.randomUUID(),
          haircutId: params.haircutId,
          employeeId: params.employeeId,
          paymentMethod: params.paymentMethod,
          scheduleDate: String(params.appointmentDate),
        }
      : {
          cpf: params.cpf,
          name: params.name,
          type: params.type,
          phone: params.phone,
          status: params.status,
          id: crypto.randomUUID(),
          haircutId: params.haircutId,
          employeeId: params.employeeId,
          paymentMethod: params.paymentMethod,
          scheduleDate: String(params.appointmentDate),
        };

  try {
    const haircut = await getHaircut(params.haircutId);
    await addDoc(collection(firestore, 'appointments'), appointment);
    await updateDoc(doc(firestore, 'users', params.employeeId), { schedules: arrayUnion(appointment) });

    return {
      status: 'success',
      message: 'Horário reservado com sucesso',
      data: {
        haircutId: haircut.id,
        haircutName: haircut.name,
        haircutPrice: haircut.price,
        appointmentId: appointment.id,
        haircutDescription: haircut.description,
        paymentMethod: appointment.paymentMethod,
      },
    } as const;
  } catch (error) {
    return {
      status: 'error',
      message: 'Houve um problema ao processar a reserva do horário.',
      data: undefined,
    } as const;
  }
};
