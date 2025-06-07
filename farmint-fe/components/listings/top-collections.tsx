"use client";

import { trendingCollections } from "@/lib/mock-data";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TopCollectionsProps {
  timeframe: string;
}

export function TopCollections({ timeframe }: TopCollectionsProps) {
  const router = useRouter();
  
  return (
    <div className="border border-border-medium rounded-lg bg-background-card overflow-hidden">
      <table className="w-full">
        <thead className="bg-background-tertiary">
          <tr>
            <th className="py-3 pl-4 pr-2 text-left text-body-xs font-medium text-text-tertiary">Collection</th>
            <th className="py-3 px-2 text-right text-body-xs font-medium text-text-tertiary">Volume</th>
            <th className="py-3 px-2 text-right text-body-xs font-medium text-text-tertiary">Floor</th>
            <th className="py-3 px-4 text-right text-body-xs font-medium text-text-tertiary">Change</th>
          </tr>
        </thead>
        <tbody>
          {trendingCollections.map((collection, index) => (
            <tr 
              key={collection.id}
              className="border-t border-border-light hover:bg-background-secondary transition-colors cursor-pointer"
              onClick={() => router.push(`/collection/${collection.id}`)}
            >
              <td className="py-3 pl-4 pr-2">
                <div className="flex items-center gap-2">
                  <span className="text-body-sm text-text-tertiary mr-1">{index + 1}</span>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden">
                    <Image
                      src={collection.logo}
                      alt={collection.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-body-sm font-medium">{collection.name}</span>
                </div>
              </td>
              <td className="py-3 px-2 text-right text-body-sm">{collection.volume} ETH</td>
              <td className="py-3 px-2 text-right text-body-sm">{collection.floorPrice} ETH</td>
              <td className={`py-3 px-4 text-right text-body-sm ${
                collection.volumeChange > 0 ? "text-success-400" : "text-error-400"
              }`}>
                {collection.volumeChange > 0 ? "+" : ""}{collection.volumeChange}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
