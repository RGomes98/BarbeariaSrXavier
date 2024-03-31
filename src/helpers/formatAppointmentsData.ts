import { GetUserByIdClient } from '@/services/GetUserByIdClient';
import { formatScheduleCaption } from '@/utils/caption';
import { getEmployee } from '@/services/getEmployees';
import { getHaircut } from '@/services/GetHairCuts';
import { Appointment } from '@/lib/schemas';

export const formatAppointmentsData = async (data: Appointment[]) => {
  return await Promise.all(
    data?.map(async (appointment) => {
      const isAppointmentRegular = appointment.type === 'REGULAR';
      const [haircut, employee, client] = await Promise.all([
        getHaircut(appointment.haircutId),
        getEmployee(appointment.employeeId),
        isAppointmentRegular ? GetUserByIdClient(appointment.userId) : { name: appointment.name },
      ]);

      return {
        clientName: client.name,
        employeeId: employee.id,
        haircutName: haircut.name,
        employeeName: employee.name,
        haircutPrice: haircut.price,
        appointmentId: appointment.id,
        paymentMethod: appointment.paymentMethod,
        appointmentDate: appointment.scheduleDate,
        appointmentStatus: formatScheduleCaption(appointment.status),
      };
    }),
  );
};
