import { formatAppointmentsData } from '@/helpers/formatAppointmentsData';
import { getAppoiments } from '@/services/GetAppointments';
import { getEmployees } from '@/services/getEmployees';
import { Dashboard } from '@/components/Dashboard';
import { getSession } from '@/helpers/getSession';
import { Navbar } from '@/components/Navbar';

export default async function Page() {
  const [session, employees, appointments] = await Promise.all([
    getSession(),
    getEmployees(),
    getAppoiments(),
  ]);

  const appointmentsData = await formatAppointmentsData(appointments);

  return (
    <Dashboard session={session} employees={employees} appointmentsData={appointmentsData}>
      <Navbar />
    </Dashboard>
  );
}
