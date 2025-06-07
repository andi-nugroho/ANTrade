import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/theme-provider';
import { inter, spaceGrotesk } from './fonts';
import { Toaster } from '@/components/ui/sonner';
import { BottomNavigation } from '@/components/layout/bottom-navigation';
import { MiniAppProvider } from '@/components/miniapp/miniapp-provider';
import { Suspense } from 'react';
import { PageLoading } from '@/components/ui/loading';

export const metadata: Metadata = {
  title: 'FarTrade NFT Marketplace',
  description: 'Mint, Listing, sell and buy NFTs',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes',
  themeColor: '#0A0A0A',
  robots: 'index, follow',
  authors: [{ name: 'FarTrade Team' }],
  keywords: 'NFT, marketplace, Farcaster, mint, trade',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" style={{ colorScheme: 'dark' }}>
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-sans bg-background-primary text-text-primary min-h-screen antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <MiniAppProvider>
            <main className="flex flex-col min-h-[100svh] pb-[72px] relative miniapp-container">
              <Suspense fallback={<PageLoading />}>
                {children}
              </Suspense>
            </main>
            <BottomNavigation />
            <Toaster
              position="bottom-center"
              toastOptions={{
                duration: 3000,
                className: 'miniapp-transition',
              }}
            />
          </MiniAppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
