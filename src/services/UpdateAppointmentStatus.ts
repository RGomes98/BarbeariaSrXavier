import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { AppointmentsSchema, Status } from '@/lib/schemas';
import { firestore } from '@/firebaseConfig/firebase';

export const UpdateAppointmentStatus = async (id: string, status: Status, userId?: string) => {
  const appointment = await getDocs(query(collection(firestore, 'appointments'), where('id', '==', id)));
  const user = await getDocs(query(collection(firestore, 'users'), where('id', '==', userId)));
  const appointmentRef = appointment.docs[0].ref;
  const userRef = user.docs[0].ref;

  try {
    const userAppointments = AppointmentsSchema.safeParse(user.docs[0].data().schedules);
    if (!userAppointments.success) throw new Error('invalid appointments structure');

    const appointmentToUpdate = userAppointments.data.find((appointment) => appointment.id === id);
    if (!appointmentToUpdate) throw new Error('appointment not found');

    appointmentToUpdate.status = status;

    const filteredAppointments = userAppointments.data.filter((appointmentsToKeep) => {
      return appointmentsToKeep.id !== appointmentToUpdate.id;
    });

    await updateDoc(appointmentRef, { status: status });
    await updateDoc(userRef, { schedules: [...filteredAppointments, appointmentToUpdate] });

    return { status: 'sucess', message: 'Status do agendamento atualizado com sucesso!' } as const;
  } catch (error) {
    if (error instanceof Error)
      return {
        status: 'error',
        message: 'Ops! Algo deu errado ao tentar alterar o status do agendamento.',
      } as const;
    throw error;
  }
};
