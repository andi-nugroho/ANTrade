"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { ProfileHeader } from "@/components/profile/profile-header";
import { NFTGrid } from "@/components/discover/nft-grid";
import { popularNFTs } from "@/lib/mock-data";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("collected");
  
  // Filter NFTs based on active tab
  // In a real app, these would be different API calls
  const nfts = popularNFTs.slice(0, activeTab === "created" ? 3 : 4);
  
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <PageHeader title="My Profile" />
      
      <ProfileHeader />
      
      <div className="px-4 pb-6">
        <div className="mb-4">
          <div className="flex border-b border-border-medium">
            <button
              className={`flex-1 py-3 text-body-sm font-medium border-b-2 ${
                activeTab === "collected"
                  ? "border-primary-500 text-primary-400"
                  : "border-transparent text-text-tertiary"
              }`}
              onClick={() => setActiveTab("collected")}
            >
              Collected
            </button>
            <button
              className={`flex-1 py-3 text-body-sm font-medium border-b-2 ${
                activeTab === "created"
                  ? "border-primary-500 text-primary-400"
                  : "border-transparent text-text-tertiary"
              }`}
              onClick={() => setActiveTab("created")}
            >
              Created
            </button>
            <button
              className={`flex-1 py-3 text-body-sm font-medium border-b-2 ${
                activeTab === "favorites"
                  ? "border-primary-500 text-primary-400"
                  : "border-transparent text-text-tertiary"
              }`}
              onClick={() => setActiveTab("favorites")}
            >
              Favorites
            </button>
          </div>
        </div>
        
        {nfts.length > 0 ? (
          <NFTGrid nfts={nfts} />
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-text-tertiary text-body-md mb-4">No NFTs found</p>
          </div>
        )}
      </div>
    </div>
  );
}
