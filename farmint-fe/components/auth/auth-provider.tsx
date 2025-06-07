"use client";

import { AuthKitProvider } from '@farcaster/auth-kit';
import { farcasterConfig } from '@/lib/farcaster';
import { ReactNode } from 'react';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <AuthKitProvider config={farcasterConfig}>
      {children}
    </AuthKitProvider>
  );
}
