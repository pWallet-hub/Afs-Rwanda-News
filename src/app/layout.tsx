import React from 'react';
import { Poppins } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '900'],
  variable: '--font-poppins'
});

export const metadata = {
  title: 'AFS-NEWS-PAPER | Alliance for Science Rwanda',
  description: 'Bringing values & insights to scientific research news.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen flex flex-col font-sans">
        <AppProvider>
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </AppProvider>
      </body>
    </html>
  );
}