import { getSession } from '@/helpers/getSession';
import { Schedule } from '@/components/Schedule';

export default async function Page({ params: { id } }: { params: { id: string } }) {
  const session = await getSession();
  return <Schedule session={session} scheduleId={id} />;
}
