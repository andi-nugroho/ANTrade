"use client";

import { createContext, useContext, ReactNode, memo, useMemo } from 'react';
import { useMiniApp } from '@/hooks/use-miniapp';
import type { MiniAppHookReturn } from '@/types/miniapp';

// Use the shared type for consistency
type MiniAppProviderContext = MiniAppHookReturn;

const MiniAppReactContext = createContext<MiniAppProviderContext | null>(null);

interface MiniAppProviderProps {
  children: ReactNode;
}

export const MiniAppProvider = memo(({ children }: MiniAppProviderProps) => {
  const miniAppData = useMiniApp();

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => miniAppData, [
    miniAppData.isInMiniApp,
    miniAppData.isLoading,
    miniAppData.error,
    miniAppData.context?.user?.fid,
    miniAppData.context?.client?.clientFid
  ]);

  return (
    <MiniAppReactContext.Provider value={contextValue}>
      {children}
    </MiniAppReactContext.Provider>
  );
});

MiniAppProvider.displayName = 'MiniAppProvider';

export function useMiniAppContext() {
  const context = useContext(MiniAppReactContext);
  if (!context) {
    throw new Error('useMiniAppContext must be used within a MiniAppProvider');
  }
  return context;
}
