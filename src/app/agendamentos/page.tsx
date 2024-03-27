import { getAccountTypeAppointments } from '@/helpers/getAccountTypeAppointments';
import { formatAppointmentsData } from '@/helpers/formatAppointmentsData';
import { getAppoiments } from '@/services/GetAppointments';
import { Appointments } from '@/components/Appointments';
import { getSession } from '@/helpers/getSession';
import { Navbar } from '@/components/Navbar';

export default async function Page() {
  const [session, appointments] = await Promise.all([getSession(), getAppoiments()]);
  const filteredAppointments = getAccountTypeAppointments(session, appointments);
  const appointmentsData = await formatAppointmentsData(filteredAppointments);

  return (
    <Appointments session={session} appointmentsData={appointmentsData}>
      <Navbar />
    </Appointments>
  );
}
