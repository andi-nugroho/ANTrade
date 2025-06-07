"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Skeleton } from './animated';

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  onLoad?: () => void;
  onError?: () => void;
  skeletonClassName?: string;
  aspectRatio?: 'square' | 'video' | 'auto';
}

export function LazyImage({
  src,
  alt,
  width,
  height,
  fill = false,
  className,
  priority = false,
  sizes,
  quality = 85,
  placeholder = 'empty',
  blurDataURL,
  onLoad,
  onError,
  skeletonClassName,
  aspectRatio = 'auto',
  ...props
}: LazyImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority) return; // Skip lazy loading if priority is true

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
    onError?.();
  };

  const aspectRatioClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    auto: '',
  };

  return (
    <div
      ref={imgRef}
      className={cn(
        'relative overflow-hidden',
        aspectRatioClasses[aspectRatio],
        className
      )}
      {...props}
    >
      {/* Skeleton Loading State */}
      {isLoading && (
        <Skeleton
          className={cn(
            'absolute inset-0 w-full h-full',
            skeletonClassName
          )}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-800 text-neutral-400">
          <div className="text-center">
            <svg
              className="w-8 h-8 mx-auto mb-2 opacity-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-xs">Failed to load</p>
          </div>
        </div>
      )}

      {/* Actual Image */}
      {isInView && !hasError && (
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          fill={fill}
          priority={priority}
          sizes={sizes}
          quality={quality}
          placeholder={placeholder}
          blurDataURL={blurDataURL}
          className={cn(
            'transition-opacity duration-300',
            isLoading ? 'opacity-0' : 'opacity-100',
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
        />
      )}
    </div>
  );
}

// Specialized components for common use cases
export function LazyNFTImage({
  src,
  alt,
  className,
  ...props
}: Omit<LazyImageProps, 'aspectRatio' | 'fill'>) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      fill
      aspectRatio="square"
      className={cn('rounded-lg', className)}
      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
      {...props}
    />
  );
}

export function LazyAvatarImage({
  src,
  alt,
  size = 32,
  className,
  ...props
}: Omit<LazyImageProps, 'width' | 'height' | 'aspectRatio'> & { size?: number }) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-full', className)}
      sizes={`${size}px`}
      quality={75}
      {...props}
    />
  );
}

export function LazyBannerImage({
  src,
  alt,
  className,
  ...props
}: Omit<LazyImageProps, 'aspectRatio' | 'fill'>) {
  return (
    <LazyImage
      src={src}
      alt={alt}
      fill
      aspectRatio="video"
      className={cn('rounded-lg', className)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
      {...props}
    />
  );
}
