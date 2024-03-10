import { ThemeProvider } from '@/ThemeProvider';
import { GeistSans } from 'geist/font/sans';
import { Poppins } from 'next/font/google';
import type { Metadata } from 'next';

import '@/stylesheets/globals.css';

export const metadata: Metadata = {
  title: 'Barbearia Sr. Xavier',
  description: '',
};

const poppins = Poppins({
  subsets: ['latin'],
  fallback: ['system-ui'],
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={`${GeistSans.className} ${poppins.variable}`}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
