import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { firestore } from '@/firebaseConfig/firebase';
import { AppointmentsSchema } from '@/lib/schemas';

export const UpdateAppointmentPaymentLink = async (
  employeeId: string,
  appointmentId: string,
  paymentLink: string,
) => {
  try {
    const employee = await getDocs(query(collection(firestore, 'users'), where('id', '==', employeeId)));
    const appointment = await getDocs(
      query(collection(firestore, 'appointments'), where('id', '==', appointmentId)),
    );

    const appointmentRef = appointment.docs[0].ref;
    const employeeRef = employee.docs[0].ref;

    const employeeAppointments = AppointmentsSchema.safeParse(employee.docs[0].data().schedules);
    if (!employeeAppointments.success) throw new Error('invalid appointments structure');

    const appointmentToUpdate = employeeAppointments.data.find(
      (appointment) => appointment.id === appointmentId,
    );

    if (!appointmentToUpdate) throw new Error('appointment not found');

    appointmentToUpdate.paymentLink = paymentLink;

    const filteredAppointments = employeeAppointments.data.filter((appointmentsToKeep) => {
      return appointmentsToKeep.id !== appointmentToUpdate.id;
    });

    await updateDoc(appointmentRef, { paymentLink: paymentLink });
    await updateDoc(employeeRef, { schedules: [...filteredAppointments, appointmentToUpdate] });

    return { status: 'success', message: 'Link de pagamento salvo com sucesso!' } as const;
  } catch (error) {
    if (!(error instanceof Error)) throw error;

    return {
      status: 'error',
      message: 'Ops! Algo deu errado ao tentar salvar o link de pagamento.',
    } as const;
  }
};
