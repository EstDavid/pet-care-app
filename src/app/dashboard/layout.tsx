import Footer from '@/components/navigation/footer';
import Header from '@/components/navigation/header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CADO - Dashboard'
};

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className="flex h-screen flex-col justify-between bg-brand-fg">
      <Header />
      <div className="w-full flex-grow p-5 overflow-auto container">
        {children}
      </div>
      <Footer />
    </section>
  );
}
