import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Raíces Bahía Blanca - Materiales de Construcción en Seco',
  description: 'Distribuidores autorizados de las principales marcas de construcción en seco. Ofrecemos placas, perfiles, aislaciones, masillas y más en Bahía Blanca y zona.',
  keywords: ['construcción en seco', 'Bahía Blanca', 'materiales construcción', 'placas', 'perfiles', 'Durlock', 'Knauf'],
  authors: [{ name: 'Raíces Bahía Blanca' }],
  openGraph: {
    title: 'Raíces Bahía Blanca - Materiales de Construcción en Seco',
    description: 'Distribuidores autorizados de las principales marcas de construcción en seco.',
    type: 'website',
    locale: 'es_AR',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
