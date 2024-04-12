import { getAppoimentsWithRedirect } from '@/services/server-side/getAppointments';
import { getEmployeesWithRedirect } from '@/services/server-side/getEmployees';
import { formatAppointmentsData } from '@/helpers/formatAppointmentsData';
import { Dashboard } from '@/components/Dashboard';
import { getSession } from '@/helpers/getSession';
import { Navbar } from '@/components/Navbar';

export default async function Page() {
  const [session, employees, appointments] = await Promise.all([
    getSession(),
    getEmployeesWithRedirect(),
    getAppoimentsWithRedirect(),
  ]);

  const appointmentsData = await formatAppointmentsData(appointments);

  return (
    <Dashboard session={session} employees={employees} appointmentsData={appointmentsData}>
      <Navbar />
    </Dashboard>
  );
}
