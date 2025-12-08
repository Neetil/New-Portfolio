# GitHub Contributions Setup Guide

To display your **private contributions** on your portfolio, you need to create a GitHub Personal Access Token and add it to your environment variables.

## Step 1: Create a GitHub Personal Access Token

1. Go to GitHub Settings: https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give your token a name (e.g., "Portfolio Contributions")
4. Select the following scopes:
   - ✅ `repo` (Full control of private repositories)
     - This allows the API to access your private repositories and contributions
5. Click **"Generate token"**
6. **Copy the token immediately** - you won't be able to see it again!

## Step 2: Add Token to Environment Variables

### For Local Development:

1. Create or edit `.env.local` in your project root:
   ```
   GITHUB_TOKEN=your_token_here
   ```

2. Replace `your_token_here` with the token you copied from GitHub

### For Vercel Deployment:

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `GITHUB_TOKEN`
   - **Value**: Your GitHub token
   - **Environment**: Production, Preview, Development (select all)
4. Click **Save**

## Step 3: Restart Your Development Server

After adding the token, restart your development server:

```bash
# Stop the current server (Ctrl+C)
# Then restart:
npm run dev
```

## Step 4: Verify It's Working

1. Visit your portfolio website
2. Check the GitHub Contributions section
3. You should now see your private contributions included!

## Security Notes

- ⚠️ **Never commit your `.env.local` file to Git** (it's already in `.gitignore`)
- ⚠️ **Never share your token publicly**
- ✅ The token is only used server-side in the API route
- ✅ It's never exposed to the client-side code

## Troubleshooting

If contributions still aren't showing:

1. **Check server logs** - Look for authentication messages in your terminal
2. **Verify token permissions** - Make sure the token has `repo` scope
3. **Check environment variable** - Ensure `GITHUB_TOKEN` is set correctly
4. **Restart server** - Environment variables are loaded on server start

## What the Token Does

The token allows the API to:
- Access your private repositories
- Fetch commits from private repos
- Include private contributions in the graph
- Access private events (PRs, issues, etc.)

Without the token, only public contributions are shown.

