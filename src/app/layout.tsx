import React from 'react';
import '../styles/globals.css';
import { Inter } from 'next/font/google';
import Navigation from '../components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Devine - Coffrets de vin',
  description: 'Commandez vos coffrets de vin en groupe',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
} 