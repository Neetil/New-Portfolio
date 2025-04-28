'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon, QuoteIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  id: string;
  text: string;
  author: {
    name: string;
    title: string;
    avatarUrl?: string;
  };
}

// Sample testimonials - replace with your actual testimonials
const defaultTestimonials: Testimonial[] = [
  {
    id: "1",
    text: "Neetil is an exceptional developer who delivered our project on time and exceeded our expectations. The attention to detail and clean code made a huge difference.",
    author: {
      name: "Jasneet Singh Saini",
      title: "Student Placement Coordinator and Influencer",
      avatarUrl: "https://picsum.photos/seed/person1/100/100",
    },
  },
  {
    id: "2",
    text: "Working with Neetil was a great experience. They understood our requirements perfectly and implemented everything with impressive speed and quality.",
    author: {
      name: "Nirjara Jain",
      title: "Student",
      avatarUrl: "https://picsum.photos/seed/person2/100/100",
    },
  },
  {
    id: "3",
    text: "Neetil's technical expertise and problem-solving skills were exactly what we needed. They consistently delivered high-quality code and were able to tackle complex challenges effectively.",
    author: {
      name: "Shyamal Sheorey",
      title: "Expert in Marketing",
      avatarUrl: "https://picsum.photos/seed/person3/100/100",
    },
  },
];

interface TestimonialsProps {
  testimonials?: Testimonial[];
}

export function Testimonials({ testimonials = defaultTestimonials }: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      showNextTestimonial();
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [currentIndex, testimonials.length]);

  const showPrevTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('left');
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const showNextTestimonial = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection('right');
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Testimonial cards */}
      <div className="relative min-h-[320px] sm:min-h-[250px]">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.id}
            className={`absolute w-full opacity-0 transition-all duration-500 ease-in-out ${
              index === currentIndex
                ? "opacity-100 translate-x-0"
                : index < currentIndex || (currentIndex === 0 && index === testimonials.length - 1)
                ? `${direction === 'right' ? '-translate-x-full' : 'translate-x-full'}`
                : `${direction === 'right' ? 'translate-x-full' : '-translate-x-full'}`
            }`}
          >
            <CardContent className="p-6 sm:p-8">
              <QuoteIcon className="h-8 w-8 text-muted-foreground/40 mb-4" />
              <p className="text-lg mb-6 italic text-muted-foreground">"{testimonial.text}"</p>
              <div className="flex items-center">
                <Avatar className="h-12 w-12 mr-4">
                  <AvatarImage src={testimonial.author.avatarUrl} alt={testimonial.author.name} />
                  <AvatarFallback>{testimonial.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{testimonial.author.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.author.title}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-2 mt-4">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-primary" : "bg-muted-foreground/30"
            }`}
            onClick={() => {
              if (index < currentIndex) {
                setDirection('left');
              } else if (index > currentIndex) {
                setDirection('right');
              }
              setCurrentIndex(index);
            }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Navigation arrows */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
        onClick={showPrevTestimonial}
        aria-label="Previous testimonial"
      >
        <ChevronLeftIcon className="h-6 w-6" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 rounded-full opacity-70 hover:opacity-100"
        onClick={showNextTestimonial}
        aria-label="Next testimonial"
      >
        <ChevronRightIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
