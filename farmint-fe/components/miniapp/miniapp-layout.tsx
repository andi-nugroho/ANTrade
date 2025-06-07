"use client";

import { ReactNode, useEffect } from 'react';
import { useMiniAppContext } from './miniapp-provider';
import { MiniAppFallback } from './miniapp-fallback';
import { cn } from '@/lib/utils';

interface MiniAppLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MiniAppLayout({ children, className }: MiniAppLayoutProps) {
  const { context, isInMiniApp, isLoading, error } = useMiniAppContext();

  // Apply safe area insets if in miniapp
  const safeAreaInsets = context?.client?.safeAreaInsets;

  const style = safeAreaInsets ? {
    paddingTop: `${safeAreaInsets.top}px`,
    paddingBottom: `${safeAreaInsets.bottom}px`,
    paddingLeft: `${safeAreaInsets.left}px`,
    paddingRight: `${safeAreaInsets.right}px`,
  } : {};

  return (
    <MiniAppFallback error={error} isLoading={isLoading}>
      <div
        className={cn(
          "min-h-screen",
          isInMiniApp && "miniapp-container",
          className
        )}
        style={style}
      >
        {children}
      </div>
    </MiniAppFallback>
  );
}
