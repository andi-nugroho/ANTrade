"use client";

import { ReactNode } from 'react';
import { AlertCircle } from 'lucide-react';

interface MiniAppFallbackProps {
  children: ReactNode;
  error?: string | null;
  isLoading?: boolean;
}

export function MiniAppFallback({ children, error, isLoading }: MiniAppFallbackProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
          <p className="text-text-secondary">Loading FarMint...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <AlertCircle className="h-12 w-12 text-error-500" />
          <h2 className="text-xl font-semibold">Unable to Load MiniApp</h2>
          <p className="text-text-secondary">
            There was an issue loading the Farcaster MiniApp features. 
            You can still use FarTrade as a regular web app.
          </p>
          <p className="text-sm text-text-tertiary">
            Error: {error}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
