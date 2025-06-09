/**
 * Shared type definitions for Farcaster MiniApp integration
 */

export interface MiniAppUser {
  fid: number;
  username?: string;
  displayName?: string;
  pfpUrl?: string;
}

export interface MiniAppLocation {
  type: 'cast_embed' | 'notification' | 'launcher' | 'channel';
  [key: string]: any;
}

export interface MiniAppSafeAreaInsets {
  top: number;
  bottom: number;
  left: number;
  right: number;
}

export interface MiniAppNotificationDetails {
  url: string;
  token: string;
}

export interface MiniAppClient {
  clientFid: number;
  added: boolean;
  safeAreaInsets?: MiniAppSafeAreaInsets;
  notificationDetails?: MiniAppNotificationDetails;
}

export interface MiniAppContext {
  user: MiniAppUser | null;
  location?: MiniAppLocation;
  client: MiniAppClient | null;
}

export interface MiniAppActions {
  signIn: (nonce: string) => Promise<any>;
  addMiniApp: () => Promise<void>;
  composeCast: (options: {
    text?: string;
    embeds?: string[];
    parent?: { type: 'cast'; hash: string };
    channelKey?: string;
  }) => Promise<any>;
  openUrl: (url: string) => Promise<void>;
  close: () => Promise<void>;
}

export interface MiniAppHookReturn {
  context: MiniAppContext | null;
  isInMiniApp: boolean;
  isLoading: boolean;
  error: string | null;
  actions: MiniAppActions;
}
