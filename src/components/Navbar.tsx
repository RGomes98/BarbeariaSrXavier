import { NavigationMenu } from './NavigationMenu';
import { ThemeButton } from './ThemeButton';
import { Logo } from './Logo';

export const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-card px-8 max-md:gap-2 max-md:px-6'>
      <Logo className='text-base' />
      <NavigationMenu />
      <ThemeButton />
    </nav>
  );
};
