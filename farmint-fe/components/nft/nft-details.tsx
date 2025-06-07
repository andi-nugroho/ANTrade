"use client";

import { ExternalLink } from "lucide-react";

interface NFTDetailsProps {
  nft: any; // Using any for simplicity in this demo
}

export function NFTDetails({ nft }: NFTDetailsProps) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-body-md font-medium mb-2">Description</h3>
        <p className="text-body-sm text-text-secondary">
          {nft.description || "This unique digital collectible represents ownership of a one-of-a-kind digital asset on the blockchain. Created by a talented artist, this NFT features stunning visuals and exclusive rights for the owner."}
        </p>
      </div>
      
      <div className="pt-2">
        <h3 className="text-body-md font-medium mb-2">Properties</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { trait: "Rarity", value: "Legendary", color: "primary" },
            { trait: "Type", value: "Artwork", color: "secondary" },
            { trait: "Edition", value: "1 of 1", color: "accent" },
          ].map((property, index) => (
            <div 
              key={index}
              className={`border border-${property.color}-500/30 bg-${property.color}-500/10 rounded-md p-2 text-center`}
            >
              <p className="text-body-xs text-text-tertiary">{property.trait}</p>
              <p className="text-body-sm font-medium truncate">{property.value}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="pt-2">
        <h3 className="text-body-md font-medium mb-2">Blockchain Info</h3>
        <div className="space-y-2">
          <div className="flex justify-between py-2 border-b border-border-light">
            <span className="text-body-sm text-text-tertiary">Contract Address</span>
            <a 
              href="#" 
              className="text-body-sm text-primary-400 flex items-center gap-1"
              onClick={(e) => e.preventDefault()}
            >
              0x1a2...b3c4
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
          <div className="flex justify-between py-2 border-b border-border-light">
            <span className="text-body-sm text-text-tertiary">Token ID</span>
            <span className="text-body-sm">#{nft.id}</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border-light">
            <span className="text-body-sm text-text-tertiary">Token Standard</span>
            <span className="text-body-sm">ERC-721</span>
          </div>
          <div className="flex justify-between py-2 border-b border-border-light">
            <span className="text-body-sm text-text-tertiary">Blockchain</span>
            <span className="text-body-sm">Ethereum</span>
          </div>
        </div>
      </div>
    </div>
  );
}
