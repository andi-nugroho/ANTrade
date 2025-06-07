"use client";

import { Button } from '@/components/ui/button';
import { X, Share, Heart } from 'lucide-react';
import { useMiniAppContext } from './miniapp-provider';
import { cn } from '@/lib/utils';

interface MiniAppHeaderProps {
  title: string;
  showClose?: boolean;
  showShare?: boolean;
  showAdd?: boolean;
  className?: string;
}

export function MiniAppHeader({ 
  title, 
  showClose = false, 
  showShare = false, 
  showAdd = false,
  className 
}: MiniAppHeaderProps) {
  const { context, isInMiniApp, actions } = useMiniAppContext();

  const handleClose = async () => {
    await actions.close();
  };

  const handleShare = async () => {
    await actions.composeCast({
      text: `Check out ${title} on FarTrade! 🎨`,
      embeds: [window.location.href]
    });
  };

  const handleAdd = async () => {
    try {
      await actions.addMiniApp();
    } catch (error) {
      console.error('Failed to add miniapp:', error);
    }
  };

  // Only show miniapp-specific header if we're in a miniapp
  if (!isInMiniApp) {
    return null;
  }

  const isAdded = context?.client?.added;

  return (
    <header className={cn(
      "flex items-center justify-between p-4 border-b border-border-light bg-background-primary/80 backdrop-blur-md",
      className
    )}>
      <h1 className="font-heading text-lg font-semibold truncate flex-1">
        {title}
      </h1>
      
      <div className="flex items-center gap-2 ml-4">
        {showShare && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleShare}
            className="h-8 w-8"
          >
            <Share className="h-4 w-4" />
          </Button>
        )}
        
        {showAdd && !isAdded && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleAdd}
            className="h-8 w-8 text-primary-400"
          >
            <Heart className="h-4 w-4" />
          </Button>
        )}
        
        {showClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </header>
  );
}
