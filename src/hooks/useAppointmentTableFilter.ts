import { validateDate, validateStatus } from '@/helpers/validateSearchParams';
import { FormattedAppointmentData } from '@/lib/schemas';
import { formatScheduleCaption } from '@/utils/caption';
import { useSearchParams } from 'next/navigation';

export const useAppointmentTableFilter = (data: FormattedAppointmentData[]) => {
  const searchParams = useSearchParams();
  const date = validateDate(searchParams.get('date'), String(new Date()));
  const status = validateStatus(searchParams.get('status'), 'PAID');

  const filteredData = data.filter(
    ({ appointmentDate, appointmentStatus }) =>
      new Date(appointmentDate).getDate() === new Date(date).getDate() &&
      appointmentStatus === formatScheduleCaption(status),
  );

  return { filteredData, date, status, searchParams };
};
