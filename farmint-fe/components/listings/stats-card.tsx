"use client";

import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  change: number;
  timeframe: string;
}

export function StatsCard({ title, value, change, timeframe }: StatsCardProps) {
  const isPositive = change > 0;
  
  return (
    <div className="border border-border-medium rounded-lg bg-background-card p-4">
      <p className="text-body-sm text-text-tertiary mb-1">{title}</p>
      <div className="flex items-end justify-between">
        <p className="text-heading-h4 font-heading font-semibold">{value}</p>
        
        <div className={`flex items-center gap-1 text-body-xs ${
          isPositive ? "text-success-400" : "text-error-400"
        }`}>
          {isPositive ? (
            <ArrowUpRight className="h-3 w-3" />
          ) : (
            <ArrowDownRight className="h-3 w-3" />
          )}
          <span>{Math.abs(change)}%</span>
        </div>
      </div>
      
      <p className="text-body-xs text-text-quaternary mt-1">
        {timeframe === "24h" ? "Past 24 hours" : 
         timeframe === "7d" ? "Past 7 days" : 
         timeframe === "30d" ? "Past 30 days" : "All time"}
      </p>
    </div>
  );
}
