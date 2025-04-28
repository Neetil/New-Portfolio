'use client'; // Required for Sheet state management

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { ThemeToggleButton } from './theme-toggle-button';
import { MusicPlayer } from './music-player'; // Import the MusicPlayer component
import { useState } from 'react'; // Import useState for sheet management
import { cn } from '@/lib/utils'; // Import cn for conditional classes

export function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false); // State for mobile sheet

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#contact' },
    { label: 'AI Assistant', href: '#ai-assistant' },
  ];

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Apply consistent horizontal padding */}
      <div className="container flex h-14 items-center px-8 sm:px-12 md:px-16 lg:px-20 xl:px-48">
        <Link href="#home" className="mr-6 flex items-center space-x-2">
          <div className="relative w-8 h-8 mr-2">
            <Image
              src="/images/logo/neetil-logo.png"
              alt="Neetil Logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </div>
          <span className="font-bold sm:inline-block">Portfolio Pilot</span>
        </Link>
        <nav className="hidden gap-6 md:flex flex-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4"> {/* Adjust spacing */}
          {/* Music player is now always visible */}
          <MusicPlayer />

          {/* Theme toggle button is now always visible, even on mobile */}
          <ThemeToggleButton />

          <div className="md:hidden">
            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="p-6"> {/* Add padding inside sheet */}
                  <nav className="flex flex-col gap-4 mt-8">
                    {navItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="block px-2 py-1 text-lg font-medium hover:underline"
                        onClick={closeSheet} // Close sheet on click
                      >
                        {item.label}
                      </Link>
                    ))}
                    {/* Removed theme toggle button from here since it's now always visible in the header */}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
