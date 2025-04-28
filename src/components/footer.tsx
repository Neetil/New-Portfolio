import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils'; // Import cn for conditional classes

export function Footer() {
  return (
    <footer id="contact" className="py-6 border-t"> {/* Removed md:px-8 md:py-0 */}
      {/* Apply consistent horizontal padding */}
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-8 sm:px-12 md:px-16 lg:px-20 xl:px-48">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by Neetil. © {new Date().getFullYear()}. All rights reserved. {/* Updated name */}
        </p>
        <div className="flex items-center space-x-4">
           {/* Updated GitHub link */}
           <Link href="https://github.com/Neetil" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
           </Link>
           <Link href="https://www.linkedin.com/in/neetil-sahu-7327a8200/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
           </Link>
           {/* Updated Email link */}
           <Link href="mailto:neetilwork@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
           </Link>
        </div>
      </div>
    </footer>
  );
}
