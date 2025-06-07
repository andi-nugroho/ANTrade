import { Featured } from "@/components/home/featured";
import { TrendingCollections } from "@/components/home/trending-collections";
import { LiveAuctions } from "@/components/home/live-auctions";
import { PageHeader } from "@/components/layout/page-header";
import { MiniAppHeader } from "@/components/miniapp/miniapp-header";
import { MiniAppLayout } from "@/components/miniapp/miniapp-layout";
import { FarcasterFeatures } from "@/components/home/farcaster-features";
import { SimpleStats } from "@/components/home/simple-stats";

export default function Home() {
  return (
    <MiniAppLayout>
      <div className="flex flex-col min-h-screen">
        <MiniAppHeader
          title="🎨 FarTrade - NFT Marketplace"
          showShare
          showAdd
        />
        <PageHeader title="Trade NFTs on Farcaster" showWalletButton />

        <div className="px-4 pb-6 flex flex-col gap-6">
          {/* Simple stats - just what matters */}
          <SimpleStats />

          {/* Featured NFT with enhanced design */}
          <Featured />

          {/* Farcaster-specific features */}
          <FarcasterFeatures />

          {/* Trending collections */}
          <TrendingCollections />

          {/* Live auctions with direct actions */}
          <LiveAuctions />
        </div>
      </div>
    </MiniAppLayout>
  );
}
