import { GetUserByIdClient } from '@/services/GetUserByIdClient';
import { formatScheduleCaption } from '@/utils/caption';
import { getEmployee } from '@/services/getEmployees';
import { getHaircut } from '@/services/GetHairCuts';
import { Appointment } from '@/lib/schemas';

export const formatAppointmentsData = async (data: Appointment[]) => {
  return await Promise.all(
    data?.map(async (appointment) => {
      const isAppointmentRegular = appointment.type === 'REGULAR';
      const [employee, haircut, client] = await Promise.all([
        getEmployee(appointment.employeeId),
        getHaircut(appointment.haircutId),
        isAppointmentRegular ? GetUserByIdClient(appointment.userId) : { name: appointment.name },
      ]);

      return {
        clientName: client.name,
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
