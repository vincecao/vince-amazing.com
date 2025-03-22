import type { Metadata } from 'next';
import './globals.css';
import Nav from './_nav';

export const metadata: Metadata = {
  title: 'LINENG CAO | VINCEC',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 font-sans transition-all duration-300">
        <Nav />
        {children}
      </body>
    </html>
  );
}
