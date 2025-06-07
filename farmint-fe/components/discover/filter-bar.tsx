"use client";

import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

const filterOptions = [
  { id: "all", label: "All" },
  { id: "art", label: "Art" },
  { id: "collectibles", label: "Collectibles" },
  { id: "music", label: "Music" },
  { id: "photography", label: "Photography" },
];

interface FilterBarProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function FilterBar({
  activeFilter,
  setActiveFilter,
  searchQuery,
  setSearchQuery,
}: FilterBarProps) {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-text-tertiary" />
        <input
          type="text"
          placeholder="Search NFTs, collections, or creators"
          className="w-full bg-background-secondary border border-border-medium rounded-lg py-2 pl-10 pr-4 text-body-sm placeholder:text-text-quaternary focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      <div className="flex overflow-x-auto hide-scrollbar gap-2 pb-1">
        {filterOptions.map((option) => (
          <button
            key={option.id}
            className={cn(
              "px-4 py-1.5 rounded-full text-body-sm whitespace-nowrap transition-all",
              activeFilter === option.id
                ? "bg-primary-600 text-white"
                : "bg-background-secondary text-text-tertiary hover:text-text-secondary hover:bg-background-tertiary"
            )}
            onClick={() => setActiveFilter(option.id)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
