"use client";

import { useEffect, useRef, useState } from 'react';
import { createIntersectionObserver } from '@/lib/utils';

// Lightweight animation hook for performance
export function useInView<T extends HTMLElement = HTMLElement>(options?: IntersectionObserverInit) {
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = createIntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
          setHasAnimated(true);
        }
      },
      options
    );

    if (observer) {
      observer.observe(element);
      return () => observer.disconnect();
    }
  }, [hasAnimated, options]);

  return { ref, isInView, hasAnimated };
}

// Stagger animation hook for lists
export function useStaggerAnimation<T extends HTMLElement = HTMLDivElement>(itemCount: number, delay = 100) {
  const [visibleItems, setVisibleItems] = useState(0);
  const { ref, isInView } = useInView<T>();

  useEffect(() => {
    if (isInView && visibleItems < itemCount) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => Math.min(prev + 1, itemCount));
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isInView, visibleItems, itemCount, delay]);

  return { ref, visibleItems };
}

// Smooth scroll hook
export function useSmoothScroll() {
  const scrollTo = (elementId: string, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const top = element.offsetTop - offset;
      window.scrollTo({
        top,
        behavior: 'smooth'
      });
    }
  };

  return { scrollTo };
}

// Optimized resize hook
export function useOptimizedResize(callback: () => void, delay = 250) {
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(callback, delay);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [callback, delay]);
}

// Preload images for smooth transitions
export function useImagePreload(src: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLoaded(true);
    img.onerror = () => setError(true);
    img.src = src;
  }, [src]);

  return { loaded, error };
}
