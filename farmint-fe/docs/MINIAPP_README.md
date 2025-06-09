# FarMint Farcaster MiniApp Integration

This document explains the Farcaster MiniApp integration in the FarMint NFT Marketplace.

## Overview

FarMint is now a fully integrated Farcaster MiniApp that can be discovered and used within Farcaster clients like Warpcast. Users can mint, trade, and discover NFTs directly from their Farcaster feed.

## Features

### ✅ Implemented Features

1. **MiniApp SDK Integration**
   - `@farcaster/frame-sdk` for native miniapp functionality
   - Automatic splash screen handling
   - Safe area insets for mobile devices
   - Context detection (cast embed, notification, launcher)

2. **User Authentication**
   - Sign In with Farcaster (SIWF) integration
   - Automatic user context from Farcaster client
   - Profile information display

3. **MiniApp Actions**
   - `addMiniApp()` - Prompt users to add the app
   - `composeCast()` - Share NFTs and collections
   - `openUrl()` - Open external links
   - `close()` - Close the miniapp
   - `ready()` - Hide splash screen when loaded

4. **Proper Manifest**
   - Located at `/.well-known/farcaster.json`
   - Account association for domain verification
   - App metadata and configuration

5. **MiniApp-Aware Components**
   - `MiniAppProvider` - Context provider for miniapp state
   - `MiniAppLayout` - Layout with safe area handling
   - `MiniAppHeader` - Native miniapp header with actions
   - `MiniAppWalletButton` - Farcaster-aware wallet connection

## File Structure

```
farmint-fe/
├── components/miniapp/
│   ├── miniapp-provider.tsx      # Context provider
│   ├── miniapp-layout.tsx        # Layout with safe areas
│   ├── miniapp-header.tsx        # Native header component
│   └── miniapp-wallet-button.tsx # Farcaster wallet integration
├── hooks/
│   └── use-miniapp.tsx           # Main miniapp hook
├── lib/
│   ├── farcaster.ts              # Farcaster configuration
│   └── miniapp-utils.ts          # Utility functions
├── public/.well-known/
│   └── farcaster.json            # MiniApp manifest
└── app/farcaster/
    └── page.tsx                  # Embed page for sharing
```

## Usage

### Basic Setup

The app automatically detects if it's running in a Farcaster MiniApp environment and adapts accordingly:

```tsx
import { useMiniAppContext } from '@/components/miniapp/miniapp-provider';

function MyComponent() {
  const { context, isInMiniApp, actions } = useMiniAppContext();
  
  if (isInMiniApp) {
    // MiniApp-specific functionality
    return <MiniAppView />;
  }
  
  // Regular web view
  return <WebView />;
}
```

### User Authentication

```tsx
const { actions } = useMiniAppContext();

// Sign in with Farcaster
const handleSignIn = async () => {
  try {
    const result = await actions.signIn('your-nonce');
    // Handle authentication result
  } catch (error) {
    console.error('Sign in failed:', error);
  }
};
```

### Sharing Content

```tsx
const { actions } = useMiniAppContext();

// Share an NFT
const shareNFT = async (nftId: string) => {
  await actions.composeCast({
    text: `Check out this amazing NFT on FarMint! 🎨`,
    embeds: [`https://farmint.app/nft/${nftId}`]
  });
};
```

## Configuration

### Environment Variables

Update your environment variables:

```env
NEXT_PUBLIC_APP_URL=https://farmint.app
NEXT_PUBLIC_FARCASTER_DOMAIN=farmint.app
```

### Manifest Configuration

The manifest at `/.well-known/farcaster.json` needs to be updated with:

1. **Account Association**: Cryptographic proof of domain ownership
2. **App Metadata**: Name, description, icons, URLs
3. **Webhook URL**: For receiving notifications (optional)

### Domain Verification

To generate a proper account association:

1. Get your Farcaster custody address
2. Sign a message with your domain
3. Encode the signature in the manifest

## Testing

### Local Development

1. Install dependencies: `npm install`
2. Start the dev server: `npm run dev`
3. Test in browser at `http://localhost:3000`

### MiniApp Testing

1. Use the [Farcaster MiniApp Debug Tool](https://farcaster.xyz/~/developers/mini-apps/debug)
2. Enter your app URL
3. Test miniapp functionality

### Production Testing

1. Deploy to your domain
2. Share the `/farcaster` page on Farcaster
3. Test the embed and miniapp launch

## Deployment Checklist

- [ ] Update manifest with real domain and account association
- [ ] Add proper app icons and splash images
- [ ] Configure webhook URL for notifications (optional)
- [ ] Test embed metadata on Farcaster
- [ ] Verify miniapp functionality in Warpcast

## Next Steps

1. **Generate Account Association**: Create a proper cryptographic signature for domain verification
2. **Add App Icons**: Create and host app icons and splash images
3. **Implement Notifications**: Set up webhook handling for user notifications
4. **Enhanced Sharing**: Add more sharing options for NFTs and collections
5. **Wallet Integration**: Connect with Farcaster's native wallet features

## Resources

- [Farcaster MiniApps Documentation](https://miniapps.farcaster.xyz/)
- [Frame SDK Reference](https://miniapps.farcaster.xyz/docs/sdk)
- [MiniApp Debug Tool](https://farcaster.xyz/~/developers/mini-apps/debug)
