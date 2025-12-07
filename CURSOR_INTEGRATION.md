# Cursor IDE Status Integration Guide

To get real-time Cursor IDE status and accurate work time, you have several options:

## Option 1: Use WakaTime API (Recommended)

WakaTime tracks IDE usage automatically. You can integrate it:

1. Sign up at [WakaTime](https://wakatime.com)
2. Install WakaTime extension in Cursor IDE
3. Get your API key from WakaTime dashboard
4. Update the API route to fetch from WakaTime:

```typescript
// src/app/api/cursor-status/route.ts
const WAKATIME_API_KEY = process.env.WAKATIME_API_KEY;
const response = await fetch(
  `https://wakatime.com/api/v1/users/current/status_bar/today`,
  {
    headers: { Authorization: `Basic ${WAKATIME_API_KEY}` }
  }
);
```

## Option 2: Create a Local Monitoring Script

Create a Node.js script that monitors Cursor IDE:

1. Check if Cursor process is running
2. Track active time
3. Store in a database or call your API

Example script structure:
```javascript
// scripts/monitor-cursor.js
const { exec } = require('child_process');

setInterval(() => {
  // Check if Cursor is running
  exec('tasklist | findstr Cursor', (error, stdout) => {
    const isRunning = stdout.includes('Cursor.exe');
    // Send to your API
    fetch('http://localhost:3000/api/cursor-status', {
      method: 'POST',
      body: JSON.stringify({ isOnline: isRunning })
    });
  });
}, 5000);
```

## Option 3: Use Cursor's Extension API (If Available)

If Cursor IDE exposes an API or extension system, you can create an extension that reports status.

## Current Implementation

The current implementation:
- Shows a placeholder status
- Uses localStorage as fallback for work time
- Polls the API endpoint every 30 seconds
- Falls back gracefully if API is unavailable

To connect real data, update `src/app/api/cursor-status/route.ts` with your chosen method.

