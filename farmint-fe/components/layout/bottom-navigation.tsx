"use client";

import { Home, Search, Plus, BarChart3, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useMiniAppContext } from "@/components/miniapp/miniapp-provider";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Explore",
    href: "/discover",
    icon: Search,
  },
  // {
  //   name: "Create",
  //   href: "/create",
  //   icon: Plus,
  // },
  {
    name: "Listings",
    href: "/listings",
    icon: BarChart3,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
];

export function BottomNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const { context, isInMiniApp } = useMiniAppContext();

  // Apply safe area insets for miniapp
  const safeAreaInsets = context?.client?.safeAreaInsets;
  const bottomPadding = safeAreaInsets?.bottom || 0;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 glass-effect border-t border-border-medium z-50"
      style={{ paddingBottom: `${bottomPadding}px` }}
    >
      <nav className="flex justify-around items-center py-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          
          return (
            <button
              key={item.name}
              className="flex flex-col items-center justify-center py-1 px-2 w-full button-smooth active:animate-button-press"
              onClick={() => router.push(item.href)}
            >
              <div
                className={cn(
                  "flex flex-col items-center justify-center w-12 h-12 rounded-lg smooth-120",
                  isActive
                    ? "bg-primary-600/20 text-primary-400 shadow-glow-sm scale-105"
                    : "text-text-tertiary hover:text-text-secondary hover:bg-white/5 hover:scale-105"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5 mb-1 smooth-120",
                    isActive && "animate-pulse-slow scale-110"
                  )}
                />
                <span className="text-body-xs font-medium smooth-120">{item.name}</span>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
