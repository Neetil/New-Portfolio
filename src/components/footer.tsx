import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Footer() {
  return (
    <footer id="contact" className="py-6 border-t">
  
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by Neetil. © {new Date().getFullYear()}. All rights reserved.
        </p>
        <div className="flex items-center space-x-4">
          
           <Link href="https://github.com/Neetil" target="_blank" rel="noreferrer" aria-label="GitHub">
              <Github className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
           </Link>
           <Link href="https://www.linkedin.com/in/neetil-sahu-7327a8200/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <Linkedin className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
           </Link>
          
           <Link href="mailto:neetilwork@gmail.com" aria-label="Email">
              <Mail className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
           </Link>
        </div>
      </div>
    </footer>
  );
}
