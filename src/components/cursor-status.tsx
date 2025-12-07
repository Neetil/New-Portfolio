'use client';

import { useState, useEffect, useRef } from 'react';

interface CursorStatusProps {
  initials?: string;
}

// API endpoint for Cursor status (you can set this up later)
const CURSOR_API_URL = process.env.NEXT_PUBLIC_CURSOR_API_URL || '/api/cursor-status';

export function CursorStatus({ initials = "NS" }: CursorStatusProps) {
  const [isOnline, setIsOnline] = useState(false);
  const [yesterdayWorkTime, setYesterdayWorkTime] = useState({ hours: 0, minutes: 0 });
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Format time helper
  const formatTime = (hours: number, minutes: number) => {
    if (hours === 0 && minutes === 0) return "0m";
    if (hours === 0) return `${minutes}m`;
    return `${hours}h ${minutes}m`;
  };

  // Fetch Cursor status from API (if available)
  const fetchCursorStatus = async () => {
    try {
      const response = await fetch(CURSOR_API_URL, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        cache: 'no-store',
      });
      
      if (response.ok) {
        const data = await response.json();
        setIsOnline(data.isOnline || false);
        if (data.yesterdayWorkTime) {
          setYesterdayWorkTime(data.yesterdayWorkTime);
        }
      }
    } catch (error) {
      // API not available, fall back to localStorage
      console.log('Cursor API not available, using fallback');
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback: Get work time from localStorage
  const getLocalWorkTime = () => {
    if (typeof window === 'undefined') return { hours: 0, minutes: 0 };
    
    try {
      const stored = localStorage.getItem('cursor_work_time');
      if (stored) {
        const data = JSON.parse(stored);
        const today = new Date().toDateString();
        
        // If it's a new day, return yesterday's time
        if (data.date !== today) {
          return data.yesterday || { hours: 0, minutes: 0 };
        }
        return data.yesterday || { hours: 0, minutes: 0 };
      }
    } catch (error) {
      console.error('Error reading work time:', error);
    }
    
    return { hours: 0, minutes: 0 };
  };

  useEffect(() => {
    setMounted(true);
    
    // Try to fetch from API first
    fetchCursorStatus();
    
    // Fallback to localStorage
    const localTime = getLocalWorkTime();
    if (localTime.hours === 0 && localTime.minutes === 0) {
      // Set default if nothing found
      setYesterdayWorkTime({ hours: 2, minutes: 34 });
    } else {
      setYesterdayWorkTime(localTime);
    }

    // Poll for status updates every 30 seconds (if API is available)
    const interval = setInterval(() => {
      fetchCursorStatus();
    }, 30000);

    // Check if page is visible as a fallback indicator
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // Page is visible, but we can't know if Cursor is open
        // This is just a fallback
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!mounted) {
    return null;
  }

  // Cursor Logo SVG Component - Official Cursor IDE Logo
  const CursorLogo = () => (
    <svg 
      className="w-3 h-3 flex-shrink-0" 
      fill="currentColor" 
      fillRule="evenodd" 
      viewBox="0 0 24 24" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Cursor</title>
      <path d="M22.106 5.68L12.5.135a.998.998 0 00-.998 0L1.893 5.68a.84.84 0 00-.419.726v11.186c0 .3.16.577.42.727l9.607 5.547a.999.999 0 00.998 0l9.608-5.547a.84.84 0 00.42-.727V6.407a.84.84 0 00-.42-.726zm-.603 1.176L12.228 22.92c-.063.108-.228.064-.228-.061V12.34a.59.59 0 00-.295-.51l-9.11-5.26c-.107-.062-.063-.228.062-.228h18.55c.264 0 .428.286.296.514z"></path>
    </svg>
  );

  return (
    <div className="inline-flex items-center gap-4 bg-background/95 backdrop-blur-sm border border-border rounded-xl px-4 py-3 shadow-md">
      {/* Status Indicator with Initials */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/30 via-secondary/20 to-accent/30 border border-border/60 flex items-center justify-center shadow-inner">
          <span className="text-sm font-bold text-foreground">{initials}</span>
        </div>
        {/* Status dot */}
        <div 
          className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-background ${
            isOnline 
              ? 'bg-green-500 shadow-lg shadow-green-500/50 animate-pulse' 
              : 'bg-gray-500'
          }`}
        />
      </div>

      {/* Status Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 text-sm">
          {isLoading ? (
            <span className="text-muted-foreground animate-pulse">Checking...</span>
          ) : (
            <>
              <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
              <span className="text-muted-foreground">
                {isOnline ? 'Online' : 'Offline'} in
              </span>
              {/* Cursor Logo */}
              <span className="text-foreground">
                <CursorLogo />
              </span>
              <span className="text-foreground font-semibold">Cursor</span>
            </>
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Yesterday worked {formatTime(yesterdayWorkTime.hours, yesterdayWorkTime.minutes)}
        </div>
      </div>
    </div>
  );
}
