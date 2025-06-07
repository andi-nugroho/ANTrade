"use client";

import { useState, useEffect } from "react";
import { MessageCircle, TrendingUp, Users, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Animated } from "@/components/ui/animated";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function SocialTrading() {
  const [activeTab, setActiveTab] = useState("trending");

  // Mock social trading data
  const socialData = {
    trending: [
      {
        id: 1,
        nft: "CryptoPunk #1234",
        image: "https://images.pexels.com/photos/3831762/pexels-photo-3831762.jpeg?auto=compress&cs=tinysrgb&w=400",
        mentions: 47,
        sentiment: "bullish",
        price: "15.2 ETH",
        change: "+12.5%"
      },
      {
        id: 2,
        nft: "Bored Ape #5678",
        image: "https://images.pexels.com/photos/3109816/pexels-photo-3109816.jpeg?auto=compress&cs=tinysrgb&w=400",
        mentions: 32,
        sentiment: "bullish",
        price: "8.7 ETH",
        change: "+8.3%"
      }
    ],
    recent: [
      {
        id: 1,
        user: "@cryptowhale",
        action: "bought",
        nft: "Azuki #9999",
        price: "12.5 ETH",
        time: "2m ago"
      },
      {
        id: 2,
        user: "@nftcollector",
        action: "listed",
        nft: "Doodle #1337",
        price: "3.2 ETH",
        time: "5m ago"
      }
    ]
  };

  const tabs = [
    { id: "trending", label: "🔥 Trending", icon: TrendingUp },
    { id: "recent", label: "⚡ Recent", icon: Zap }
  ];

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20">
            <MessageCircle className="h-5 w-5 text-blue-400" />
          </div>
          <h2 className="text-heading-h3 font-heading font-bold">Social Trading</h2>
        </div>
        
        <div className="flex items-center gap-1 text-body-xs text-text-tertiary">
          <Users className="h-3 w-3" />
          <span>Live from Farcaster</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="sm"
            className={cn(
              "button-smooth hover:scale-105",
              activeTab === tab.id 
                ? "bg-primary-600 border-primary-500 shadow-glow-sm" 
                : "hover:border-primary-500/50 hover:bg-primary-600/10"
            )}
            onClick={() => setActiveTab(tab.id)}
          >
            <tab.icon className="h-4 w-4 mr-2" />
            <span className="smooth-120">{tab.label}</span>
          </Button>
        ))}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {activeTab === "trending" && (
          <Animated animation="slideUp" className="space-y-3">
            {socialData.trending.map((item, index) => (
              <Animated
                key={item.id}
                animation="fadeIn"
                delay={index * 150}
                className="p-4 rounded-xl border border-border-medium bg-background-card hover:border-primary-500/30 smooth-120 hover:scale-102 hover:shadow-glow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.nft}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-body-md">{item.nft}</h4>
                      <span className="text-success-400 text-body-sm font-medium">
                        {item.change}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-body-xs text-text-tertiary">
                        <MessageCircle className="h-3 w-3" />
                        <span>{item.mentions} mentions</span>
                        <div className="w-1 h-1 rounded-full bg-text-tertiary" />
                        <span className="text-success-400">Bullish</span>
                      </div>
                      <span className="font-medium text-body-sm">{item.price}</span>
                    </div>
                  </div>
                </div>
              </Animated>
            ))}
          </Animated>
        )}

        {activeTab === "recent" && (
          <Animated animation="slideUp" className="space-y-3">
            {socialData.recent.map((item, index) => (
              <Animated
                key={item.id}
                animation="fadeIn"
                delay={index * 150}
                className="p-4 rounded-xl border border-border-medium bg-background-card hover:border-primary-500/30 smooth-120 hover:scale-102"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-body-sm">
                      <span className="font-semibold text-primary-400">{item.user}</span>
                      <span className="text-text-secondary"> {item.action} </span>
                      <span className="font-medium">{item.nft}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-body-xs text-text-tertiary">
                      <span>{item.price}</span>
                      <div className="w-1 h-1 rounded-full bg-text-tertiary" />
                      <span>{item.time}</span>
                    </div>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    className="button-smooth hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10"
                  >
                    <span className="smooth-120">View</span>
                  </Button>
                </div>
              </Animated>
            ))}
          </Animated>
        )}
      </div>

      {/* Call to action */}
      <Animated
        animation="fadeIn"
        delay={300}
        className="text-center p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary-500/20"
      >
        <p className="text-body-sm text-text-secondary mb-2">
          Join the conversation on Farcaster
        </p>
        <Button
          variant="outline"
          size="sm"
          className="button-smooth hover:scale-105 hover:border-primary-500 hover:bg-primary-600/10"
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          <span className="smooth-120">Share Your Trade</span>
        </Button>
      </Animated>
    </section>
  );
}
