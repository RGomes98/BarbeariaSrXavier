import { Schedule } from '@/components/Schedule/Schedule';
import { getSession } from '@/helpers/getSession';

export default function Page({ params: { id } }: { params: { id: string } }) {
  const session = getSession();
  return <Schedule session={session} scheduleId={id} />;
}
