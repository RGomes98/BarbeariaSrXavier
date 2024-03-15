'use client';

import { Table, TableBody, TableCaption, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useBarberShopActions } from '@/hooks/useBarberShopActions';
import { Haircut, User, workingHours } from '@/lib/schemas';
import { type Session } from '@/helpers/getSession';
import { HaircutOptions } from './HaircutOptions';
import { formatDateShort } from '@/utils/date';
import { TableContent } from './TableContent';

export const HaircutSchedules = ({
  haircut,
  session,
  employees,
}: {
  haircut: Haircut;
  session: Session;
  employees: User[];
}) => {
  const { scheduleDate } = useBarberShopActions(employees);

  return (
    <div className='mt-auto flex h-full w-full max-w-[700px] flex-col justify-center gap-14 max-[1350px]:max-w-none max-md:gap-8'>
      <span className='font-raleway text-3xl font-medium max-md:text-2xl'>
        Horários de {formatDateShort(scheduleDate)}
      </span>
      <HaircutOptions employees={employees} />
      <Table>
        <TableCaption>Veja os horários disponíveis para agendar seu corte.</TableCaption>
        <TableHeader className='pointer-events-none'>
          <TableRow className='max-md:text-xs'>
            <TableHead>Hora</TableHead>
            <TableHead>Dia</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className='text-right'>Profissional</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {workingHours.map((hour) => {
            return (
              <TableContent
                key={hour}
                hour={hour}
                haircut={haircut}
                session={session}
                employees={employees}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
