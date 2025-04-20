import type { Metadata } from 'next';

import BlurBackgroundWrapper from './_components/BlurBackgroundWrapper';
import Navigation from './_components/Navigation';
import { PostHogProvider } from './_components/PostHogProvider';
import Source from './_components/Source';
import ThemeToggle from './_components/ThemeToggle';
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
          <Navigation />
          <ThemeToggle />
          <Source />
          {children}
          <BlurBackgroundWrapper />
        </PostHogProvider>
      </body>
    </html>
  );
}
