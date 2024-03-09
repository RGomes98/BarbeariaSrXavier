export const Navbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <nav className='sticky top-0 z-50 flex h-14 items-center gap-4 border-b bg-card px-8 max-md:gap-2 max-md:px-6'>
      {children}
    </nav>
  );
};
