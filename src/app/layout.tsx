import type { Metadata } from 'next';

import { PostHogProvider } from '@/presentation/components/providers';
import { Blur, Navigation, Source, Theme } from '@/presentation/components/ui';
import './globals.css';

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
      <meta name="apple-mobile-web-app-title" content="MyWebSite" />
      <body className="bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-100 font-sans transition-all duration-300">
        <PostHogProvider>
          <Blur />
          <Navigation />
          <Theme />
          <Source />
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
