import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ClerkProvider } from '@clerk/nextjs';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CADO',
  description: 'Connecting pet owners with loving pet sitters',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        elements: {
          formButtonPrimary: 'bg-brand-bg',
          footerActionLink: 'text-brand-bg',
          socialButtonsBlockButton: 'bg-white',
          card: 'bg-brand-fg',
        },
        variables: {
          colorPrimary: 'black',
        },
      }}
    >
      <html lang="en">
        <body className={`${inter.className} bg-brand-fg`}>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
