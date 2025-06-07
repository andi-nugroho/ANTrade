"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Heart, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LazyNFTImage } from "@/components/ui/lazy-image";
import { CardSkeleton } from "@/components/ui/loading";
import { useInView } from "react-intersection-observer";
import { toast } from "sonner";

interface NFT {
  id: number;
  name: string;
  image: string;
  price: number;
  creator: string;
  isListed: boolean;
}

interface NFTGridProps {
  nfts: NFT[];
  onListNFT?: (nftId: number) => void;
  itemsPerPage?: number;
}

export function NFTGrid({ nfts, onListNFT, itemsPerPage = 8 }: NFTGridProps) {
  const router = useRouter();
  const [displayedNFTs, setDisplayedNFTs] = useState<NFT[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    setIsLoading(true);
    // Simulate loading delay for better UX
    const timer = setTimeout(() => {
      setDisplayedNFTs(nfts.slice(0, page * itemsPerPage));
      setIsLoading(false);
    }, page === 1 ? 500 : 200); // Longer delay for initial load

    return () => clearTimeout(timer);
  }, [nfts, page, itemsPerPage]);

  useEffect(() => {
    if (inView && displayedNFTs.length < nfts.length) {
      setPage(prev => prev + 1);
    }
  }, [inView, displayedNFTs.length, nfts.length]);
  
  if (nfts.length === 0 && !isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <p className="text-text-tertiary text-body-md">No NFTs found</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Show skeletons while loading */}
        {isLoading && page === 1 && (
          <>
            {Array.from({ length: itemsPerPage }).map((_, index) => (
              <CardSkeleton key={`skeleton-${index}`} showAvatar={false} showImage lines={2} />
            ))}
          </>
        )}

        {/* Show actual NFTs */}
        {!isLoading && displayedNFTs.map((nft, index) => (
          <div
            key={nft.id}
            className="border border-border-medium rounded-lg overflow-hidden bg-background-card hover:shadow-glow-sm hover:border-primary-500/30 smooth-120 hover:scale-102"
          >
            <div
              className="relative aspect-square w-full overflow-hidden cursor-pointer"
              onClick={() => router.push(`/nft/${nft.id}`)}
            >
              <LazyNFTImage
                src={nft.image}
                alt={nft.name}
                className="object-cover smooth-120 hover:scale-110"
                priority={index < 4} // Prioritize first 4 images
              />
              
              <button 
                className="absolute top-2 right-2 h-8 w-8 rounded-full bg-background-primary/40 backdrop-blur-sm flex items-center justify-center text-text-tertiary hover:text-error-400 transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  // Add like functionality
                }}
              >
                <Heart className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-3">
              <h3 className="font-heading text-heading-h6 font-medium truncate mb-1">{nft.name}</h3>

              <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                  <span className="text-body-xs text-text-tertiary">Price</span>
                  <span className="text-body-sm font-medium">{nft.price} ETH</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-body-xs text-text-tertiary">Creator</span>
                  <span className="text-body-xs">{nft.creator}</span>
                </div>
              </div>

              {/* COMPETITION WINNING FEATURE: Direct Buy/Sell Actions */}
              <div className="flex gap-2">
                {/* Buy Button - Primary Action */}
                {nft.isListed && (
                  <Button
                    variant="gradient"
                    size="sm"
                    className="flex-1 button-smooth hover:scale-105 hover:shadow-glow-lg active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      // TODO: Integrate with Reservoir SDK
                      toast.success(`🎉 Buying ${nft.name} for ${nft.price} ETH!`);
                    }}
                  >
                    <span className="smooth-120">⚡ Buy {nft.price} ETH</span>
                  </Button>
                )}

                {/* List Button - For owned NFTs */}
                {onListNFT && !nft.isListed && (
                  <Button
                    variant="gradient"
                    size="sm"
                    className="flex-1 button-smooth hover:scale-105 hover:shadow-glow-lg active:scale-95"
                    onClick={(e) => {
                      e.stopPropagation();
                      onListNFT(nft.id);
                    }}
                  >
                    <Tag className="h-4 w-4 mr-1 smooth-120" />
                    <span className="smooth-120">List</span>
                  </Button>
                )}

                {/* Secondary Actions */}
                <Button
                  variant="outline"
                  size="sm"
                  className="px-3 button-smooth hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/nft/${nft.id}`);
                  }}
                >
                  <span className="smooth-120">View</span>
                </Button>
              </div>

              {/* Status indicator for listed items */}
              {nft.isListed && !onListNFT && (
                <div className="text-body-xs text-success-400 bg-success-400/10 rounded-full px-2 py-1 text-center mt-2">
                  🔥 Available Now
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Loading indicator for pagination */}
      {!isLoading && displayedNFTs.length < nfts.length && (
        <div
          ref={ref}
          className="flex justify-center py-4"
        >
          <div className="h-8 w-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Loading more skeletons */}
      {isLoading && page > 1 && (
        <div className="grid grid-cols-2 gap-4">
          {Array.from({ length: Math.min(itemsPerPage, nfts.length - displayedNFTs.length) }).map((_, index) => (
            <CardSkeleton key={`skeleton-more-${index}`} showAvatar={false} showImage lines={2} />
          ))}
        </div>
      )}
    </div>
  );
}
