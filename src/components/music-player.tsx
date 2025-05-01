'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Music, Pause } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useToast } from '@/hooks/use-toast';


const MUSIC_URL = "/sunflower.mp3";

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.preload = 'metadata';

  
      const handleCanPlayThrough = () => {
        setIsLoaded(true);
      };

      const handleError = (e: ErrorEvent) => {
        console.error('Audio error:', e);
        setHasError(true);
        toast({
          title: "Music Error",
          description: "Could not load the Sunflower song. Try refreshing the page.",
          variant: "destructive",
        });
      };

      audioRef.current.addEventListener('canplaythrough', handleCanPlayThrough);
      audioRef.current.addEventListener('error', handleError as EventListener);

      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('canplaythrough', handleCanPlayThrough);
          audioRef.current.removeEventListener('error', handleError as EventListener);
        }
      };
    }
  }, [toast]);

  const togglePlayPause = () => {
    if (!audioRef.current || hasError) {
      toast({
        title: "Cannot Play Music",
        description: hasError
          ? "There was an error loading the song. Try refreshing the page."
          : "Audio player is not ready yet.",
        variant: "destructive",
      });
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error("Error playing audio:", error);
        toast({
          title: "Playback Error",
          description: "Could not play the song. Click again or refresh the page.",
          variant: "destructive",
        });
      });
    }
    setIsPlaying(!isPlaying);
  };

  
  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    audioElement.addEventListener('play', handlePlay);
    audioElement.addEventListener('pause', handlePause);
    audioElement.addEventListener('ended', handleEnded);

    // Cleanup listeners on component unmount
    return () => {
      audioElement.removeEventListener('play', handlePlay);
      audioElement.removeEventListener('pause', handlePause);
      audioElement.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="flex items-center">
            {/* Set loop attribute and preload */}
            <audio ref={audioRef} src={MUSIC_URL} loop preload="metadata" />
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              aria-label={isPlaying ? 'Pause Sunflower song' : 'Play Sunflower song'}
              className={`relative ${isPlaying ? 'bg-primary/10' : ''} ${hasError ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={hasError}
            >
              {isPlaying ? (
                <Pause className="h-5 w-5 text-primary" />
              ) : (
                <Music className={`h-5 w-5 ${hasError ? 'text-muted-foreground' : ''}`} />
              )}
              {isPlaying && !hasError && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse" />
              )}
            </Button>
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{hasError ? 'Audio error' : isPlaying ? 'Pause Sunflower' : 'Play Sunflower'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
