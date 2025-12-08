'use client';

import { useState, useEffect, useRef } from 'react';
import { Skeleton } from "@/components/ui/skeleton";

interface ContributionDay {
  date: string;
  count: number;
}

interface ContributionsData {
  contributions: ContributionDay[];
  totalContributions: number;
  currentYearContributions: number;
}

// Get color intensity based on contribution count
function getContributionColor(count: number, maxCount: number): string {
  if (count === 0) return 'bg-muted/20';
  
  const intensity = count / maxCount;
  
  // GitHub-like green gradient
  if (intensity <= 0.1) return 'bg-green-500/20';
  if (intensity <= 0.3) return 'bg-green-500/40';
  if (intensity <= 0.5) return 'bg-green-500/60';
  if (intensity <= 0.7) return 'bg-green-500/80';
  return 'bg-green-500';
}

// Format date to YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function GitHubContributions() {
  const [data, setData] = useState<ContributionsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredDay, setHoveredDay] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const monthLabelsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchContributions = async () => {
      try {
        const response = await fetch('/api/github-contributions', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });
        
        if (response.ok) {
          const result = await response.json();
          setData(result);
        }
      } catch (error) {
        console.error('Error fetching contributions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContributions();
    
    // Refresh every 5 minutes for real-time updates
    const interval = setInterval(fetchContributions, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  // Scroll to right (most recent) on mount and when data loads
  useEffect(() => {
    if (!isLoading && scrollContainerRef.current) {
      // Scroll to the rightmost position (showing most recent contributions)
      const scrollToRight = () => {
        if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
          // Also scroll month labels
          if (monthLabelsRef.current) {
            monthLabelsRef.current.scrollLeft = monthLabelsRef.current.scrollWidth;
          }
        }
      };
      // Small delay to ensure DOM is ready
      setTimeout(scrollToRight, 100);
    }
  }, [isLoading, data]);

  if (isLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-semibold min-w-[180px]">GitHub Contributions</h3>
          <Skeleton className="h-32 w-full" />
        </div>
      </div>
    );
  }

  if (!data || data.contributions.length === 0) {
    return null;
  }

  // Create a map for quick lookup
  const contributionsMap = new Map<string, number>();
  data.contributions.forEach(day => {
    contributionsMap.set(day.date, day.count);
  });

  // Find max count for color scaling
  const maxCount = Math.max(...data.contributions.map(d => d.count), 1);

  // Generate calendar grid (past year) - exactly 53 weeks
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - 364); // Exactly 365 days (53 weeks * 7 - 1)
  startDate.setHours(0, 0, 0, 0);
  
  // Find the Sunday of the week containing startDate
  const dayOfWeek = startDate.getDay();
  const daysToSubtract = dayOfWeek;
  startDate.setDate(startDate.getDate() - daysToSubtract);

  const weeks: { date: Date; count: number }[][] = [];
  let currentWeek: { date: Date; count: number }[] = [];
  const currentDate = new Date(startDate);

  // Generate exactly 53 weeks
  for (let week = 0; week < 53; week++) {
    currentWeek = [];
    for (let day = 0; day < 7; day++) {
      const dateStr = formatDate(currentDate);
      const count = contributionsMap.get(dateStr) || 0;
      currentWeek.push({ date: new Date(currentDate), count });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    weeks.push(currentWeek);
  }

  // Get month labels - only show first occurrence of each month
  const monthLabels: { month: string; weekIndex: number }[] = [];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  let lastMonth = -1;
  weeks.forEach((week, weekIndex) => {
    if (week.length > 0) {
      const firstDay = week[0].date;
      const month = firstDay.getMonth();
      // Only add label if it's the first week of the month or if we haven't seen this month yet
      if (month !== lastMonth) {
        monthLabels.push({ month: months[month], weekIndex });
        lastMonth = month;
      }
    }
  });

  // Get current year
  const currentYear = new Date().getFullYear();
  const currentYearContributions = data.currentYearContributions || data.totalContributions;

  // Format date for display
  const formatDisplayDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Calculate square size - responsive
  const squareSize = 'w-[10px] h-[10px] sm:w-[11px] sm:h-[11px]';
  const gapSize = 'gap-[3px]';

  return (
    <div className="space-y-3">
      {/* Heading */}
      <div>
        <h3 className="text-lg font-semibold">GitHub Contributions</h3>
        <p className="text-sm text-muted-foreground mt-1">
          {currentYearContributions} contributions in {currentYear}
        </p>
      </div>

      {/* Graph Container */}
      <div className="w-full overflow-hidden">
        <div className="w-full">
          <div className="space-y-2">
            {/* Month labels - synchronized with grid scroll */}
            <div 
              ref={monthLabelsRef}
              className="flex gap-0 pl-[26px] text-[10px] sm:text-xs text-muted-foreground relative h-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              style={{ 
                width: '100%'
              }}
            >
              <div className="flex gap-0 relative" style={{ width: `${weeks.length * 13}px` }}>
                {monthLabels.map(({ month, weekIndex }) => (
                  <div
                    key={`${month}-${weekIndex}`}
                    className="absolute text-[10px] sm:text-xs whitespace-nowrap"
                    style={{ left: `${weekIndex * 13}px` }}
                  >
                    {month}
                  </div>
                ))}
              </div>
            </div>

            {/* Calendar grid */}
            <div 
              ref={scrollContainerRef}
              className="flex gap-0 overflow-x-auto sm:overflow-x-auto scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent"
              style={{ scrollbarWidth: 'thin' }}
              onScroll={(e) => {
                // Sync month labels scroll with grid scroll
                if (monthLabelsRef.current) {
                  monthLabelsRef.current.scrollLeft = e.currentTarget.scrollLeft;
                }
              }}
            >
              <div className="flex gap-0">
                {/* Day labels */}
                <div className={`flex flex-col ${gapSize} text-[10px] sm:text-xs text-muted-foreground pt-1 flex-shrink-0`}>
                  <div className="h-[10px] sm:h-[11px]"></div>
                  <div className="h-[10px] sm:h-[11px]">Mon</div>
                  <div className="h-[10px] sm:h-[11px]"></div>
                  <div className="h-[10px] sm:h-[11px]">Wed</div>
                  <div className="h-[10px] sm:h-[11px]"></div>
                  <div className="h-[10px] sm:h-[11px]">Fri</div>
                  <div className="h-[10px] sm:h-[11px]"></div>
                </div>

                {/* Contribution squares */}
                <div className={`flex ${gapSize} pb-2`}>
                  {weeks.map((week, weekIndex) => (
                    <div key={weekIndex} className={`flex flex-col ${gapSize} flex-shrink-0`}>
                      {week.map((day, dayIndex) => {
                        const dateStr = formatDate(day.date);
                        const isHovered = hoveredDay === dateStr;
                        const isFuture = day.date > today;
                        
                        return (
                          <div
                            key={`${weekIndex}-${dayIndex}`}
                            className={`${squareSize} rounded-[2px] transition-all cursor-pointer flex-shrink-0 ${
                              isFuture 
                                ? 'bg-muted/10 cursor-not-allowed' 
                                : getContributionColor(day.count, maxCount)
                            } ${
                              isHovered ? 'ring-1 ring-foreground scale-125 z-10 relative' : ''
                            }`}
                            onMouseEnter={() => !isFuture && setHoveredDay(dateStr)}
                            onMouseLeave={() => setHoveredDay(null)}
                            title={
                              isFuture
                                ? 'Future date'
                                : `${day.count} contribution${day.count !== 1 ? 's' : ''} on ${formatDisplayDate(day.date)}`
                            }
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-end gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-muted-foreground pt-1">
              <span>Less</span>
              <div className={`flex ${gapSize}`}>
                <div className={`${squareSize} rounded-[2px] bg-muted/20`}></div>
                <div className={`${squareSize} rounded-[2px] bg-green-500/20`}></div>
                <div className={`${squareSize} rounded-[2px] bg-green-500/40`}></div>
                <div className={`${squareSize} rounded-[2px] bg-green-500/60`}></div>
                <div className={`${squareSize} rounded-[2px] bg-green-500/80`}></div>
                <div className={`${squareSize} rounded-[2px] bg-green-500`}></div>
              </div>
              <span>More</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
