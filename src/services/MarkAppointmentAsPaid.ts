import { Employee, UsersSchema } from '@/lib/schemas';
import { firestore } from 'firebase-admin';
import { redirect } from 'next/navigation';

export const MarkAppointmentAsPaid = async (appointmentId: string) => {
  try {
    const appointments = await firestore().collection('appointments').where('id', '==', appointmentId).get();
    const appointmentRef = appointments.docs[0].ref;
    appointmentRef.update({ status: 'PAID' });

    const users = UsersSchema.parse(
      (await firestore().collection('users').get()).docs.map((users) => users.data()),
    );

    const appointmentEmployee = users
      .filter((user): user is Employee => user.accountType === 'ADMIN' || user.accountType === 'EMPLOYEE')
      .find((employee) => employee.schedules?.some((schedule) => schedule.id === appointmentId));

    const appointmentToUpdate = appointmentEmployee?.schedules?.find((schedule) => {
      return schedule.id === appointmentId;
    });

    if (!appointmentToUpdate) throw new Error('appointment not found');
    appointmentToUpdate.status = 'PAID';

    const employeeToUpdate = await firestore()
      .collection('users')
      .where('id', '==', appointmentEmployee?.id)
      .get();

    const employeeRef = employeeToUpdate.docs[0].ref;
    employeeRef.update({ schedules: appointmentEmployee?.schedules });
  } catch (error) {
    redirect('/');
  }
};
