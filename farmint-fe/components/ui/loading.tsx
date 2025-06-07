"use client";

import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Skeleton } from './animated';

// Lightweight loading spinner
interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'white';
}

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', variant = 'primary', className, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    };

    const variantClasses = {
      primary: 'border-primary-500 border-t-transparent',
      secondary: 'border-secondary-500 border-t-transparent',
      white: 'border-white border-t-transparent',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin rounded-full border-2',
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Spinner.displayName = 'Spinner';

// Loading overlay
interface LoadingOverlayProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  text?: string;
  backdrop?: boolean;
}

export const LoadingOverlay = forwardRef<HTMLDivElement, LoadingOverlayProps>(
  ({ show, text = 'Loading...', backdrop = true, className, ...props }, ref) => {
    if (!show) return null;

    return (
      <div
        ref={ref}
        className={cn(
          'fixed inset-0 z-50 flex items-center justify-center',
          backdrop && 'bg-background-primary/80 backdrop-blur-sm',
          className
        )}
        {...props}
      >
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          {text && (
            <p className="text-body-sm text-text-secondary animate-pulse">
              {text}
            </p>
          )}
        </div>
      </div>
    );
  }
);

LoadingOverlay.displayName = 'LoadingOverlay';

// Card loading skeleton
interface CardSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  showAvatar?: boolean;
  showImage?: boolean;
  lines?: number;
}

export const CardSkeleton = forwardRef<HTMLDivElement, CardSkeletonProps>(
  ({ showAvatar = true, showImage = true, lines = 3, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('p-4 space-y-3 bg-background-card rounded-lg', className)}
        {...props}
      >
        {showImage && (
          <Skeleton height="200px" className="rounded-lg" />
        )}
        
        <div className="space-y-2">
          {showAvatar && (
            <div className="flex items-center gap-2">
              <Skeleton width="32px" height="32px" rounded />
              <Skeleton width="80px" height="16px" />
            </div>
          )}
          
          {Array.from({ length: lines }).map((_, i) => (
            <Skeleton
              key={i}
              height="16px"
              width={i === lines - 1 ? '60%' : '100%'}
            />
          ))}
        </div>
      </div>
    );
  }
);

CardSkeleton.displayName = 'CardSkeleton';

// List loading skeleton
interface ListSkeletonProps extends HTMLAttributes<HTMLDivElement> {
  count?: number;
  variant?: 'card' | 'list';
}

export const ListSkeleton = forwardRef<HTMLDivElement, ListSkeletonProps>(
  ({ count = 3, variant = 'card', className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'space-y-4',
          variant === 'list' && 'space-y-2',
          className
        )}
        {...props}
      >
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} style={{ animationDelay: `${i * 100}ms` }}>
            {variant === 'card' ? (
              <CardSkeleton />
            ) : (
              <div className="flex items-center gap-3 p-3">
                <Skeleton width="48px" height="48px" rounded />
                <div className="flex-1 space-y-2">
                  <Skeleton height="16px" width="70%" />
                  <Skeleton height="14px" width="50%" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }
);

ListSkeleton.displayName = 'ListSkeleton';

// Page loading component
interface PageLoadingProps {
  text?: string;
}

export function PageLoading({ text = 'Loading page...' }: PageLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
      <Spinner size="lg" />
      <p className="text-body-sm text-text-secondary animate-pulse">
        {text}
      </p>
    </div>
  );
}

// Button loading state
interface ButtonLoadingProps extends HTMLAttributes<HTMLSpanElement> {
  loading: boolean;
  children: React.ReactNode;
}

export const ButtonLoading = forwardRef<HTMLSpanElement, ButtonLoadingProps>(
  ({ loading, children, className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn('flex items-center gap-2', className)}
        {...props}
      >
        {loading && <Spinner size="sm" variant="white" />}
        {children}
      </span>
    );
  }
);

ButtonLoading.displayName = 'ButtonLoading';
