'use client';

import { useAppointmentTableFilter } from '@/hooks/useAppointmentTableFilter';
import { AppointmentsTableFilters } from './AppointmentsTableFilters';
import { useAppointmentsTable } from '@/hooks/useAppointmentsTable';
import { FormattedAppointmentData } from '@/lib/schemas';
import { AppointmentsTable } from './AppointmentsTable';
import type { Session } from '@/helpers/getSession';
import { Fragment } from 'react';

export const Appointments = ({
  session,
  children,
  appointmentsData,
}: {
  session: Session;
  children: React.ReactNode;
  appointmentsData: FormattedAppointmentData[];
}) => {
  const { filteredData } = useAppointmentTableFilter(appointmentsData);
  const { columns } = useAppointmentsTable(session);

  return (
    <Fragment>
      {children}
      <div className='flex w-full flex-col gap-8 px-28 pb-14 pt-10 max-xl:px-14 max-lg:px-8'>
        <div className='flex flex-col gap-1'>
          <h1 className='w-full font-raleway text-4xl font-medium max-md:text-3xl'>Agendamentos</h1>
          <p className='text-base  font-light max-md:text-sm'>
            Veja e Gerencie seus Próximos Cortes Agendados
          </p>
        </div>
        <AppointmentsTable session={session} tableData={{ data: filteredData, columns: columns }}>
          <AppointmentsTableFilters />
        </AppointmentsTable>
      </div>
    </Fragment>
  );
};
