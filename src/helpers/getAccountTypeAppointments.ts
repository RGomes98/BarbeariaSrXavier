import type { Appointment } from '@/lib/schemas';
import { Session } from '@/helpers/getSession';

export const getAccountTypeAppointments = (session: Session, appointments: Appointment[]) => {
  if (session?.accountType === 'USER') {
    return appointments.filter((appointment) => {
      return appointment.type === 'REGULAR' && appointment.userId === session.id;
    });
  }

  return appointments.filter(({ employeeId }) => {
    return employeeId === session?.id;
  });
};
