import type {Metadata} from 'next';
import {Geist} from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from '@/providers/theme-provider'; // Import ThemeProvider

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

// Removed Geist Mono as it's not explicitly used and font-sans is set globally
// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin'],
// });

export const metadata: Metadata = {
  title: 'Portfolio Pilot | Neetil', // Updated name
  description: 'A personal portfolio showcasing projects and skills.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Removed extra whitespace causing hydration error
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          geistSans.variable
          // geistMono.variable // Removed as font-sans is applied globally
        )}
      >
        <ThemeProvider> {/* Wrap with ThemeProvider */}
          <Header />
          {/* Applied consistent horizontal padding */}
          <main className="flex flex-col min-h-[calc(100vh-theme(spacing.16))] px-8 sm:px-12 md:px-16 lg:px-20 xl:px-48">
            {children}
          </main>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
