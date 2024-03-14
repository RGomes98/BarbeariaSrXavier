import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig/firebase';
import { PaymentMethod, Status } from '@/lib/schemas';

export const createAppointment = async (
  haircutId: number,
  userId: string,
  employeeId: string,
  status: Status,
  paymentMethod: PaymentMethod,
  appointmentDate: Date,
) => {
  const appointment = {
    userId,
    status,
    haircutId,
    employeeId,
    paymentMethod,
    id: crypto.randomUUID(),
    scheduleDate: String(appointmentDate),
  };

  try {
    await updateDoc(doc(firestore, 'users', employeeId), { schedules: arrayUnion(appointment) });
    return { status: 'success', message: 'Horário reservado com sucesso' } as const;
  } catch (error) {
    return { status: 'error', message: 'Houve um problema ao processar a reserva do horário.' } as const;
  }
};
