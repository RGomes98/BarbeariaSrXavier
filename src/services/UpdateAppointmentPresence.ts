import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig/firebase';
import { AppointmentsSchema } from '@/lib/schemas';

export const UpdateAppointmentPresence = async (id: string, presence: boolean, userId?: string) => {
  try {
    const appointment = await getDocs(query(collection(firestore, 'appointments'), where('id', '==', id)));
    const user = await getDocs(query(collection(firestore, 'users'), where('id', '==', userId)));
    const appointmentRef = appointment.docs[0].ref;
    const userRef = user.docs[0].ref;
    const userAppointments = AppointmentsSchema.safeParse(user.docs[0].data().schedules);

    if (!userAppointments.success) throw new Error('invalid appointments structure');

    const appointmentToUpdate = userAppointments.data.find((appointment) => appointment.id === id);

    if (!appointmentToUpdate) throw new Error('Agendamento não encontrado.');

    appointmentToUpdate.isDone = presence;

    const filteredAppointments = userAppointments.data.filter((appointmentsToKeep) => {
      return appointmentsToKeep.id !== appointmentToUpdate.id;
    });

    await updateDoc(appointmentRef, { isDone: presence });
    await updateDoc(userRef, { schedules: [...filteredAppointments, appointmentToUpdate] });

    return { status: 'sucess', message: 'Presença do agendamento atualizada com sucesso!' } as const;
  } catch (error) {
    if (!(error instanceof Error)) throw error;

    return {
      status: 'error',
      message: error.message,
    } as const;
  }
};
