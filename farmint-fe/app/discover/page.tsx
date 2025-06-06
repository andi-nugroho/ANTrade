"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { NFTGrid } from "@/components/discover/nft-grid";
import { popularNFTs } from "@/lib/mock-data";
import { FilterBar } from "@/components/discover/filter-bar";

export default function DiscoverPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Filter NFTs based on active filter and search query
  const filteredNFTs = popularNFTs.filter((nft) => {
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (activeFilter === "all") return matchesSearch;
    // Add more filter conditions as needed
    return matchesSearch;
  });
  
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <PageHeader title="Discover" showWalletButton />
      
      <div className="px-4 pb-6">
        <FilterBar 
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        
        <NFTGrid nfts={filteredNFTs} />
      </div>
    </div>
  );
}
