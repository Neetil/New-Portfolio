import type {Metadata} from 'next';
import {Geist} from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { BackToTop } from "@/components/back-to-top";
import { Analytics } from "@vercel/analytics/react";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Neetil - Developer',
  description: 'A personal portfolio showcasing projects and skills by Neetil, a Full-Stack Developer.',
  icons: {
    icon: [
      {
        url: '/images/favicon/n-favicon.png',
        href: '/images/favicon/n-favicon.png',
      },
    ],
    apple: {
      url: '/images/favicon/n-favicon.png',
      sizes: '180x180',
      type: 'image/png',
    },
  },
  openGraph: {
    title: 'Portfolio Pilot | Neetil',
    description: 'A personal portfolio showcasing projects and skills by Neetil, a Full-Stack Developer.',
    images: ['/images/logo/neetil-logo.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portfolio Pilot | Neetil',
    description: 'A personal portfolio showcasing projects and skills by Neetil, a Full-Stack Developer.',
    images: ['/images/logo/neetil-logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
      <link rel="icon" href="/images/favicon/n-favicon.png" sizes="any" />
         {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1176797311571595"
          crossOrigin="anonymous"
        ></script>
        </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable
        )}
      >
        <Header />
        <main className="flex flex-col min-h-[calc(100vh-theme(spacing.16))]">
          {children}
        </main>
        <Footer />
        <Toaster />
        <BackToTop />
        <Analytics />
      </body>
    </html>
  );
}
