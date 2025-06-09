/**
 * Utility functions for Farcaster miniapp integration
 */

export function isMiniAppEnvironment(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  // Check if we're in an iframe (common for miniapps)
  const inIframe = window.self !== window.top;
  
  // Check for React Native WebView
  const inReactNativeWebView = !!(window as any).ReactNativeWebView;
  
  // Check for Farcaster-specific user agent or other indicators
  const userAgent = navigator.userAgent.toLowerCase();
  const isFarcasterClient = userAgent.includes('farcaster') || userAgent.includes('warpcast');
  
  return inIframe || inReactNativeWebView || isFarcasterClient;
}

export function getMiniAppUrl(path: string = ''): string {
  const baseUrl = process.env.NODE_ENV === 'production' 
    ? 'https://far-trade.vercel.app' 
    : 'http://localhost:3000';
  
  return `${baseUrl}${path}`;
}

export function generateShareUrl(nftId?: string): string {
  const baseUrl = getMiniAppUrl();
  const path = nftId ? `/nft/${nftId}` : '';
  return `${baseUrl}${path}`;
}

export function generateCastText(nftName?: string): string {
  if (nftName) {
    return `Check out "${nftName}" on FarTrade! 🎨 The best place to mint, trade, and discover NFTs on Farcaster.`;
  }
  
  return `Discover amazing NFTs on FarTrade! 🎨 Mint, trade, and collect on Farcaster's premier NFT marketplace.`;
}

export function formatFid(fid: number): string {
  return `FID ${fid}`;
}

export function truncateAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2 + 2) {
    return address;
  }
  
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function formatDisplayName(user: {
  displayName?: string;
  username?: string;
  fid: number;
}): string {
  return user.displayName || user.username || formatFid(user.fid);
}
