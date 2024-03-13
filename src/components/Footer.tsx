import { Logo } from './Logo';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='flex justify-center border-t border-border/80 px-8 py-10'>
      <div className='flex flex-col gap-4 text-center'>
        <div className='flex items-center justify-center gap-2 whitespace-nowrap'>
          <Logo className='justify-center text-base' />© {currentYear}
        </div>
        <span className='max-w-[500px]'>
          Condomínio do Edifício Cecisa II - Largo Nove de Abril, Sala 214 - Vila Santa Cecília, Volta Redonda
          - RJ, 27260-180
        </span>
      </div>
    </footer>
  );
};
