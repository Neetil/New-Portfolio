
'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

export function ThemeToggleButton() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Ensure the component is mounted before rendering the theme-specific UI
  // to avoid hydration mismatch issues.
  React.useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    // Use resolvedTheme to handle 'system' preference correctly and toggle
    const currentEffectiveTheme = theme === 'system' ? resolvedTheme : theme;
    setTheme(currentEffectiveTheme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    // Render a placeholder or null until mounted to prevent hydration errors
    // and maintain layout consistency.
    return <Button variant="ghost" size="icon" disabled className="h-[1.2rem] w-[1.2rem]" />;
  }

  // Determine the current effective theme (light or dark) for display purposes
  const effectiveTheme = theme === 'system' ? resolvedTheme : theme;

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${effectiveTheme === 'dark' ? 'light' : 'dark'} mode`}>
      {effectiveTheme === 'dark' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
      ) : (
        <Moon className="h-[1.2rem] w-[1.2rem] transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}

