import { NavigationMenu } from './NavigationMenu';
import { ThemeButton } from './ThemeButton';
import { Logo } from './Logo';

export const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 flex h-14 items-center gap-4 border-b border-border/40 bg-card/95 px-8 backdrop-blur supports-[backdrop-filter]:bg-card/60 max-md:gap-2 max-md:px-6'>
      <Logo className='text-base' />
      <NavigationMenu />
      <ThemeButton />
    </nav>
  );
};
