"use client";

import { useEffect, useState } from 'react';
import type { MiniAppHookReturn } from '@/types/miniapp';

/**
 * Simple miniapp detection without full SDK
 * This is a fallback when the full SDK fails to load
 */
export function useMiniAppSimple(): MiniAppHookReturn {
  const [isInMiniApp, setIsInMiniApp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simple detection based on environment
    const detectMiniApp = () => {
      if (typeof window === 'undefined') {
        return false;
      }

      // Check if we're in an iframe (common for miniapps)
      const inIframe = window.self !== window.top;
      
      // Check for React Native WebView
      const inReactNativeWebView = !!(window as any).ReactNativeWebView;
      
      // Check for Farcaster-specific user agent
      const userAgent = navigator.userAgent.toLowerCase();
      const isFarcasterClient = userAgent.includes('farcaster') || userAgent.includes('warpcast');
      
      return inIframe || inReactNativeWebView || isFarcasterClient;
    };

    setIsInMiniApp(detectMiniApp());
    setIsLoading(false);
  }, []);

  const actions = {
    signIn: async (nonce: string) => {
      throw new Error('Full SDK required for authentication');
    },
    addMiniApp: async () => {
      console.warn('MiniApp SDK not available - cannot add app');
    },
    composeCast: async (options: any) => {
      console.warn('MiniApp SDK not available - cannot compose cast');
    },
    openUrl: async (url: string) => {
      window.open(url, '_blank');
    },
    close: async () => {
      console.warn('MiniApp SDK not available - cannot close app');
    },
  };

  return {
    context: null,
    isInMiniApp,
    isLoading,
    error: null,
    actions,
  };
}
