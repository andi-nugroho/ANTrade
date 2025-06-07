"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { trendingCollections } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp } from "lucide-react";
import { toast } from "sonner";

export function TrendingCollections() {
  const router = useRouter();
  
  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading-h3 font-heading font-bold">Trending</h2>
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-primary-400 group"
          onClick={() => router.push("/discover")}
        >
          See all
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      
      <div className="overflow-x-auto hide-scrollbar -mx-4 px-4">
        <div className="flex space-x-4 pb-2 w-max">
          {trendingCollections.map((collection) => (
            <div 
              key={collection.id} 
              className="w-[220px] rounded-lg overflow-hidden border border-border-medium bg-background-card transition-all duration-300 hover:shadow-glow-sm hover:border-primary-500/30 animate-slide-up"
              style={{ animationDelay: `${collection.id * 100}ms` }}
              onClick={() => router.push(`/collection/${collection.id}`)}
            >
              <div className="relative h-[120px] w-full">
                <Image
                  src={collection.coverImage}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-background-card outline outline-1 outline-primary-400">
                    <Image
                      src={collection.logo}
                      alt={collection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-heading text-heading-h6 font-semibold truncate">{collection.name}</h3>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex flex-col">
                    <span className="text-body-xs text-text-tertiary">Floor</span>
                    <span className="text-body-sm font-medium">{collection.floorPrice} ETH</span>
                  </div>

                  <div className="flex flex-col items-end">
                    <span className="text-body-xs text-text-tertiary">Volume</span>
                    <div className="flex items-center">
                      <span className="text-body-sm font-medium">{collection.volume} ETH</span>
                      <span className={`text-body-xs ml-1 ${
                        collection.volumeChange > 0
                          ? "text-success-400"
                          : "text-error-400"
                      }`}>
                        {collection.volumeChange > 0 ? "+" : ""}{collection.volumeChange}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* COMPETITION WINNING FEATURE: Quick Explore Action */}
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full button-smooth hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10"
                  onClick={(e) => {
                    e.stopPropagation();
                    toast.success(`🎨 Exploring ${collection.name} collection!`);
                    router.push(`/collection/${collection.id}`);
                  }}
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  <span className="smooth-120">Explore</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
