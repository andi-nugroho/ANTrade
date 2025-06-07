"use client";

import { forwardRef, HTMLAttributes, ReactNode } from 'react';
import { cn, animations } from '@/lib/utils';
import { useInView, useStaggerAnimation } from '@/hooks/use-animation';

// Base animated container
interface AnimatedProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  animation?: keyof typeof animations;
  delay?: number;
  duration?: number;
  once?: boolean;
}

export const Animated = forwardRef<HTMLDivElement, AnimatedProps>(
  ({ children, animation = 'fadeIn', delay = 0, className, once = true, ...props }, ref) => {
    const { ref: inViewRef, isInView } = useInView<HTMLDivElement>();

    return (
      <div
        ref={ref || inViewRef}
        className={cn(
          'transition-all duration-300 ease-out',
          isInView ? animations[animation] : 'opacity-0',
          className
        )}
        style={{ 
          animationDelay: `${delay}ms`,
          transitionDelay: `${delay}ms`
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Animated.displayName = 'Animated';

// Staggered list animation
interface StaggeredListProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode[];
  staggerDelay?: number;
  animation?: keyof typeof animations;
}

export const StaggeredList = forwardRef<HTMLDivElement, StaggeredListProps>(
  ({ children, staggerDelay = 100, animation = 'slideUp', className, ...props }, ref) => {
    const { ref: listRef, visibleItems } = useStaggerAnimation<HTMLDivElement>(children.length, staggerDelay);

    return (
      <div ref={ref || listRef} className={cn('space-y-4', className)} {...props}>
        {children.map((child, index) => (
          <div
            key={index}
            className={cn(
              'transition-all duration-300 ease-out',
              index < visibleItems 
                ? animations[animation] 
                : 'opacity-0 translate-y-4'
            )}
            style={{ 
              animationDelay: `${index * staggerDelay}ms`,
              transitionDelay: `${index * staggerDelay}ms`
            }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }
);

StaggeredList.displayName = 'StaggeredList';

// Hover animated wrapper
interface HoverAnimatedProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hoverAnimation?: 'lift' | 'glow' | 'scale';
  disabled?: boolean;
}

export const HoverAnimated = forwardRef<HTMLDivElement, HoverAnimatedProps>(
  ({ children, hoverAnimation = 'lift', disabled = false, className, ...props }, ref) => {
    const hoverClasses = {
      lift: 'hover-lift',
      glow: animations.hoverGlow,
      scale: animations.hover,
    };

    return (
      <div
        ref={ref}
        className={cn(
          'transition-all duration-200 ease-out',
          !disabled && hoverClasses[hoverAnimation],
          disabled && 'cursor-not-allowed opacity-50',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HoverAnimated.displayName = 'HoverAnimated';

// Loading skeleton with shimmer
interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
}

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width = '100%', height = '1rem', rounded = false, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'shimmer bg-neutral-800',
          rounded ? 'rounded-full' : 'rounded-md',
          className
        )}
        style={{ width, height }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

// Fade transition wrapper
interface FadeTransitionProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children: ReactNode;
  duration?: number;
}

export const FadeTransition = forwardRef<HTMLDivElement, FadeTransitionProps>(
  ({ show, children, duration = 300, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'transition-all ease-out',
          show ? 'opacity-100' : 'opacity-0 pointer-events-none',
          className
        )}
        style={{ transitionDuration: `${duration}ms` }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FadeTransition.displayName = 'FadeTransition';

// Scale transition for modals/popups
interface ScaleTransitionProps extends HTMLAttributes<HTMLDivElement> {
  show: boolean;
  children: ReactNode;
  duration?: number;
}

export const ScaleTransition = forwardRef<HTMLDivElement, ScaleTransitionProps>(
  ({ show, children, duration = 200, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'transition-all ease-out origin-center',
          show 
            ? 'opacity-100 scale-100' 
            : 'opacity-0 scale-95 pointer-events-none',
          className
        )}
        style={{ transitionDuration: `${duration}ms` }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

ScaleTransition.displayName = 'ScaleTransition';
