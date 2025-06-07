"use client";

import { useState, useEffect } from "react";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  end, 
  duration = 2000, 
  decimals = 0, 
  prefix = "", 
  suffix = "",
  className = ""
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = end * easeOutQuart;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration]);

  const formatNumber = (num: number) => {
    return decimals > 0 ? num.toFixed(decimals) : Math.round(num).toString();
  };

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{formatNumber(count)}{suffix}
    </span>
  );
}
