import { AppointmentsTable, columns } from './AppointmentsTable';
import { FormattedAppointmentData } from '@/lib/schemas';
import type { Session } from '@/helpers/getSession';
import { Navbar } from './Navbar';
import { Fragment } from 'react';

export const Appointments = async ({
  session,
  appointmentsData,
}: {
  session: Session;
  appointmentsData: FormattedAppointmentData[];
}) => {
  return (
    <Fragment>
      <Navbar />
      <div className='flex w-full flex-col gap-8 px-28 pb-16 pt-10 max-xl:px-14 max-lg:px-8'>
        <h1 className='font-raleway text-4xl font-semibold uppercase max-md:text-3xl'>Agendamentos</h1>
        <AppointmentsTable session={session} tableData={{ data: appointmentsData, columns: columns }} />
      </div>
    </Fragment>
  );
};
