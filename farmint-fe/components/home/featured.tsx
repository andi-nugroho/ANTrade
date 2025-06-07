"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { featuredNFTs } from "@/lib/mock-data";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function Featured() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featuredNFTs.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  const currentNFT = featuredNFTs[currentIndex];
  
  return (
    <section className="pt-2">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-heading-h3 font-heading font-bold">Featured</h2>
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
      
      <div className="relative overflow-hidden rounded-xl aspect-[4/3] w-full gradient-border">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background-primary/80 z-10" />
        
        <Image
          src={currentNFT.image}
          alt={currentNFT.name}
          className="object-cover transition-transform duration-700 hover:scale-105"
          fill
          priority
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 relative rounded-full overflow-hidden border border-border-medium">
                <Image
                  src={currentNFT.creator.avatar}
                  alt={currentNFT.creator.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-body-sm text-text-secondary">{currentNFT.creator.name}</span>
            </div>
            
            <h3 className="font-heading text-heading-h4 font-semibold">{currentNFT.name}</h3>
            
            <div className="flex items-center justify-between mt-2">
              <div className="flex flex-col">
                <span className="text-body-xs text-text-tertiary">Current Bid</span>
                <span className="text-body-md font-medium">{currentNFT.price} ETH</span>
              </div>
              
              <Button 
                variant="gradient" 
                size="sm"
                onClick={() => router.push(`/nft/${currentNFT.id}`)}
              >
                View NFT
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4 flex gap-1 z-20">
          {featuredNFTs.map((_, index) => (
            <button
              key={index}
              className={`h-1.5 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-primary-500" : "w-1.5 bg-neutral-600"
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
