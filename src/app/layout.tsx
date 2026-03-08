import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { InsforgeProvider } from './providers';
import { PresenceTracker } from '@/components/PresenceTracker';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pontsix Traders | Where Traders Talk Markets',
  description: 'A real-time social platform optimized for traders and market discussion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-black text-slate-100 antialiased h-screen overflow-hidden`}>
        <InsforgeProvider>
          <PresenceTracker />
          {children}
        </InsforgeProvider>
      </body>
    </html>
  );
}
