import { SignOut } from '@/services/SignOut';
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export const SignOutButton = ({ className }: JSX.IntrinsicElements['div']) => {
  const { refresh } = useRouter();

  return (
    <Button
      onClick={() =>
        SignOut(() => {
          refresh();
          toast.error('Sessão encerrada.');
        })
      }
      className={cn('w-full', className)}
    >
      Sair
    </Button>
  );
};
