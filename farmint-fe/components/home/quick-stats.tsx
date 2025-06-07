"use client";

import { TrendingUp, Users, Zap, DollarSign } from "lucide-react";
import { Animated } from "@/components/ui/animated";

export function QuickStats() {
  const stats = [
    {
      icon: DollarSign,
      value: "2.4K",
      label: "ETH Volume",
      change: "+12.5%",
      positive: true
    },
    {
      icon: Users,
      value: "8.2K",
      label: "Active Users",
      change: "+8.3%",
      positive: true
    },
    {
      icon: Zap,
      value: "156",
      label: "Sales Today",
      change: "+23.1%",
      positive: true
    },
    {
      icon: TrendingUp,
      value: "0.85",
      label: "Avg Floor",
      change: "-2.1%",
      positive: false
    }
  ];

  return (
    <Animated animation="slideUp" className="grid grid-cols-2 gap-3">
      {stats.map((stat, index) => (
        <Animated
          key={stat.label}
          animation="fadeIn"
          delay={index * 100}
          className="bg-background-card border border-border-medium rounded-xl p-4 hover:border-primary-500/30 smooth-120 hover:scale-102 hover:shadow-glow-sm"
        >
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-primary-600/20">
              <stat.icon className="h-4 w-4 text-primary-400" />
            </div>
            <span className={`text-body-xs font-medium ${
              stat.positive ? 'text-success-400' : 'text-error-400'
            }`}>
              {stat.change}
            </span>
          </div>
          
          <div className="space-y-1">
            <div className="text-heading-h4 font-bold">{stat.value}</div>
            <div className="text-body-xs text-text-tertiary">{stat.label}</div>
          </div>
        </Animated>
      ))}
    </Animated>
  );
}
