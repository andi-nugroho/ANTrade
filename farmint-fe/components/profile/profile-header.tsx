"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Copy, Edit, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function ProfileHeader() {
  return (
    <div className="pb-4">
      {/* Cover Image */}
      <div className="relative h-32 w-full">
        <Image
          src="https://images.pexels.com/photos/1910236/pexels-photo-1910236.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Profile Cover"
          fill
          className="object-cover"
        />
      </div>
      
      {/* Profile Info */}
      <div className="px-4">
        <div className="flex items-end justify-between -mt-10 mb-4">
          <div className="relative h-20 w-20 rounded-full overflow-hidden border-4 border-background-primary">
            <Image
              src="https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Profile Picture"
              fill
              className="object-cover"
            />
          </div>
          
          <Button 
            variant="outline" 
            size="sm"
            className="flex items-center gap-1"
          >
            <Edit className="h-3.5 w-3.5" />
            <span>Edit</span>
          </Button>
        </div>
        
        <div className="mb-4">
          <h1 className="font-heading text-heading-h4 font-bold">NFT Collector</h1>
          
          <div className="flex items-center gap-2 mt-1">
            <span className="text-body-sm text-text-tertiary">0x8B3...5F2e</span>
            <button 
              className="text-text-tertiary hover:text-text-secondary"
              onClick={() => toast.success("Address copied to clipboard")}
            >
              <Copy className="h-3.5 w-3.5" />
            </button>
            <a 
              href="#" 
              className="text-text-tertiary hover:text-text-secondary"
              onClick={(e) => e.preventDefault()}
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
        
        <div className="flex justify-between mb-4">
          <div className="flex flex-col items-center">
            <span className="text-body-lg font-medium">12</span>
            <span className="text-body-xs text-text-tertiary">Items</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-body-lg font-medium">238</span>
            <span className="text-body-xs text-text-tertiary">Followers</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-body-lg font-medium">152</span>
            <span className="text-body-xs text-text-tertiary">Following</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-body-lg font-medium">5.2</span>
            <span className="text-body-xs text-text-tertiary">ETH Volume</span>
          </div>
        </div>
        
        <p className="text-body-sm text-text-secondary mb-4">
          Passionate NFT collector and digital art enthusiast. Building a collection of unique digital assets.
        </p>
      </div>
    </div>
  );
}
