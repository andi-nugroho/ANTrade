"use client";

import { useEffect, useState, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  position?: 'center' | 'top' | 'bottom';
  animation?: 'scale' | 'slide-up' | 'slide-down' | 'fade';
}

export function Modal({
  isOpen,
  onClose,
  children,
  className,
  overlayClassName,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = 'md',
  position = 'center',
  animation = 'scale',
}: ModalProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Handle open/close animations
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      // Trigger animation after visibility
      const timer = setTimeout(() => setIsAnimating(true), 10);
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      // Hide after animation completes
      const timer = setTimeout(() => setIsVisible(false), 200);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    if (!closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isMounted || !isVisible) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    full: 'max-w-full mx-4',
  };

  const positionClasses = {
    center: 'items-center justify-center',
    top: 'items-start justify-center pt-16',
    bottom: 'items-end justify-center pb-16',
  };

  const animationClasses = {
    scale: {
      overlay: isAnimating ? 'opacity-100' : 'opacity-0',
      content: isAnimating 
        ? 'opacity-100 scale-100 translate-y-0' 
        : 'opacity-0 scale-95 translate-y-4',
    },
    'slide-up': {
      overlay: isAnimating ? 'opacity-100' : 'opacity-0',
      content: isAnimating 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 translate-y-8',
    },
    'slide-down': {
      overlay: isAnimating ? 'opacity-100' : 'opacity-0',
      content: isAnimating 
        ? 'opacity-100 translate-y-0' 
        : 'opacity-0 -translate-y-8',
    },
    fade: {
      overlay: isAnimating ? 'opacity-100' : 'opacity-0',
      content: isAnimating ? 'opacity-100' : 'opacity-0',
    },
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOverlayClick) {
      onClose();
    }
  };

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-50 flex transition-all duration-200 ease-out',
        positionClasses[position],
        animationClasses[animation].overlay,
        overlayClassName
      )}
      onClick={handleOverlayClick}
      style={{
        background: 'rgba(10, 10, 10, 0.9)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <div
        className={cn(
          'relative w-full transition-all duration-200 ease-out',
          sizeClasses[size],
          animationClasses[animation].content,
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// Specialized modal components
interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export function ListingModal({ isOpen, onClose, children, title }: ListingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      position="center"
      animation="scale"
      className="bg-background-card border border-border-medium rounded-lg shadow-2xl"
    >
      <div className="p-6">
        {title && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-heading-h5 font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-background-tertiary transition-colors duration-150"
            >
              <svg
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
}

// Mobile-optimized modal
export function MobileModal({ isOpen, onClose, children, title }: ListingModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      position="center"
      animation="scale"
      className="bg-background-card border border-border-medium rounded-lg shadow-2xl mx-4"
    >
      <div className="p-4 sm:p-6">
        {title && (
          <div className="flex items-center justify-between mb-4 sm:mb-6">
            <h2 className="text-heading-h5 font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="h-10 w-10 sm:h-8 sm:w-8 flex items-center justify-center rounded-lg hover:bg-background-tertiary transition-colors duration-150"
            >
              <svg
                className="h-5 w-5 sm:h-4 sm:w-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </Modal>
  );
}
