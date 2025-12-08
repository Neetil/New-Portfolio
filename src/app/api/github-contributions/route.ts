import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'Neetil';
const GITHUB_API_BASE = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface ContributionDay {
  date: string; // YYYY-MM-DD
  count: number;
}

// Helper function to get authentication headers
function getAuthHeaders(additionalHeaders: Record<string, string> = {}) {
  const headers: Record<string, string> = {
    'Accept': 'application/vnd.github.v3+json',
    ...additionalHeaders,
  };
  
  if (GITHUB_TOKEN) {
    headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  }
  
  return headers;
}

// Get commits using search API (more reliable for finding all commits)
async function getCommitsBySearch(since: Date, until: Date): Promise<Map<string, number>> {
  const commitsMap = new Map<string, number>();
  
  try {
    // GitHub Search API allows searching commits by author
    // Format: YYYY-MM-DDTHH:MM:SSZ
    const sinceStr = since.toISOString().split('.')[0] + 'Z';
    const untilStr = until.toISOString().split('.')[0] + 'Z';
    
    // Search for commits by author in the date range
    // Note: Search API has a limit of 1000 results, so we'll use pagination
    let page = 1;
    let hasMore = true;
    const maxPages = 10; // 10 pages = 1000 commits max
    
    while (hasMore && page <= maxPages) {
      const query = `author:${GITHUB_USERNAME}+author-date:${sinceStr}..${untilStr}`;
      
      const response = await fetch(
        `${GITHUB_API_BASE}/search/commits?q=${encodeURIComponent(query)}&per_page=100&page=${page}&sort=author-date`,
        {
          headers: getAuthHeaders({
            'Accept': 'application/vnd.github.cloak-preview+json', // Required for commit search
          }),
          next: { revalidate: 300 } // 5 minutes cache
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`GitHub Search API error (page ${page}):`, response.status, errorText);
        // If rate limited or other error, try alternative method
        if (response.status === 403 || response.status === 422) {
          console.log('Falling back to repository-based commit fetching...');
          return await getCommitsFromRepos(since, until);
        }
        break;
      }

      const data = await response.json();
      const items = data.items || [];

      if (items.length === 0) {
        hasMore = false;
        break;
      }

      for (const commit of items) {
        if (commit.commit && commit.commit.author) {
          const commitDate = new Date(commit.commit.author.date);
          const dateStr = commitDate.toISOString().split('T')[0];
          
          // Double-check date is in range
          if (commitDate >= since && commitDate <= until) {
            const currentCount = commitsMap.get(dateStr) || 0;
            commitsMap.set(dateStr, currentCount + 1);
          }
        }
      }

      // If we got less than 100 results, we've reached the end
      if (items.length < 100) {
        hasMore = false;
      }

      page++;
    }
    
    const totalCommits = Array.from(commitsMap.values()).reduce((a, b) => a + b, 0);
    console.log(`Search API: Found ${totalCommits} commits`);
    
    // If search returned very few results, try fallback method to ensure we get all commits
    if (totalCommits === 0 && page === 2) {
      console.log('Search API returned 0 results, trying fallback method...');
      const fallbackCommits = await getCommitsFromRepos(since, until);
      return fallbackCommits;
    }
  } catch (error) {
    console.error('Error in commit search:', error);
    // Fallback to repo-based method
    return await getCommitsFromRepos(since, until);
  }

  return commitsMap;
}

// Fallback: Get commits from repositories
async function getCommitsFromRepos(since: Date, until: Date): Promise<Map<string, number>> {
  const commitsMap = new Map<string, number>();
  
  try {
    // Get all repositories (owned, contributed to, etc.) - including private if authenticated
    const repos = await getUserRepositories();
    console.log(`Fetching commits from ${repos.length} repositories...`);
    
    // Also get repositories user contributed to (not just owned)
    const contributedRepos = await getContributedRepositories();
    console.log(`Found ${contributedRepos.length} additional repositories user contributed to...`);
    
    const allRepos = [...new Set([...repos, ...contributedRepos])];
    console.log(`Total unique repositories: ${allRepos.length}`);
    
    // Fetch commits from all repositories
    for (const repo of allRepos) {
      const repoCommits = await getCommitsFromRepo(repo, since, until);
      repoCommits.forEach((count, date) => {
        const currentCount = commitsMap.get(date) || 0;
        commitsMap.set(date, currentCount + count);
      });
    }
    
    console.log(`Repo-based method: Found ${Array.from(commitsMap.values()).reduce((a, b) => a + b, 0)} commits`);
  } catch (error) {
    console.error('Error in repo-based commit fetching:', error);
  }
  
  return commitsMap;
}

// Get all repositories for the user (including private if authenticated)
async function getUserRepositories(): Promise<string[]> {
  try {
    const repos: string[] = [];
    let page = 1;
    let hasMore = true;

    // Use authenticated user endpoint if token is available (includes private repos)
    const endpoint = GITHUB_TOKEN 
      ? `${GITHUB_API_BASE}/user/repos` // Authenticated endpoint - includes private repos
      : `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/repos`; // Public endpoint

    while (hasMore && page <= 10) {
      const url = `${endpoint}?per_page=100&page=${page}&sort=updated&type=all`;
      
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        next: { revalidate: 3600 } // 1 hour cache
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`GitHub Repos API error:`, response.status, errorText);
        break;
      }

      const data = await response.json();
      
      if (data.length === 0) {
        hasMore = false;
        break;
      }

      // Include all repos (owned, forked, private if authenticated, etc.)
      data.forEach((repo: any) => {
        repos.push(repo.full_name);
      });

      if (data.length < 100) {
        hasMore = false;
      }

      page++;
    }

    console.log(`Found ${repos.length} repositories (${GITHUB_TOKEN ? 'including private' : 'public only'})`);
    return repos;
  } catch (error) {
    console.error('Error fetching repositories:', error);
    return [];
  }
}

// Get repositories user contributed to (via events - includes private if authenticated)
async function getContributedRepositories(): Promise<string[]> {
  const repos = new Set<string>();
  
  try {
    let page = 1;
    let hasMore = true;
    const maxPages = 5; // Limit to avoid too many API calls

    // Use authenticated events endpoint if token is available (includes private events)
    const endpoint = GITHUB_TOKEN
      ? `${GITHUB_API_BASE}/user/events` // Authenticated endpoint - includes private events
      : `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public`; // Public endpoint

    while (hasMore && page <= maxPages) {
      const url = `${endpoint}?per_page=100&page=${page}`;
      
      const response = await fetch(url, {
        headers: getAuthHeaders(),
        next: { revalidate: 300 }
      });

      if (!response.ok) {
        console.error(`Events API error (page ${page}):`, response.status);
        break;
      }

      const events = await response.json();

      if (events.length === 0) {
        hasMore = false;
        break;
      }

      // Extract repo names from events
      for (const event of events) {
        if (event.repo && event.repo.name) {
          repos.add(event.repo.name);
        }
      }

      if (events.length < 100) {
        hasMore = false;
      }

      page++;
    }
  } catch (error) {
    console.error('Error fetching contributed repositories:', error);
  }

  return Array.from(repos);
}

// Get commits from a specific repository
async function getCommitsFromRepo(repo: string, since: Date, until: Date): Promise<Map<string, number>> {
  const commitsMap = new Map<string, number>();
  
  try {
    let page = 1;
    let hasMore = true;

    while (hasMore && page <= 10) {
      const sinceStr = since.toISOString();
      const untilStr = until.toISOString();
      
      const response = await fetch(
        `${GITHUB_API_BASE}/repos/${repo}/commits?author=${GITHUB_USERNAME}&since=${sinceStr}&until=${untilStr}&per_page=100&page=${page}`,
        {
          headers: getAuthHeaders(),
          next: { revalidate: 300 }
        }
      );

      if (!response.ok) {
        // Some repos might be private or deleted, skip them
        if (response.status === 404 || response.status === 403) {
          hasMore = false;
          break;
        }
        hasMore = false;
        break;
      }

      const commits = await response.json();

      if (commits.length === 0) {
        hasMore = false;
        break;
      }

      for (const commit of commits) {
        if (commit.commit && commit.commit.author) {
          const commitDate = new Date(commit.commit.author.date);
          const dateStr = commitDate.toISOString().split('T')[0];
          
          if (commitDate >= since && commitDate <= until) {
            const currentCount = commitsMap.get(dateStr) || 0;
            commitsMap.set(dateStr, currentCount + 1);
          }
        }
      }

      if (commits.length < 100) {
        hasMore = false;
      }

      page++;
    }
  } catch (error) {
    // Silently skip repos that error (might be private/deleted)
    console.error(`Error fetching commits from ${repo}:`, error);
  }

  return commitsMap;
}

// Get all contributions for the past year
async function getContributions(): Promise<ContributionDay[]> {
  try {
    // Calculate date range (past year)
    const endDate = new Date();
    endDate.setHours(23, 59, 59, 999);
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    startDate.setHours(0, 0, 0, 0);

    console.log(`Fetching contributions from ${startDate.toISOString()} to ${endDate.toISOString()}`);
    if (GITHUB_TOKEN) {
      console.log('Using GitHub authentication - will include private contributions');
    } else {
      console.log('No GitHub token found - only fetching public contributions');
    }

    // Initialize contribution map for all days in the past year
    const contributionsMap = new Map<string, number>();
    const currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const dateStr = currentDate.toISOString().split('T')[0];
      contributionsMap.set(dateStr, 0);
      currentDate.setDate(currentDate.getDate() + 1);
    }

    // Try search API first (more comprehensive)
    const commitsMap = await getCommitsBySearch(startDate, endDate);
    
    // Merge commits into main contributions map
    commitsMap.forEach((count, date) => {
      const currentCount = contributionsMap.get(date) || 0;
      contributionsMap.set(date, currentCount + count);
    });

    // Also fetch events for PRs, issues, etc. (these also count as contributions)
    // Use authenticated endpoint if token is available (includes private events)
    const eventsEndpoint = GITHUB_TOKEN
      ? `${GITHUB_API_BASE}/user/events` // Authenticated - includes private events
      : `${GITHUB_API_BASE}/users/${GITHUB_USERNAME}/events/public`; // Public only

    let page = 1;
    let hasMore = true;
    const maxPages = 10;

    while (hasMore && page <= maxPages) {
      try {
        const response = await fetch(
          `${eventsEndpoint}?per_page=100&page=${page}`,
          {
            headers: getAuthHeaders(),
            next: { revalidate: 300 }
          }
        );

        if (!response.ok) {
          console.error(`Events API error (page ${page}):`, response.status);
          break;
        }

        const events = await response.json();

        if (events.length === 0) {
          hasMore = false;
          break;
        }

        for (const event of events) {
          const eventDate = new Date(event.created_at);
          const dateStr = eventDate.toISOString().split('T')[0];
          
          if (eventDate >= startDate && eventDate <= endDate) {
            // Count PRs, issues, etc. (commits are already counted above)
            if (
              (event.type === 'PullRequestEvent' && event.payload?.action === 'opened') ||
              (event.type === 'IssuesEvent' && event.payload?.action === 'opened') ||
              event.type === 'CreateEvent' ||
              event.type === 'ReleaseEvent'
            ) {
              const currentCount = contributionsMap.get(dateStr) || 0;
              contributionsMap.set(dateStr, currentCount + 1);
            }
          } else if (eventDate < startDate) {
            // Events are sorted by date, so if we hit an old event, we're done
            hasMore = false;
            break;
          }
        }

        if (events.length < 100) {
          hasMore = false;
        }

        page++;
      } catch (error) {
        console.error(`Error fetching events page ${page}:`, error);
        hasMore = false;
      }
    }

    // Convert map to array
    const contributions: ContributionDay[] = Array.from(contributionsMap.entries())
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
    console.log(`Total contributions found: ${totalContributions}`);

    return contributions;
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return [];
  }
}

export async function GET() {
  try {
    console.log('Fetching GitHub contributions...');
    const contributions = await getContributions();
    
    // Calculate total contributions (past year)
    const totalContributions = contributions.reduce((sum, day) => sum + day.count, 0);
    
    // Calculate current year contributions
    const currentYear = new Date().getFullYear();
    const yearStart = new Date(currentYear, 0, 1);
    const currentYearContributions = contributions
      .filter(day => {
        const dayDate = new Date(day.date);
        return dayDate >= yearStart;
      })
      .reduce((sum, day) => sum + day.count, 0);

    console.log(`Returning ${contributions.length} days of contributions, ${currentYearContributions} for ${currentYear}`);

    return NextResponse.json({
      contributions,
      totalContributions,
      currentYearContributions,
      lastUpdated: new Date().toISOString(),
      authenticated: !!GITHUB_TOKEN,
    });
  } catch (error) {
    console.error('Error in GET handler:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch GitHub contributions',
        contributions: [],
        totalContributions: 0,
        currentYearContributions: 0,
      },
      { status: 500 }
    );
  }
}
