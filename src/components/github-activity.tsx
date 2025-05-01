'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { GitBranchIcon, GitCommitIcon, GitPullRequestIcon, StarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface GitHubRepo {
  name: string;
  description: string;
  url: string;
  stars: number;
  forks: number;
  language: string;
}

interface GitHubActivity {
  type: 'commit' | 'pull_request' | 'issue' | 'star';
  repo: string;
  time: string;
  url: string;
  title: string;
}


const sampleRepos: GitHubRepo[] = [
  {
    name: 'portfolio-website',
    description: 'My personal portfolio website built with Next.js and TypeScript',
    url: 'https://github.com/Neetil/portfolio-website',
    stars: 12,
    forks: 5,
    language: 'TypeScript'
  },
  {
    name: 'react-component-library',
    description: 'A collection of reusable React components with TypeScript support',
    url: 'https://github.com/Neetil/react-component-library',
    stars: 34,
    forks: 8,
    language: 'JavaScript'
  },
  {
    name: 'backend-api',
    description: 'RESTful API built with Node.js and Express',
    url: 'https://github.com/Neetil/backend-api',
    stars: 15,
    forks: 3,
    language: 'JavaScript'
  }
];


const sampleActivities: GitHubActivity[] = [
  {
    type: 'commit',
    repo: 'portfolio-website',
    time: '2 days ago',
    url: '#',
    title: 'Update project showcase section'
  },
  {
    type: 'pull_request',
    repo: 'react-component-library',
    time: '1 week ago',
    url: '#',
    title: 'Add dark mode support to all components'
  },
  {
    type: 'commit',
    repo: 'backend-api',
    time: '2 weeks ago',
    url: '#',
    title: 'Implement user authentication'
  },
  {
    type: 'star',
    repo: 'awesome-nextjs',
    time: '3 weeks ago',
    url: '#',
    title: 'Starred vercel/next.js'
  }
];

export function GitHubActivity() {
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [activities, setActivities] = useState<GitHubActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading GitHub data
  useEffect(() => {
    const timer = setTimeout(() => {
      setRepositories(sampleRepos);
      setActivities(sampleActivities);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Function to render activity icon based on type
  const renderActivityIcon = (type: GitHubActivity['type']) => {
    switch (type) {
      case 'commit':
        return <GitCommitIcon className="h-4 w-4 text-green-500" />;
      case 'pull_request':
        return <GitPullRequestIcon className="h-4 w-4 text-blue-500" />;
      case 'issue':
        return <GitBranchIcon className="h-4 w-4 text-yellow-500" />;
      case 'star':
        return <StarIcon className="h-4 w-4 text-yellow-500" />;
      default:
        return <GitCommitIcon className="h-4 w-4 text-green-500" />;
    }
  };

  // Language color map
  const getLanguageColor = (language: string) => {
    const colorMap: Record<string, string> = {
      'JavaScript': 'bg-yellow-500',
      'TypeScript': 'bg-blue-500',
      'HTML': 'bg-red-500',
      'CSS': 'bg-pink-500',
      'Python': 'bg-green-500',
      'Java': 'bg-orange-500'
    };

    return colorMap[language] || 'bg-gray-500';
  };

  return (
    <div className="space-y-8">
      {/* Top Repositories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Top Repositories</CardTitle>
          <CardDescription>My most popular GitHub repositories</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array(3).fill(null).map((_, index) => (
              <div key={index} className="space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-full" />
                <div className="flex gap-3 pt-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-16" />
                </div>
              </div>
            ))
          ) : (
            // Actual repository data
            repositories.map((repo) => (
              <div key={repo.name} className="space-y-2">
                <div className="flex justify-between">
                  <a
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline text-primary"
                  >
                    {repo.name}
                  </a>
                  <div className="flex items-center gap-3">
                    <span className="flex items-center text-xs text-muted-foreground">
                      <StarIcon className="mr-1 h-3.5 w-3.5" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center text-xs text-muted-foreground">
                      <GitBranchIcon className="mr-1 h-3.5 w-3.5" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{repo.description}</p>
                <div className="pt-1">
                  <div className="flex items-center">
                    <span className={`inline-block w-2.5 h-2.5 rounded-full mr-2 ${getLanguageColor(repo.language)}`}></span>
                    <span className="text-xs">{repo.language}</span>
                  </div>
                </div>
              </div>
            ))
          )}

          <Button variant="outline" size="sm" className="w-full mt-4" asChild>
            <a href="https://github.com/Neetil" target="_blank" rel="noopener noreferrer">
              View GitHub Profile
            </a>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Recent Activity</CardTitle>
          <CardDescription>My latest GitHub contributions</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            // Loading skeletons
            Array(4).fill(null).map((_, index) => (
              <div key={index} className="flex gap-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            ))
          ) : (
            // Actual activity data
            activities.map((activity, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="mt-1">{renderActivityIcon(activity.type)}</div>
                <div>
                  <a
                    href={activity.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium hover:text-primary"
                  >
                    {activity.title}
                  </a>
                  <p className="text-xs text-muted-foreground">
                    {activity.repo} • {activity.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
