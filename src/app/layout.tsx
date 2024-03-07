import { ThemeProvider } from '@/ThemeProvider';
import { GeistSans } from 'geist/font/sans';
import type { Metadata } from 'next';

import '@/stylesheets/globals.css';

export const metadata: Metadata = {
  title: 'Barbearia Sr. Xavier',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-BR'>
      <body className={GeistSans.className}>
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
