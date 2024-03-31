'use client';

import { useDashboardTableFilter } from '@/hooks/useDashboardTableFilter';
import { CalendarClock, Contact, ReceiptText } from 'lucide-react';
import { DashboardTableFilters } from './DashboardTableFilters';
import { FormattedAppointmentData, User } from '@/lib/schemas';
import { useDashboardTable } from '@/hooks/useDashboardTable';
import { formatScheduleCaption } from '@/utils/caption';
import { EmployeeEarnings } from './EmployeeEarnings';
import { DashboardTable } from './DashboardTable';
import { formatDateShort } from '@/utils/date';
import { Session } from '@/helpers/getSession';
import { Fragment } from 'react';

export const Dashboard = ({
  session,
  children,
  employees,
  appointmentsData,
}: {
  session: Session;
  employees: User[];
  children: React.ReactNode;
  appointmentsData: FormattedAppointmentData[];
}) => {
  const { filteredData, filteredDataByEmployee, date, status, employee } = useDashboardTableFilter(
    appointmentsData,
    employees,
  );
  const { columns } = useDashboardTable(filteredData[0]?.employeeId);

  return (
    <Fragment>
      {children}
      <div className='flex w-full flex-col gap-8 px-28 pb-20 pt-14 max-xl:px-14 max-lg:px-8 max-sm:px-6 max-sm:pt-6'>
        <div className='grid grid-cols-2 gap-4 max-lg:grid-cols-1 max-lg:gap-10'>
          <div className='flex flex-col gap-2 max-lg:flex-row max-lg:justify-between max-sm:flex-col'>
            <div className='flex flex-col gap-1 max-sm:gap-2'>
              <h1 className='w-full font-raleway text-4xl font-medium max-md:text-3xl'>Dashboard</h1>
              <p className='text-base font-light max-md:text-sm'>Análise e Monitoramento de Agendamentos </p>
            </div>
            <div className='flex flex-col gap-2'>
              <p className='flex items-center gap-1 text-sm font-light max-lg:justify-end max-sm:justify-start'>
                <CalendarClock className='size-5' /> {formatDateShort(date)}
              </p>
              <p className='flex items-center gap-1 text-sm font-light max-lg:justify-end max-sm:justify-start'>
                <Contact className='size-5' />
                {employee}
              </p>
              <p className='flex items-center gap-1 text-sm font-light max-lg:justify-end max-sm:justify-start'>
                <ReceiptText className='size-5' />
                {formatScheduleCaption(status)}
              </p>
            </div>
          </div>
          <EmployeeEarnings filteredData={filteredDataByEmployee} />
        </div>
        <DashboardTable session={session} tableData={{ data: filteredData, columns: columns }}>
          <DashboardTableFilters employees={employees} />
        </DashboardTable>
      </div>
    </Fragment>
  );
};
