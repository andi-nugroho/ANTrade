"use client";

import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { MiniAppWalletButton } from "@/components/miniapp/miniapp-wallet-button";

interface PageHeaderProps {
  title: string;
  showWalletButton?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function PageHeader({
  title,
  showWalletButton = false,
  className,
  children,
}: PageHeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "bg-background-primary/80 backdrop-blur-md border-b border-border-light py-3"
          : "bg-transparent py-4",
        className
      )}
    >
      <div className="container flex items-center justify-between px-4">
        <h1 className="font-heading text-heading-h4 font-bold">
          {title}
        </h1>

        <div className="flex items-center gap-4">
          {children}

          {showWalletButton && (
            <div>
              <MiniAppWalletButton
                variant="outline"
                size="sm"
                className="border-border-medium hover:bg-background-tertiary"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
