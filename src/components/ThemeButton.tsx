'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useMounted } from '@/hooks/useMounted';
import { useTheme } from 'next-themes';
import { Button } from './ui/button';

export const ThemeButton = () => {
  const { theme, setTheme } = useTheme();
  const { isMounted } = useMounted();

  const isDarkModeActive = theme === 'dark';

  return (
    <Button
      size='icon'
      variant='ghost'
      className='text-white'
      onClick={() => setTheme(isDarkModeActive ? 'light' : 'dark')}
    >
      {isDarkModeActive && isMounted ? <SunIcon /> : <MoonIcon className='text-slate-800' />}
    </Button>
  );
};
