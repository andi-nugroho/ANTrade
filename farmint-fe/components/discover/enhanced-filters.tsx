"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter, TrendingUp, Clock, DollarSign, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { Animated } from "@/components/ui/animated";

interface EnhancedFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function EnhancedFilters({ onFilterChange }: EnhancedFiltersProps) {
  const [activeFilter, setActiveFilter] = useState("trending");
  const [priceRange, setPriceRange] = useState("all");

  const quickFilters = [
    {
      id: "trending",
      label: "🔥 Trending",
      icon: TrendingUp,
      description: "Hot NFTs right now"
    },
    {
      id: "recent",
      label: "⚡ Recent",
      icon: Clock,
      description: "Just listed"
    },
    {
      id: "low-price",
      label: "💎 Affordable",
      icon: DollarSign,
      description: "Under 1 ETH"
    },
    {
      id: "rare",
      label: "✨ Rare",
      icon: Sparkles,
      description: "Unique traits"
    }
  ];

  const priceRanges = [
    { id: "all", label: "All Prices" },
    { id: "under-1", label: "< 1 ETH" },
    { id: "1-5", label: "1-5 ETH" },
    { id: "5-10", label: "5-10 ETH" },
    { id: "over-10", label: "> 10 ETH" }
  ];

  const handleFilterClick = (filterId: string) => {
    setActiveFilter(filterId);
    onFilterChange({ type: filterId, priceRange });
  };

  const handlePriceChange = (range: string) => {
    setPriceRange(range);
    onFilterChange({ type: activeFilter, priceRange: range });
  };

  return (
    <div className="space-y-4">
      {/* Quick Filters */}
      <Animated animation="slideUp" className="space-y-3">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-primary-400" />
          <h3 className="font-semibold text-body-md">Quick Filters</h3>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          {quickFilters.map((filter, index) => (
            <Animated
              key={filter.id}
              animation="fadeIn"
              delay={index * 100}
            >
              <Button
                variant={activeFilter === filter.id ? "default" : "outline"}
                className={cn(
                  "h-auto p-3 flex flex-col items-start text-left button-smooth hover:scale-105",
                  activeFilter === filter.id 
                    ? "bg-primary-600 border-primary-500 shadow-glow-sm" 
                    : "hover:border-primary-500/50 hover:bg-primary-600/10"
                )}
                onClick={() => handleFilterClick(filter.id)}
              >
                <div className="flex items-center gap-2 mb-1">
                  <filter.icon className="h-4 w-4" />
                  <span className="font-medium text-body-sm">{filter.label}</span>
                </div>
                <span className="text-body-xs opacity-80">{filter.description}</span>
              </Button>
            </Animated>
          ))}
        </div>
      </Animated>

      {/* Price Range */}
      <Animated animation="slideUp" delay={200} className="space-y-3">
        <h3 className="font-semibold text-body-md">Price Range</h3>
        
        <div className="flex flex-wrap gap-2">
          {priceRanges.map((range) => (
            <Button
              key={range.id}
              variant={priceRange === range.id ? "default" : "outline"}
              size="sm"
              className={cn(
                "button-smooth hover:scale-105",
                priceRange === range.id 
                  ? "bg-primary-600 border-primary-500" 
                  : "hover:border-primary-500/50 hover:bg-primary-600/10"
              )}
              onClick={() => handlePriceChange(range.id)}
            >
              <span className="smooth-120">{range.label}</span>
            </Button>
          ))}
        </div>
      </Animated>

      {/* Active Filter Indicator */}
      {activeFilter !== "trending" && (
        <Animated animation="fadeIn" className="flex items-center gap-2 p-2 rounded-lg bg-primary-600/10 border border-primary-500/30">
          <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
          <span className="text-body-sm text-primary-400">
            Filtering by: {quickFilters.find(f => f.id === activeFilter)?.label}
          </span>
        </Animated>
      )}
    </div>
  );
}
