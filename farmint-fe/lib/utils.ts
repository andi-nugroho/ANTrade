import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Animation utilities for ultra-smooth 120fps animations
export const animations = {
  // 120fps entrance animations
  fadeIn: "animate-in fade-in duration-200 ease-out",
  slideUp: "animate-in slide-in-from-bottom-4 duration-200 ease-out",
  slideDown: "animate-in slide-in-from-top-4 duration-200 ease-out",
  slideLeft: "animate-in slide-in-from-right-4 duration-200 ease-out",
  slideRight: "animate-in slide-in-from-left-4 duration-200 ease-out",
  scaleIn: "animate-in zoom-in-95 duration-150 ease-out",

  // 120fps exit animations
  fadeOut: "animate-out fade-out duration-150 ease-in",
  slideUpOut: "animate-out slide-out-to-top-4 duration-150 ease-in",
  slideDownOut: "animate-out slide-out-to-bottom-4 duration-150 ease-in",
  scaleOut: "animate-out zoom-out-95 duration-150 ease-in",

  // Ultra-smooth hover animations
  hover: "smooth-120 hover:scale-105",
  hoverGlow: "smooth-120 hover:shadow-glow-md hover:scale-102",
  hoverLift: "smooth-120 hover:-translate-y-1 hover:shadow-lg",

  // 120fps loading animations
  pulse: "animate-pulse",
  pulse120: "animate-pulse120",
  spin: "animate-spin",
  bounce: "animate-bounce120",

  // Button animations
  button: "button-smooth active:animate-button-press",
  buttonGradient: "button-smooth hover:scale-105 hover:shadow-glow-lg active:animate-button-press",

  // Mobile-optimized animations
  mobileButton: "button-smooth hover:scale-103 active:scale-97",
  mobileCard: "smooth-120 hover:scale-102 active:scale-98",

  // Stagger animations for lists (120fps)
  stagger: (index: number) => ({
    style: { animationDelay: `${index * 50}ms` },
    className: "animate-in slide-in-from-bottom-4 duration-200 ease-out"
  })
} as const

// Performance optimized debounce
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Optimized throttle for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Format utilities
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 4,
  }).format(price)
}

export function formatAddress(address: string): string {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

// Intersection Observer hook for performance
export function createIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined') return null

  return new IntersectionObserver(callback, {
    threshold: 0.1,
    rootMargin: '50px',
    ...options
  })
}
