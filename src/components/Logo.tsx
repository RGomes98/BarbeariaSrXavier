'use client';

import { useMounted } from '@/hooks/useMounted';
import { usePathname } from 'next/navigation';
import { Poppins } from 'next/font/google';
import { Scissors } from 'lucide-react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

const poppins = Poppins({ subsets: ['latin'], fallback: ['system-ui'], weight: ['500'] });

export const Logo = ({ className }: JSX.IntrinsicElements['div']) => {
  const { isMounted } = useMounted();
  const { theme } = useTheme();
  const path = usePathname();

  const isNotAtLoginPage = theme === 'light' && path !== '/entrar' && path !== '/registrar';

  return (
    <div
      className={cn(
        `flex items-center gap-4 whitespace-nowrap text-2xl text-gray-200 ${poppins.className}`,
        className,
        { 'text-slate-800': isNotAtLoginPage && isMounted },
      )}
    >
      <Scissors className='size-6 min-w-6 max-md:size-6' />
      <h1 className='whitespace-nowrap'>Barbearia Sr. Xavier</h1>
    </div>
  );
};
