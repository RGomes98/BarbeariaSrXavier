import { validateDate, validateEmployee, validateStatus } from '@/helpers/validateSearchParams';
import { FormattedAppointmentData, User } from '@/lib/schemas';
import { formatScheduleCaption } from '@/utils/caption';
import { useSearchParams } from 'next/navigation';

export const useDashboardTableFilter = (data: FormattedAppointmentData[], employees: User[]) => {
  const validEmployees = employees.map(({ name }) => name);
  const searchParams = useSearchParams();

  const employee = validateEmployee(searchParams.get('employee'), validEmployees, validEmployees[0]);
  const date = validateDate(searchParams.get('date'), String(new Date()));
  const status = validateStatus(searchParams.get('status'), 'PENDING');

  const filteredData = data.filter((appointment) => {
    return (
      new Date(appointment.appointmentDate).getDate() === new Date(date).getDate() &&
      appointment.appointmentStatus === formatScheduleCaption(status) &&
      appointment.employeeName === employee
    );
  });

  const filteredDataByEmployee = data.filter((appointment) => {
    return (
      new Date(appointment.appointmentDate).getDate() === new Date(date).getDate() &&
      appointment.employeeName === employee
    );
  });

  return { filteredData, filteredDataByEmployee, date, status, employee };
};
