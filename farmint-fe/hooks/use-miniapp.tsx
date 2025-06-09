"use client";

import { useEffect, useState, useMemo } from 'react';
import { useMiniAppSimple } from './use-miniapp-simple';
import type { MiniAppContext, MiniAppHookReturn } from '@/types/miniapp';

// Dynamically import the SDK to avoid SSR issues and reduce bundle size
let sdk: any = null;
let sdkPromise: Promise<any> | null = null;

const initializeSDK = async () => {
  if (typeof window === 'undefined') return null;

  if (sdk) return sdk;

  if (!sdkPromise) {
    sdkPromise = import('@farcaster/frame-sdk')
      .then(({ sdk: frameSdk }) => {
        sdk = frameSdk;
        return frameSdk;
      })
      .catch((error) => {
        console.warn('Failed to load Farcaster Frame SDK:', error);
        sdkPromise = null; // Reset promise on error
        return null;
      });
  }

  return sdkPromise;
};

// Re-export types for backward compatibility
export type { MiniAppContext, MiniAppHookReturn } from '@/types/miniapp';

export function useMiniApp(): MiniAppHookReturn {
  const [context, setContext] = useState<MiniAppContext | null>(null);
  const [isInMiniApp, setIsInMiniApp] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useSimple, setUseSimple] = useState(false);

  // Fallback to simple version if SDK fails
  const simpleHook = useMiniAppSimple();

  useEffect(() => {
    let mounted = true;

    async function initializeMiniApp() {
      try {
        // Initialize the SDK first
        const frameSdk = await initializeSDK();

        if (!mounted) return;

        if (!frameSdk) {
          // If SDK fails to load, fall back to simple detection
          setUseSimple(true);
          setIsLoading(false);
          return;
        }

        // Check if we're in a miniapp environment
        const inMiniApp = await frameSdk.isInMiniApp();

        if (!mounted) return;

        setIsInMiniApp(inMiniApp);

        if (inMiniApp) {
          // Get context from the miniapp
          const miniAppContext = await frameSdk.context;

          if (!mounted) return;

          setContext(miniAppContext);

          // Call ready to hide splash screen
          await frameSdk.actions.ready();
        }
      } catch (err) {
        if (!mounted) return;

        setError(err instanceof Error ? err.message : 'Unknown error');
        setUseSimple(true);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    initializeMiniApp();

    return () => {
      mounted = false;
    };
  }, []);

  // Return simple hook if SDK failed to load
  if (useSimple) {
    return simpleHook;
  }

  // Memoize action functions to prevent unnecessary re-renders
  const actions = useMemo(() => ({
    signIn: async (nonce: string) => {
      if (!isInMiniApp || !sdk) {
        throw new Error('Not in miniapp environment');
      }

      try {
        return await sdk.actions.signIn({
          nonce,
          acceptAuthAddress: true
        });
      } catch (err) {
        throw new Error(`Sign in failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    },

    addMiniApp: async () => {
      if (!isInMiniApp || !sdk) {
        throw new Error('Not in miniapp environment');
      }

      try {
        await sdk.actions.addMiniApp();
      } catch (err) {
        throw new Error(`Add miniapp failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    },

    composeCast: async (options: {
      text?: string;
      embeds?: string[];
      parent?: { type: 'cast'; hash: string };
      channelKey?: string;
    }) => {
      if (!isInMiniApp || !sdk) {
        throw new Error('Not in miniapp environment');
      }

      try {
        return await sdk.actions.composeCast(options);
      } catch (err) {
        throw new Error(`Compose cast failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    },

    openUrl: async (url: string) => {
      if (!isInMiniApp || !sdk) {
        window.open(url, '_blank');
        return;
      }

      try {
        await sdk.actions.openUrl(url);
      } catch (err) {
        console.error('Failed to open URL:', err);
        // Fallback to regular window.open
        window.open(url, '_blank');
      }
    },

    close: async () => {
      if (!isInMiniApp || !sdk) {
        return;
      }

      try {
        await sdk.actions.close();
      } catch (err) {
        console.error('Failed to close miniapp:', err);
      }
    },
  }), [isInMiniApp]);

  return useMemo(() => ({
    context,
    isInMiniApp,
    isLoading,
    error,
    actions,
  }), [context, isInMiniApp, isLoading, error, actions]);
}
