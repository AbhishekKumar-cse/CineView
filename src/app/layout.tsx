import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Toaster } from '@/components/ui/toaster';

const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontSpaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  metadataBase: new URL('http://localhost:9002'),
  title: {
    default: 'CineView: Your Modern Movie Directory',
    template: '%s | CineView',
  },
  description:
    'Explore a vast collection of movies and TV shows. Get details, ratings, and AI-powered recommendations in a beautiful, modern interface.',
  openGraph: {
    title: 'CineView: Your Modern Movie Directory',
    description: 'Explore a vast collection of movies and TV shows.',
    images: ['/og-image.png'],
    type: 'website',
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CineView: Your Modern Movie Directory',
    description: 'Explore a vast collection of movies and TV shows.',
    images: ['/og-image.png'],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased',
          fontInter.variable,
          fontSpaceGrotesk.variable
        )}
      >
        <ThemeProvider>
          <div className="relative flex min-h-dvh flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
