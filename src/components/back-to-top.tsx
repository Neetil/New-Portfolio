'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowUpIcon } from "lucide-react";

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  // button when scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 500) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      className="fixed bottom-6 right-6 z-50 rounded-full shadow-lg size-10 p-0"
      onClick={scrollToTop}
      aria-label="Back to top"
    >
      <ArrowUpIcon className="h-5 w-5" />
    </Button>
  );
}
