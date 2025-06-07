"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Wallet, User } from 'lucide-react';
import { useMiniAppContext } from './miniapp-provider';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface MiniAppWalletButtonProps {
  className?: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

export function MiniAppWalletButton({ 
  className, 
  variant = "outline", 
  size = "sm" 
}: MiniAppWalletButtonProps) {
  const { context, isInMiniApp, actions } = useMiniAppContext();
  const [isConnecting, setIsConnecting] = useState(false);

  const user = context?.user;

  const handleConnect = async () => {
    if (!isInMiniApp) {
      // Fallback to regular wallet connection for web
      console.log('Regular wallet connection not implemented');
      return;
    }

    setIsConnecting(true);
    try {
      // Generate a nonce (in a real app, this should come from your server)
      const nonce = Math.random().toString(36).substring(2, 15);
      
      const result = await actions.signIn(nonce);
      console.log('Sign in result:', result);
      
      // Here you would typically send the result to your server for verification
      // and establish a session
      
    } catch (error) {
      console.error('Failed to sign in:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  if (user) {
    return (
      <Button 
        variant={variant} 
        size={size} 
        className={cn("flex items-center gap-2", className)}
        disabled
      >
        {user.pfpUrl ? (
          <Image 
            src={user.pfpUrl} 
            alt={user.displayName || user.username || 'User'} 
            className="w-4 h-4 rounded-full"
          />
        ) : (
          <User className="w-4 h-4" />
        )}
        <span className="truncate max-w-20">
          {user.displayName || user.username || `FID ${user.fid}`}
        </span>
      </Button>
    );
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      className={cn("flex items-center gap-2", className)}
      onClick={handleConnect}
      disabled={isConnecting}
    >
      <Wallet className="w-4 h-4" />
      <span>{isConnecting ? 'Connecting...' : 'Connect'}</span>
    </Button>
  );
}
