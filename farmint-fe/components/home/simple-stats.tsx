"use client";

import { useState, useEffect } from "react";
import { TrendingUp, Eye, Zap, Sparkles } from "lucide-react";
import { Animated } from "@/components/ui/animated";
import { AnimatedCounter } from "./animated-counter";
import { ParticleEffect } from "@/components/ui/particle-effect";

export function SimpleStats() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const stats = [
    {
      icon: "🔥",
      label: "Hot",
      value: "sales today",
      count: 12,
      color: "text-red-400",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20",
      hoverBg: "hover:bg-red-500/20",
      glowColor: "hover:shadow-red-500/30"
    },
    {
      icon: "💎",
      label: "Floor",
      value: "ETH",
      count: 0.85,
      decimals: 2,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      hoverBg: "hover:bg-blue-500/20",
      glowColor: "hover:shadow-blue-500/30"
    },
    {
      icon: "⚡",
      label: "Live",
      value: "watching",
      count: 47,
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      hoverBg: "hover:bg-yellow-500/20",
      glowColor: "hover:shadow-yellow-500/30"
    }
  ];

  // Trigger animations on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated
      animation="slideUp"
      className="relative overflow-hidden p-4 rounded-xl bg-background-card border border-border-medium hover:border-primary-500/30 smooth-120 hover:shadow-glow-md group"
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-accent-500/5 animate-pulse-slow" />

      {/* Particle effect on hover */}
      <div className="opacity-0 group-hover:opacity-100 smooth-120">
        <ParticleEffect
          count={4}
          colors={["#7c3aed40", "#3b82f640", "#10b98140"]}
        />
      </div>

      {/* Floating sparkles */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 smooth-120">
        <Sparkles className="h-4 w-4 text-primary-400 animate-pulse" />
      </div>

      <div className="relative flex justify-between items-center">
        {stats.map((stat, index) => (
          <Animated
            key={stat.label}
            animation="fadeIn"
            delay={index * 150}
            className="flex items-center gap-3 cursor-pointer"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* Animated icon container */}
            <div className={`
              relative p-3 rounded-xl ${stat.bgColor} border ${stat.borderColor}
              ${stat.hoverBg} ${stat.glowColor}
              smooth-120 hover:scale-110 hover:shadow-lg
              ${hoveredIndex === index ? 'animate-bounce-subtle' : 'animate-float'}
            `}
            style={{ animationDelay: `${index * 200}ms` }}
            >
              <span className={`text-xl ${stat.color} smooth-120 ${hoveredIndex === index ? 'animate-pulse' : ''}`}>
                {stat.icon}
              </span>

              {/* Floating particles effect */}
              <div className={`
                absolute -top-1 -right-1 w-2 h-2 bg-primary-400 rounded-full
                ${hoveredIndex === index ? 'animate-ping' : 'animate-pulse'}
                opacity-75
              `}
              style={{ animationDelay: `${index * 300}ms` }} />

              {/* Ripple effect on hover */}
              {hoveredIndex === index && (
                <div className="absolute inset-0 rounded-xl border-2 border-primary-400 animate-ping opacity-75" />
              )}
            </div>

            {/* Animated text content */}
            <div className="text-left">
              <div className={`
                text-body-xs text-text-tertiary mb-1 smooth-120
                ${hoveredIndex === index ? 'text-text-secondary scale-105' : ''}
              `}>
                {stat.label}
              </div>
              <div className={`
                text-body-sm font-bold smooth-120
                ${hoveredIndex === index ? 'scale-110 text-primary-400' : ''}
              `}>
                {/* Animated counter */}
                {isVisible ? (
                  <AnimatedCounter
                    end={stat.count}
                    duration={2000 + index * 200}
                    decimals={stat.decimals || 0}
                    className="text-inherit"
                  />
                ) : (
                  <span>0</span>
                )}
                <span className="text-body-xs font-normal text-text-tertiary ml-1">
                  {stat.value}
                </span>
              </div>
            </div>
          </Animated>
        ))}
      </div>

      {/* Animated border glow */}
      <div className="absolute inset-0 rounded-xl border border-primary-500/20 animate-pulse-slow opacity-0 group-hover:opacity-100 smooth-120" />

      {/* Success indicator */}
      <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 smooth-120">
        <div className="w-1 h-1 bg-success-400 rounded-full animate-pulse" />
      </div>
    </Animated>
  );
}
