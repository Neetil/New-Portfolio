import { NextResponse } from 'next/server';

const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const WAKATIME_API_BASE = 'https://wakatime.com/api/v1';

// Helper function to convert seconds to hours and minutes
function secondsToHoursMinutes(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return { hours, minutes };
}

// Helper function to check if user is currently coding (online)
// Uses multiple approaches since WakaTime heartbeats may be delayed
async function checkOnlineStatus(): Promise<boolean> {
  if (!WAKATIME_API_KEY) {
    console.log('WAKATIME_API_KEY not found');
    return false;
  }

  try {
    // First, try the user status endpoint (most reliable)
    const userResponse = await fetch(
      `${WAKATIME_API_BASE}/users/current`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
        },
        next: { revalidate: 0 }
      }
    );

    if (userResponse.ok) {
      const userData = await userResponse.json();
      if (userData.data && userData.data.last_heartbeat_at) {
        const lastActivity = new Date(userData.data.last_heartbeat_at);
        const now = new Date();
        const minutesSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60);
        // Consider online if activity within last 2 hours (generous window for delayed sync)
        const isOnline = minutesSinceActivity <= 120;
        console.log(`User status - Last heartbeat: ${minutesSinceActivity.toFixed(1)} minutes ago, Online: ${isOnline}`);
        return isOnline;
      }
    }

    // Fallback 1: Try heartbeats endpoint
    const today = new Date().toISOString().split('T')[0];
    const heartbeatResponse = await fetch(
      `${WAKATIME_API_BASE}/users/current/heartbeats?date=${today}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
        },
        next: { revalidate: 0 }
      }
    );

    if (heartbeatResponse.ok) {
      const heartbeatData = await heartbeatResponse.json();
      if (heartbeatData.data && heartbeatData.data.length > 0) {
        const latestHeartbeat = heartbeatData.data[0];
        if (latestHeartbeat.time) {
          const lastActivity = new Date(latestHeartbeat.time * 1000);
          const now = new Date();
          const minutesSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60);
          // Consider online if activity within last 2 hours
          const isOnline = minutesSinceActivity <= 120;
          console.log(`Heartbeats - Last activity: ${minutesSinceActivity.toFixed(1)} minutes ago, Online: ${isOnline}`);
          return isOnline;
        }
      }
    }

    // Fallback 2: Status bar endpoint
    return await checkOnlineStatusFallback();
  } catch (error) {
    console.error('Error checking online status:', error);
    return await checkOnlineStatusFallback();
  }
}

// Fallback method using status bar endpoint
async function checkOnlineStatusFallback(): Promise<boolean> {
  if (!WAKATIME_API_KEY) return false;

  try {
    const response = await fetch(
      `${WAKATIME_API_BASE}/users/current/status_bar/today`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
        },
        next: { revalidate: 0 }
      }
    );

    if (!response.ok) {
      console.error('WakaTime status bar API error:', response.status);
      return false;
    }

    const data = await response.json();
    console.log('Status bar data:', JSON.stringify(data, null, 2));
    
    // Check if there's coding activity today
    if (data.data) {
      // If there's any time tracked today, check when it was last updated
      if (data.data.grand_total && data.data.grand_total.total_seconds > 0) {
        // Check if there's a modified_at timestamp
        if (data.data.modified_at) {
          const lastActivity = new Date(data.data.modified_at);
          const now = new Date();
          const minutesSinceActivity = (now.getTime() - lastActivity.getTime()) / (1000 * 60);
          const isOnline = minutesSinceActivity <= 120; // 2 hours for status bar fallback
          console.log(`Status bar - Last activity: ${minutesSinceActivity.toFixed(1)} minutes ago, Online: ${isOnline}`);
          return isOnline;
        }
        // If modified_at not available, check if there's recent activity by checking today's total
        // If user has coded today, they might be online (less reliable)
        return true; // Optimistic: if they coded today, assume online
      }
    }
    
    return false;
  } catch (error) {
    console.error('Error in fallback online status check:', error);
    return false;
  }
}

// Get yesterday's work time
async function getYesterdayWorkTime(): Promise<{ hours: number; minutes: number }> {
  if (!WAKATIME_API_KEY) {
    return { hours: 0, minutes: 0 };
  }

  try {
    // Get yesterday's date
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0]; // Format: YYYY-MM-DD

    // Fetch summary for yesterday
    const response = await fetch(
      `${WAKATIME_API_BASE}/users/current/summaries?start=${yesterdayStr}&end=${yesterdayStr}`,
      {
        headers: {
          'Authorization': `Basic ${Buffer.from(WAKATIME_API_KEY).toString('base64')}`,
        },
        next: { revalidate: 3600 } // Cache for 1 hour (yesterday's data won't change)
      }
    );

    if (!response.ok) {
      console.error('WakaTime API error:', response.status, response.statusText);
      return { hours: 0, minutes: 0 };
    }

    const data = await response.json();
    
    // Extract total coding time from yesterday
    if (data.data && data.data.length > 0) {
      const yesterdayData = data.data[0];
      if (yesterdayData.grand_total) {
        const totalSeconds = yesterdayData.grand_total.total_seconds || 0;
        return secondsToHoursMinutes(totalSeconds);
      }
    }

    return { hours: 0, minutes: 0 };
  } catch (error) {
    console.error('Error fetching yesterday work time:', error);
    return { hours: 0, minutes: 0 };
  }
}

export async function GET() {
  try {
    // If no API key is configured, return placeholder data
    if (!WAKATIME_API_KEY) {
      console.warn('WAKATIME_API_KEY not configured. Using placeholder data.');
      return NextResponse.json({
        isOnline: false,
        yesterdayWorkTime: {
          hours: 0,
          minutes: 0
        },
        lastUpdated: new Date().toISOString(),
        note: 'WakaTime API key not configured. See WAKATIME_SETUP.md for setup instructions.'
      });
    }

    // Fetch both online status and yesterday's work time in parallel
    const [isOnline, yesterdayWorkTime] = await Promise.all([
      checkOnlineStatus(),
      getYesterdayWorkTime()
    ]);

    return NextResponse.json({
      isOnline,
      yesterdayWorkTime,
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching Cursor status:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Cursor status',
        isOnline: false,
        yesterdayWorkTime: { hours: 0, minutes: 0 }
      },
      { status: 500 }
    );
  }
}

