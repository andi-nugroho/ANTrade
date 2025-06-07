"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PageHeader } from "@/components/layout/page-header";
import { Button } from "@/components/ui/button";
import { Heart, Share, Clock, ArrowLeft } from "lucide-react";
import { NFTDetails } from "@/components/nft/nft-details";
import { NFTHistory } from "@/components/nft/nft-history";
import { toast } from "sonner";

interface NFTViewProps {
  nft: any;
}

export function NFTView({ nft }: NFTViewProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("details");
  
  if (!nft) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p className="text-text-tertiary">NFT not found</p>
        <Button variant="link" onClick={() => router.push("/")}>
          Go back to home
        </Button>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col min-h-screen">
      <PageHeader title="" className="bg-transparent">
        <div className="flex items-center justify-between w-full px-4">
          <Button
            variant="ghost"
            size="icon"
            className="button-smooth"
            onClick={() => router.back()}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>

          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="button-smooth">
              <Heart className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="button-smooth"
              onClick={() => {
                // In a real app, this would copy the link to clipboard
                toast.success("Link copied to clipboard");
              }}
            >
              <Share className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </PageHeader>
      
      <div>
        <div className="relative aspect-square w-full">
          <Image
            src={nft.image}
            alt={nft.name}
            fill
            priority
            className="object-cover"
          />
        </div>
        
        <div className="px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="font-heading text-heading-h3 font-bold">{nft.name}</h1>
            
            {'creator' in nft && (
              <div className="flex items-center gap-2">
                <div className="h-6 w-6 relative rounded-full overflow-hidden border border-border-medium">
                  <Image
                    src={nft.creator.avatar}
                    alt={nft.creator.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <span className="text-body-xs text-text-tertiary">
                {'currentBid' in nft ? 'Current Bid' : 'Price'}
              </span>
              <span className="text-body-lg font-medium">
                {'currentBid' in nft ? nft.currentBid : nft.price} ETH
              </span>
            </div>
            
            {'endsIn' in nft && (
              <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-background-tertiary">
                <Clock className="w-4 h-4 text-accent-400" />
                <span className="text-body-sm">{nft.endsIn}</span>
              </div>
            )}
          </div>
          
          <div className="mb-6 space-y-3">
            {/* Primary action button */}
            <Button
              variant="gradient"
              className="w-full py-6 text-lg font-semibold button-smooth hover:scale-105 hover:shadow-glow-lg"
            >
              <span className="smooth-120">
                {'currentBid' in nft ? `🔥 Bid ${nft.currentBid} ETH` : `⚡ Buy for ${nft.price} ETH`}
              </span>
            </Button>

            {/* Secondary actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="py-3 button-smooth hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10"
              >
                <Heart className="w-4 h-4 mr-2" />
                <span className="smooth-120">Save</span>
              </Button>
              <Button
                variant="outline"
                className="py-3 button-smooth hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10"
              >
                <Share className="w-4 h-4 mr-2" />
                <span className="smooth-120">Share</span>
              </Button>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex border-b border-border-medium">
              <button
                className={`flex-1 py-3 text-body-sm font-medium border-b-2 ${
                  activeTab === "details"
                    ? "border-primary-500 text-primary-400"
                    : "border-transparent text-text-tertiary"
                }`}
                onClick={() => setActiveTab("details")}
              >
                Details
              </button>
              <button
                className={`flex-1 py-3 text-body-sm font-medium border-b-2 ${
                  activeTab === "history"
                    ? "border-primary-500 text-primary-400"
                    : "border-transparent text-text-tertiary"
                }`}
                onClick={() => setActiveTab("history")}
              >
                History
              </button>
            </div>
          </div>
          
          <div className="min-h-[200px]">
            {activeTab === "details" && <NFTDetails nft={nft} />}
            {activeTab === "history" && <NFTHistory nftId={nft.id} />}
          </div>
        </div>
      </div>
    </div>
  );
}
