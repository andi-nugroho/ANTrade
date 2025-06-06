"use client";

import { useState } from "react";
import { PageHeader } from "@/components/layout/page-header";
import { NFTGrid } from "@/components/discover/nft-grid";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListingModal } from "@/components/ui/modal";
import { Search, Plus, Tag, Clock } from "lucide-react";
import { toast } from "sonner";

// Mock data for demonstration
const mockNFTs = [
  {
    id: 1,
    name: "Cosmic Dreams #1",
    image: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 0.5,
    creator: "0x8B3...5F2e",
    isListed: false
  },
  {
    id: 2,
    name: "Digital Waves #42",
    image: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 1.2,
    creator: "0x8B3...5F2e",
    isListed: true
  },
  {
    id: 3,
    name: "Neon Nights #7",
    image: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 0.8,
    creator: "0x8B3...5F2e",
    isListed: false
  },
  {
    id: 4,
    name: "Abstract Mind #23",
    image: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    price: 2.1,
    creator: "0x8B3...5F2e",
    isListed: true
  }
];

export default function UserNFTsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filter, setFilter] = useState("all");
  const [selectedNFT, setSelectedNFT] = useState<number | null>(null);
  const [listingPrice, setListingPrice] = useState("");
  const [listingDuration, setListingDuration] = useState("7"); // days
  const [royaltyPercentage, setRoyaltyPercentage] = useState("2.5");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const filteredNFTs = mockNFTs.filter(nft => {
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || 
      (filter === "listed" && nft.isListed) || 
      (filter === "unlisted" && !nft.isListed);
    return matchesSearch && matchesFilter;
  });
  
  const handleListNFT = (nftId: number) => {
    setSelectedNFT(nftId);
    setListingPrice("");
    setListingDuration("7");
    setRoyaltyPercentage("2.5");
  };
  
  const handleConfirmListing = async () => {
    if (!listingPrice || isNaN(Number(listingPrice)) || Number(listingPrice) <= 0) {
      toast.error("Please enter a valid price");
      return;
    }
    
    if (!listingDuration || isNaN(Number(listingDuration)) || Number(listingDuration) < 1 || Number(listingDuration) > 30) {
      toast.error("Please enter a valid duration (1-30 days)");
      return;
    }
    
    if (!royaltyPercentage || isNaN(Number(royaltyPercentage)) || Number(royaltyPercentage) < 0 || Number(royaltyPercentage) > 10) {
      toast.error("Please enter a valid royalty percentage (0-10%)");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real app, this would call a smart contract to list the NFT
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      toast.success("NFT listed successfully!");
      setSelectedNFT(null);
      setListingPrice("");
      setListingDuration("7");
      setRoyaltyPercentage("2.5");
    } catch (error) {
      toast.error("Failed to list NFT. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen animate-fade-in">
      <PageHeader title="My NFTs">
        <Button 
          variant="gradient" 
          className="flex items-center gap-2"
          onClick={() => toast.info("Create NFT functionality coming soon!")}
        >
          <Plus className="h-4 w-4" />
          Create NFT
        </Button>
      </PageHeader>
      
      <div className="px-4 pb-6">
        {/* Search and Filter Section */}
        <div className="flex flex-col gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary" />
            <Input
              type="text"
              placeholder="Search your NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-background-secondary"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
              {["All", "Listed", "Unlisted"].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-1.5 rounded-full text-body-sm whitespace-nowrap transition-all ${
                    filter === option.toLowerCase()
                      ? "bg-primary-600 text-white"
                      : "bg-background-secondary text-text-tertiary hover:text-text-secondary hover:bg-background-tertiary"
                  }`}
                  onClick={() => setFilter(option.toLowerCase())}
                >
                  {option}
                </button>
              ))}
            </div>
            
            <div className="flex space-x-2 overflow-x-auto hide-scrollbar">
              {["Recent", "Price: Low to High", "Price: High to Low"].map((option) => (
                <button
                  key={option}
                  className={`px-4 py-1.5 rounded-full text-body-sm whitespace-nowrap transition-all ${
                    sortBy === option.toLowerCase()
                      ? "bg-primary-600 text-white"
                      : "bg-background-secondary text-text-tertiary hover:text-text-secondary hover:bg-background-tertiary"
                  }`}
                  onClick={() => setSortBy(option.toLowerCase())}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* NFT Grid */}
        <NFTGrid nfts={filteredNFTs} onListNFT={handleListNFT} />
        
        {/* Enhanced Animated Listing Modal */}
        <ListingModal
          isOpen={selectedNFT !== null}
          onClose={() => {
            setSelectedNFT(null);
            setListingPrice("");
            setListingDuration("7");
            setRoyaltyPercentage("2.5");
          }}
          title="List NFT for Sale"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-body-sm font-medium mb-1.5">Price (ETH)</label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary smooth-120" />
                <Input
                  type="number"
                  placeholder="0.00"
                  value={listingPrice}
                  onChange={(e) => setListingPrice(e.target.value)}
                  className="pl-10 bg-background-secondary h-10 text-sm smooth-120 focus:scale-105 focus:shadow-glow-sm"
                  step="0.001"
                  min="0"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-body-sm font-medium mb-1.5">Duration (Days)</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary smooth-120" />
                  <Input
                    type="number"
                    placeholder="7"
                    value={listingDuration}
                    onChange={(e) => setListingDuration(e.target.value)}
                    className="pl-10 bg-background-secondary h-9 smooth-120"
                    min="1"
                    max="30"
                  />
                </div>
                <p className="text-body-xs text-text-tertiary mt-1">1-30 days</p>
              </div>

              <div>
                <label className="block text-body-sm font-medium mb-1.5">Royalty (%)</label>
                <div className="relative">
                  <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-tertiary smooth-120" />
                  <Input
                    type="number"
                    placeholder="2.5"
                    value={royaltyPercentage}
                    onChange={(e) => setRoyaltyPercentage(e.target.value)}
                    className="pl-10 bg-background-secondary h-9 smooth-120"
                    step="0.1"
                    min="0"
                    max="10"
                  />
                </div>
                <p className="text-body-xs text-text-tertiary mt-1">Max 10%</p>
              </div>
            </div>

            <div className="pt-3 border-t border-border-medium">
              <div className="flex justify-between mb-1.5">
                <span className="text-body-sm text-text-tertiary">Platform Fee</span>
                <span className="text-body-sm">2.5%</span>
              </div>
              <div className="flex justify-between mb-1.5">
                <span className="text-body-sm text-text-tertiary">Royalty Fee</span>
                <span className="text-body-sm">{royaltyPercentage}%</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-body-sm">Total Fees</span>
                <span className="text-body-sm">{(2.5 + Number(royaltyPercentage)).toFixed(1)}%</span>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 h-10 text-sm button-smooth"
                onClick={() => {
                  setSelectedNFT(null);
                  setListingPrice("");
                  setListingDuration("7");
                  setRoyaltyPercentage("2.5");
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="gradient"
                className="flex-1 h-10 text-sm button-smooth hover:scale-105 hover:shadow-glow-lg"
                onClick={handleConfirmListing}
                disabled={isSubmitting}
              >
                <span className="smooth-120">
                  {isSubmitting ? "Listing..." : "List NFT"}
                </span>
              </Button>
            </div>
          </div>
        </ListingModal>
      </div>
    </div>
  );
}
